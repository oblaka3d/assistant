import { getLLMConfig, getLLMProvider } from './config';

export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Заглушка для LLM API
    // Поддерживает OpenAI, DeepSeek, YandexGPT и другие

    const provider = getLLMProvider();
    const llmConfig = getLLMConfig();

    // Проверяем наличие API ключа
    if (!('apiKey' in llmConfig) || !llmConfig.apiKey) {
      console.warn('LLM API key not configured. Using mock response.');
      return `Вы сказали: "${prompt}". Это тестовый ответ от голосового ассистента.`;
    }

    // Для OpenAI провайдера
    if (provider === 'openai' && 'endpoint' in llmConfig && 'model' in llmConfig) {
      const systemPrompt =
        'systemPrompt' in llmConfig
          ? llmConfig.systemPrompt
          : 'Ты полезный голосовой ассистент. Отвечай кратко и по делу.';

      const response = await fetch(llmConfig.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${llmConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: llmConfig.model,
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`LLM API error: ${response.statusText}`);
      }

      const data = (await response.json()) as { choices: Array<{ message: { content: string } }> };
      return data.choices[0]?.message?.content || 'Не удалось получить ответ.';
    }

    // Для других провайдеров (yandex_gpt, anthropic) нужна отдельная реализация
    console.warn(`LLM provider ${provider} not yet fully implemented. Using mock response.`);
    return `Вы сказали: "${prompt}". Это тестовый ответ от голосового ассистента.`;
  } catch (error) {
    console.error('LLM generation error:', error);
    return 'Произошла ошибка при генерации ответа. Попробуйте еще раз.';
  }
}
