import mongoose from 'mongoose';

/**
 * Подключение к MongoDB
 */
export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/voice-assistant';

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }

  // Обработка ошибок подключения
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  });
};
