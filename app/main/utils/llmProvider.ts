/**
 * Утилита для получения названия LLM провайдера
 */

export function getLLMProviderName(provider: string): string {
  const providerNames: Record<string, string> = {
    openai: 'OpenAI GPT',
    yandex_gpt: 'Yandex GPT',
    anthropic: 'Anthropic Claude',
  };

  return providerNames[provider] || provider;
}
