import { SYSTEM_PROMPT, buildUserMessage } from './system-prompt';
import type { ChatMessage } from '../types';

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface GenerateResult {
  html: string;
  inputTokens: number;
  outputTokens: number;
}

function extractHtml(text: string): string {
  // Strip markdown fences if the model wraps them anyway
  let cleaned = text.replace(/```html?\n?/g, '').replace(/```\n?/g, '').trim();
  // Ensure we have a proper HTML document
  const doctypeIndex = cleaned.indexOf('<!DOCTYPE');
  if (doctypeIndex > 0) {
    cleaned = cleaned.slice(doctypeIndex);
  }
  return cleaned;
}

export async function generateDesign(
  apiKey: string,
  prompt: string,
  chatHistory: ChatMessage[],
  currentHtml?: string
): Promise<GenerateResult> {
  // Build messages array from chat history for multi-turn context
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  for (const msg of chatHistory) {
    if (msg.role === 'user') {
      messages.push({ role: 'user', content: msg.content });
    } else if (msg.role === 'assistant' && msg.html) {
      messages.push({ role: 'assistant', content: msg.html });
    }
  }

  // Add the current user message
  const userMessage = buildUserMessage(prompt, currentHtml);
  messages.push({ role: 'user', content: userMessage });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16384,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 401) throw new Error('Invalid API key. Check your key in Settings and try again.');
    if (status === 429) throw new Error('Rate limit reached. Wait a moment and try again.');
    if (status === 529) throw new Error('Anthropic is overloaded. Try again in a few seconds.');
    throw new Error('Could not reach Anthropic. Check your connection and try again.');
  }

  const data: AnthropicResponse = await response.json();
  const text = data.content[0]?.text || '';
  const html = extractHtml(text);

  if (!html || !html.includes('<html')) {
    throw new Error('AI returned an unexpected format. Try again with a more specific prompt.');
  }

  return {
    html,
    inputTokens: data.usage.input_tokens,
    outputTokens: data.usage.output_tokens,
  };
}
