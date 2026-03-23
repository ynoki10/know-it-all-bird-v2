import type { AIProvider } from './types';

declare global {
  interface LanguageModelCreateOptions {
    systemPrompt?: string;
    temperature?: number;
    topK?: number;
  }

  interface LanguageModelSession {
    prompt(input: string): Promise<string>;
    destroy(): void;
  }

  interface LanguageModelAPI {
    availability(): Promise<'available' | 'downloadable' | 'downloading' | 'unavailable'>;
    create(options?: LanguageModelCreateOptions): Promise<LanguageModelSession>;
  }

  interface Window {
    LanguageModel?: LanguageModelAPI;
  }
}

const SYSTEM_PROMPT = `あなたは知ったかぶりの文鳥。ことわざの意味を2〜3文で短く答える。知らないことわざは創作する。フランクな口調。箇条書きや見出しは使わない。`;

export class BuiltInAIProvider implements AIProvider {
  async isAvailable(): Promise<boolean> {
    if (!window.LanguageModel) return false;
    try {
      const availability = await window.LanguageModel.availability();
      return availability === 'available' || availability === 'downloadable';
    } catch {
      return false;
    }
  }

  async generate(word: string): Promise<string> {
    if (!window.LanguageModel) {
      throw new Error('Built-in AI is not available');
    }
    const session = await window.LanguageModel.create({
      systemPrompt: SYSTEM_PROMPT,
      temperature: 0.6,
      topK: 3,
    });
    try {
      const result = await session.prompt(`「${word}」ってどういう意味？`);
      return result;
    } finally {
      session.destroy();
    }
  }
}
