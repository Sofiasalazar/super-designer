import React, { useState } from 'react';
import {
  Globe, BarChart3, ShoppingBag, Cloud, User, Smartphone, Layers,
  Sparkles, Send, Palette,
} from 'lucide-react';
import {
  TEMPLATES, STYLE_PRESETS, CATEGORY_LABELS,
  type TemplateCategory, type DesignTemplate,
} from '../lib/templates';

const CATEGORY_ICONS: Record<TemplateCategory, React.FC<{ size: number; className?: string }>> = {
  landing: Globe,
  dashboard: BarChart3,
  ecommerce: ShoppingBag,
  saas: Cloud,
  portfolio: User,
  mobile: Smartphone,
  components: Layers,
};

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as TemplateCategory[];

interface Props {
  hasApiKey: boolean;
  isGenerating: boolean;
  onSend: (prompt: string) => void;
  onOpenSettings: () => void;
}

export const TemplateGallery: React.FC<Props> = ({ hasApiKey, isGenerating, onSend, onOpenSettings }) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const filtered = activeCategory === 'all'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  const handleTemplateClick = (template: DesignTemplate) => {
    if (!hasApiKey || isGenerating) return;
    const style = STYLE_PRESETS.find((s) => s.id === selectedStyle);
    const fullPrompt = template.prompt + (style ? style.suffix : '');
    onSend(fullPrompt);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customPrompt.trim();
    if (!trimmed || !hasApiKey || isGenerating) return;
    const style = STYLE_PRESETS.find((s) => s.id === selectedStyle);
    const fullPrompt = trimmed + (style ? style.suffix : '');
    onSend(fullPrompt);
    setCustomPrompt('');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Palette size={28} className="text-[#8b5cf6]" />
          </div>
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">Design anything with AI</h2>
          <p className="text-[#A3A3A3] text-[14px]">Pick a template or describe your own. Refine through conversation.</p>
        </div>

        {/* Custom prompt input */}
        {!hasApiKey ? (
          <div className="text-center mb-8">
            <button
              onClick={onOpenSettings}
              className="px-6 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold rounded-xl transition-colors"
            >
              Add API Key to Start
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="mb-8 max-w-2xl mx-auto relative">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Or describe your own design..."
              disabled={isGenerating}
              className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3.5 pr-12 text-[14px] text-[#F5F5F5] placeholder-[#A3A3A3] focus:outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!customPrompt.trim() || isGenerating}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b5cf6] hover:text-[#a78bfa] disabled:text-[#262626] transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        )}

        {/* Style presets */}
        <div className="mb-8">
          <p className="text-[12px] text-[#A3A3A3] font-medium uppercase tracking-wider mb-3">Style</p>
          <div className="flex flex-wrap gap-2">
            {STYLE_PRESETS.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(selectedStyle === style.id ? null : style.id)}
                className={`px-3 py-1.5 rounded-lg text-[13px] transition-colors border ${
                  selectedStyle === style.id
                    ? 'bg-[#8b5cf6]/20 border-[#8b5cf6]/50 text-[#F5F5F5]'
                    : 'bg-[#141414] border-[#262626] text-[#A3A3A3] hover:border-[#8b5cf6]/30 hover:text-[#F5F5F5]'
                }`}
                title={style.description}
              >
                <Sparkles size={12} className="inline mr-1.5 -mt-0.5" />
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-[13px] transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#8b5cf6] text-white'
                : 'bg-[#141414] text-[#A3A3A3] hover:text-[#F5F5F5]'
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#8b5cf6] text-white'
                    : 'bg-[#141414] text-[#A3A3A3] hover:text-[#F5F5F5]'
                }`}
              >
                <Icon size={13} />
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((template) => {
            const Icon = CATEGORY_ICONS[template.category];
            return (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                disabled={!hasApiKey || isGenerating}
                className="text-left p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#8b5cf6]/50 hover:bg-[#1a1a2e] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className="text-[#8b5cf6]" />
                  <span className="text-[14px] font-semibold text-[#F5F5F5]">{template.name}</span>
                </div>
                <p className="text-[12px] text-[#A3A3A3] leading-relaxed line-clamp-3">
                  {template.prompt.slice(0, 120)}...
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
