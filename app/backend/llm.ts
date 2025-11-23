import { config } from './config';

export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Заглушка для LLM API
    // Поддерживает OpenAI, DeepSeek, YandexGPT и другие

    if (!config.llm.apiKey) {
      console.warn('LLM API key not configured. Using mock response.');
      return `Вы сказали: "${prompt}". Это тестовый ответ от голосового ассистента.`;
    }

    const response = await fetch(config.llm.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.llm.apiKey}`,
      },
      body: JSON.stringify({
        model: config.llm.model,
        messages: [
          {
            role: 'system',
            content: 'Ты полезный голосовой ассистент. Отвечай кратко и по делу.',
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
  } catch (error) {
    console.error('LLM generation error:', error);
    return 'Произошла ошибка при генерации ответа. Попробуйте еще раз.';
  }
}
