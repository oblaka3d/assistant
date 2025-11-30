import mongoose from 'mongoose';

/**
 * Подключение к MongoDB
 */
export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/voice-assistant';
  const connectionTimeout = 5000; // 5 секунд

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: connectionTimeout,
      connectTimeoutMS: connectionTimeout,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error(`⚠️  Failed to connect to MongoDB at ${mongoUri}`);
    console.error('⚠️  Make sure MongoDB is running or set MONGODB_URI environment variable');
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
