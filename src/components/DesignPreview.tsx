import React from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, Copy, Download, ExternalLink } from 'lucide-react';
import type { ViewportSize } from '../types';
import { VIEWPORT_WIDTHS } from '../types';

interface Props {
  html: string | null;
  viewport: ViewportSize;
  onViewportChange: (v: ViewportSize) => void;
}

const VIEWPORT_OPTIONS: { id: ViewportSize; icon: React.FC<{ size: number; className?: string }>; label: string }[] = [
  { id: 'mobile', icon: Smartphone, label: '375px' },
  { id: 'tablet', icon: Tablet, label: '768px' },
  { id: 'desktop', icon: Monitor, label: '1280px' },
  { id: 'full', icon: Maximize2, label: 'Full' },
];

export const DesignPreview: React.FC<Props> = ({ html, viewport, onViewportChange }) => {
  const handleCopy = async () => {
    if (!html) return;
    await navigator.clipboard.writeText(html);
  };

  const handleDownload = () => {
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-' + Date.now() + '.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenTab = () => {
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const iframeWidth = VIEWPORT_WIDTHS[viewport];

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
        <div className="flex items-center gap-1">
          {VIEWPORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onViewportChange(opt.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] transition-colors ${
                viewport === opt.id
                  ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]'
                  : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
              }`}
              title={opt.label}
            >
              <opt.icon size={14} />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          ))}
        </div>

        {html && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              title="Copy HTML"
            >
              <Copy size={14} />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              title="Download HTML"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handleOpenTab}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Open</span>
            </button>
          </div>
        )}
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-[#0A0A0A] flex justify-center p-4">
        {html ? (
          <div
            className="bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
            style={{
              width: iframeWidth ? iframeWidth + 'px' : '100%',
              maxWidth: '100%',
              height: '100%',
            }}
          >
            <iframe
              srcDoc={html}
              sandbox="allow-scripts"
              className="w-full h-full border-0"
              title="Design preview"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[#A3A3A3] text-[14px]">
            Your design will appear here
          </div>
        )}
      </div>
    </div>
  );
};
