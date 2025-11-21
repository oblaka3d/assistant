import express, { Express, Request, Response } from 'express';
import { config } from './config';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/config', (_req: Request, res: Response) => {
  res.json({
    audio: config.audio,
    stt: { ...config.stt, apiKey: config.stt.apiKey ? '***' : undefined },
    llm: { ...config.llm, apiKey: config.llm.apiKey ? '***' : undefined },
    tts: { ...config.tts, apiKey: config.tts.apiKey ? '***' : undefined },
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

