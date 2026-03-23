export interface AIProvider {
  generate(prompt: string): Promise<string>;
  isAvailable(): Promise<boolean>;
}
