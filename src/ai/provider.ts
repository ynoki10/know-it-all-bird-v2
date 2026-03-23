import { BuiltInAIProvider } from './built-in-ai';
import type { AIProvider } from './types';

export function getAIProvider(): AIProvider {
  return new BuiltInAIProvider();
}
