import { getAIProvider } from '../ai/provider';

const provider = getAIProvider();

export function useGenerateExplanation() {
  async function generate(word: string): Promise<string> {
    try {
      return await provider.generate(word);
    } catch (error) {
      console.error(error);
      return 'エラーが発生しました。もう一度お試しください。';
    }
  }

  async function checkAvailability(): Promise<boolean> {
    return provider.isAvailable();
  }

  return { generate, checkAvailability };
}
