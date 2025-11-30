import express, { Express, Request, Response, json, urlencoded } from 'express';

import {
  config,
  getSTTConfig,
  getSTTProvider,
  getLLMConfig,
  getLLMProvider,
  getTTSConfig,
  getTTSProvider,
} from './config';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/config', (_req: Request, res: Response) => {
  res.json({
    audio: config.audio,
    stt: {
      ...config.stt,
      currentProvider: getSTTProvider(),
      apiKey: (() => {
        const sttConfig = getSTTConfig();
        return 'apiKey' in sttConfig && sttConfig.apiKey ? '***' : undefined;
      })(),
    },
    llm: {
      ...config.llm,
      currentProvider: getLLMProvider(),
      apiKey: (() => {
        const llmConfig = getLLMConfig();
        return 'apiKey' in llmConfig && llmConfig.apiKey ? '***' : undefined;
      })(),
    },
    tts: {
      ...config.tts,
      currentProvider: getTTSProvider(),
      apiKey: (() => {
        const ttsConfig = getTTSConfig();
        return 'apiKey' in ttsConfig && ttsConfig.apiKey ? '***' : undefined;
      })(),
    },
  });
});

export function startServer(): void {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

// Запуск сервера, если файл запущен напрямую
if (require.main === module) {
  startServer();
}
