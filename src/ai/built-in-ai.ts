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

const SYSTEM_PROMPT = `あなたはことわざに詳しい文鳥です。
ユーザーが言ったことわざについて、意味と由来を説明してください。
知らないことわざでも知ったかぶりで創作して説明してください。
フランクな口調で、日本語で、100文字程度で答えてください。`;

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
    });
    try {
      const result = await session.prompt(`「${word}」ということわざについて教えて。`);
      return result;
    } finally {
      session.destroy();
    }
  }
}
