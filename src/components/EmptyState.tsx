import React, { useState } from 'react';
import { Palette, Sparkles, Layout, Smartphone, Send } from 'lucide-react';

interface Props {
  hasApiKey: boolean;
  onOpenSettings: () => void;
  onSend: (prompt: string) => void;
  isGenerating: boolean;
}

const EXAMPLES = [
  { icon: Layout, text: 'Modern SaaS pricing page with 3 tiers' },
  { icon: Sparkles, text: 'Dark-themed dashboard for analytics' },
  { icon: Palette, text: 'Portfolio landing page with minimal design' },
  { icon: Smartphone, text: 'Mobile app download page with hero section' },
];

export const EmptyState: React.FC<Props> = ({ hasApiKey, onOpenSettings, onSend, isGenerating }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isGenerating || !hasApiKey) return;
    onSend(trimmed);
    setInput('');
  };

  const handleExampleClick = (text: string) => {
    if (!hasApiKey || isGenerating) return;
    onSend(text);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Palette size={32} className="text-[#8b5cf6]" />
        </div>

        <h2 className="text-2xl font-bold text-[#F5F5F5] mb-3">
          Design anything with AI
        </h2>
        <p className="text-[#A3A3A3] text-[15px] mb-8">
          Describe a page and get a complete, responsive HTML design. Refine it through conversation.
        </p>

        {!hasApiKey ? (
          <button
            onClick={onOpenSettings}
            className="mb-8 px-6 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold rounded-xl transition-colors"
          >
            Add API Key to Start
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mb-8 w-full relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the page you want to design..."
              disabled={isGenerating}
              className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3.5 pr-12 text-[14px] text-[#F5F5F5] placeholder-[#A3A3A3] focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b5cf6] hover:text-[#a78bfa] disabled:text-[#262626] transition-colors"
              aria-label="Generate design"
            >
              <Send size={18} />
            </button>
          </form>
        )}

        <div className="text-left space-y-3 w-full">
          <p className="text-[12px] text-[#A3A3A3] font-medium uppercase tracking-wider mb-2">
            Try something like
          </p>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.text}
              onClick={() => handleExampleClick(ex.text)}
              disabled={!hasApiKey || isGenerating}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#262626] text-left hover:border-[#8b5cf6]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ex.icon size={18} className="text-[#8b5cf6] flex-shrink-0" />
              <span className="text-[14px] text-[#A3A3A3]">{ex.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
