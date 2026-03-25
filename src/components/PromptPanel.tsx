import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType } from '../types';

interface Props {
  messages: ChatMessageType[];
  isGenerating: boolean;
  hasApiKey: boolean;
  error: string | null;
  onSend: (prompt: string) => void;
  onClear: () => void;
  onOpenSettings: () => void;
}

export const PromptPanel: React.FC<Props> = ({
  messages,
  isGenerating,
  hasApiKey,
  error,
  onSend,
  onClear,
  onOpenSettings,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isGenerating) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [input]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
        <h3 className="text-[14px] font-semibold text-[#F5F5F5]">Chat</h3>
        {messages.length > 0 && (
          <button
            onClick={onClear}
            className="text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
            title="Clear chat and start over"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isGenerating && (
          <div className="flex items-center gap-2 text-[13px] text-[#A3A3A3]">
            <Loader2 size={16} className="animate-spin text-[#8b5cf6]" />
            Generating design...
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20">
            <p className="text-[13px] text-[#ef4444]">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#262626]">
        {!hasApiKey ? (
          <button
            type="button"
            onClick={onOpenSettings}
            className="w-full py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold text-[14px] transition-colors"
          >
            Add API Key to Start
          </button>
        ) : (
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                messages.length === 0
                  ? 'Describe the page you want to design...'
                  : 'Describe what to change...'
              }
              rows={1}
              disabled={isGenerating}
              className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 pr-12 text-[14px] text-[#F5F5F5] placeholder-[#A3A3A3] resize-none focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="absolute right-3 bottom-3 text-[#8b5cf6] hover:text-[#a78bfa] disabled:text-[#262626] transition-colors"
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
