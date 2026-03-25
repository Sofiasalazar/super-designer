import React from 'react';
import { Plus, FileCode, Trash2 } from 'lucide-react';
import type { SavedDesign } from '../types';

interface Props {
  designs: SavedDesign[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

export const Sidebar: React.FC<Props> = ({ designs, activeId, onSelect, onNew, onDelete }) => {
  return (
    <div className="w-[200px] min-w-[200px] flex flex-col h-full border-r border-[#262626] bg-[#0A0A0A]">
      <div className="p-3 border-b border-[#262626]">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-[13px] font-semibold transition-colors"
        >
          <Plus size={14} />
          New Design
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {designs.length === 0 ? (
          <p className="px-3 py-4 text-[12px] text-[#A3A3A3] text-center">
            Your designs will appear here
          </p>
        ) : (
          designs.map((d) => (
            <div
              key={d.id}
              className={`group flex items-center gap-2 px-3 py-2 mx-2 mb-1 rounded-lg cursor-pointer transition-colors ${
                activeId === d.id
                  ? 'bg-[#8b5cf6]/15 text-[#F5F5F5]'
                  : 'text-[#A3A3A3] hover:bg-[#141414] hover:text-[#F5F5F5]'
              }`}
              onClick={() => onSelect(d.id)}
            >
              <FileCode size={14} className="flex-shrink-0 text-[#8b5cf6]" />
              <span className="flex-1 text-[13px] truncate">{d.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(d.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-[#A3A3A3] hover:text-[#ef4444] transition-all"
                title="Delete design"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
