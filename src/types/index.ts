export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  html?: string;
  tokens?: { input: number; output: number };
  timestamp: number;
}

export interface SavedDesign {
  id: string;
  name: string;
  html: string;
  messages: ChatMessage[];
  timestamp: number;
}

export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'full';

export const VIEWPORT_WIDTHS: Record<ViewportSize, number | null> = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
  full: null,
};
