import React from 'react';
import { User, Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../types';

interface Props {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? '' : ''}`}>
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isUser ? 'bg-[#262626]' : 'bg-[#8b5cf6]/20'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-[#A3A3A3]" />
        ) : (
          <Bot size={14} className="text-[#8b5cf6]" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#F5F5F5] leading-relaxed whitespace-pre-wrap break-words">
          {isUser ? message.content : 'Design updated.'}
        </p>
        {message.tokens && (
          <p className="text-[11px] text-[#A3A3A3] mt-1">
            {(message.tokens.input + message.tokens.output).toLocaleString()} tokens
          </p>
        )}
      </div>
    </div>
  );
};
