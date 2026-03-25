import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DataNotice } from './components/DataNotice';
import { SettingsModal } from './components/SettingsModal';
import { Sidebar } from './components/Sidebar';
import { PromptPanel } from './components/PromptPanel';
import { DesignPreview } from './components/DesignPreview';
import { TemplateGallery } from './components/TemplateGallery';
import { FooterCTA } from './components/FooterCTA';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTokenCounter } from './hooks/useTokenCounter';
import { generateDesign } from './lib/anthropic';
import type { ChatMessage, SavedDesign, ViewportSize } from './types';

let messageIdCounter = 0;
function nextId(): string {
  return 'msg-' + (++messageIdCounter) + '-' + Date.now();
}

let designIdCounter = 0;
function nextDesignId(): string {
  return 'design-' + (++designIdCounter) + '-' + Date.now();
}

function extractName(prompt: string): string {
  const trimmed = prompt.slice(0, 40).trim();
  return trimmed.length < prompt.length ? trimmed + '...' : trimmed;
}

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage('agenticsis_super_designer_api_key', '');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [activeDesignId, setActiveDesignId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentHtml, setCurrentHtml] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const { usage, totalTokens, addUsage } = useTokenCounter();

  const saveCurrentDesign = useCallback((msgs: ChatMessage[], html: string, name?: string) => {
    setDesigns((prev) => {
      if (activeDesignId) {
        return prev.map((d) =>
          d.id === activeDesignId ? { ...d, html, messages: msgs, timestamp: Date.now() } : d
        );
      }
      const id = nextDesignId();
      const newDesign: SavedDesign = {
        id,
        name: name || 'Untitled',
        html,
        messages: msgs,
        timestamp: Date.now(),
      };
      setActiveDesignId(id);
      return [newDesign, ...prev];
    });
  }, [activeDesignId]);

  const handleSend = useCallback(
    async (prompt: string) => {
      if (!apiKey) return;

      setError(null);
      setIsGenerating(true);

      const userMsg: ChatMessage = {
        id: nextId(),
        role: 'user',
        content: prompt,
        timestamp: Date.now(),
      };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);

      try {
        const result = await generateDesign(
          apiKey,
          prompt,
          messages,
          currentHtml || undefined
        );

        const assistantMsg: ChatMessage = {
          id: nextId(),
          role: 'assistant',
          content: result.html,
          html: result.html,
          tokens: { input: result.inputTokens, output: result.outputTokens },
          timestamp: Date.now(),
        };

        const finalMessages = [...updatedMessages, assistantMsg];
        setMessages(finalMessages);
        setCurrentHtml(result.html);
        addUsage(result.inputTokens, result.outputTokens);

        // Auto-save: name comes from first user prompt
        const designName = messages.length === 0 ? extractName(prompt) : undefined;
        saveCurrentDesign(finalMessages, result.html, designName);
      } catch (err: any) {
        setError(err.message || 'Something went wrong. Try again.');
      } finally {
        setIsGenerating(false);
      }
    },
    [apiKey, messages, currentHtml, addUsage, saveCurrentDesign]
  );

  const handleSelectDesign = useCallback((id: string) => {
    const design = designs.find((d) => d.id === id);
    if (!design) return;
    setActiveDesignId(id);
    setMessages(design.messages);
    setCurrentHtml(design.html);
    setError(null);
  }, [designs]);

  const handleNewDesign = useCallback(() => {
    setActiveDesignId(null);
    setMessages([]);
    setCurrentHtml(null);
    setError(null);
  }, []);

  const handleDeleteDesign = useCallback((id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    if (activeDesignId === id) {
      handleNewDesign();
    }
  }, [activeDesignId, handleNewDesign]);

  const handleClear = useCallback(() => {
    handleNewDesign();
  }, [handleNewDesign]);

  const hasDesign = currentHtml !== null;

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] font-sans">
      <Header
        hasApiKey={!!apiKey}
        tokenUsage={usage}
        totalTokens={totalTokens}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <DataNotice />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={setApiKey}
        onClearApiKey={() => setApiKey('')}
      />

      <div className="flex-1 flex overflow-hidden mt-14 mb-12" style={{ paddingTop: 40 }}>
        {/* Sidebar: saved designs */}
        <div className="hidden lg:flex">
          <Sidebar
            designs={designs}
            activeId={activeDesignId}
            onSelect={handleSelectDesign}
            onNew={handleNewDesign}
            onDelete={handleDeleteDesign}
          />
        </div>

        {!hasDesign && messages.length === 0 ? (
          <TemplateGallery hasApiKey={!!apiKey} onOpenSettings={() => setSettingsOpen(true)} onSend={handleSend} isGenerating={isGenerating} />
        ) : (
          <>
            {/* Chat panel -- narrower */}
            <div className="w-full lg:w-[280px] lg:min-w-[240px] lg:max-w-[320px] border-r border-[#262626] flex flex-col h-full">
              <PromptPanel
                messages={messages}
                isGenerating={isGenerating}
                hasApiKey={!!apiKey}
                error={error}
                onSend={handleSend}
                onClear={handleClear}
                onOpenSettings={() => setSettingsOpen(true)}
              />
            </div>

            {/* Design preview */}
            <div className="flex-1 flex flex-col h-full">
              <DesignPreview
                html={currentHtml}
                viewport={viewport}
                onViewportChange={setViewport}
              />
            </div>
          </>
        )}
      </div>

      <FooterCTA />
    </div>
  );
}
