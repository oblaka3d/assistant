import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config';
import { connectDatabase } from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';
import apiKeysRoutes from './routes/apiKeysRoutes';
import authRoutes from './routes/authRoutes';
import settingsRoutes from './routes/settingsRoutes';

const app: Application = express();

// Middleware
app.use(helmet()); // Безопасность
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);
app.use(morgan('dev')); // Логирование
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use(`${config.api.prefix}/auth`, authRoutes);
app.use(`${config.api.prefix}/settings`, settingsRoutes);
app.use(`${config.api.prefix}/api-keys`, apiKeysRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Запуск сервера
const startServer = async (): Promise<void> => {
  try {
    // Подключение к MongoDB
    await connectDatabase();

    // Запуск Express сервера
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`🔗 API prefix: ${config.api.prefix}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
