#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import * as os from 'os';
import * as readline from 'readline';

interface CheckResult {
  installed: boolean;
  running: boolean;
  version?: string;
}

/**
 * Определяет платформу
 */
function getPlatform(): 'darwin' | 'linux' | 'win32' {
  const platform = os.platform();
  if (platform === 'darwin' || platform === 'linux' || platform === 'win32') {
    return platform;
  }
  throw new Error(`Unsupported platform: ${platform}`);
}

/**
 * Проверяет, запущен ли MongoDB (проверка порта)
 */
async function isMongoDBRunning(): Promise<boolean> {
  try {
    const platform = getPlatform();

    if (platform === 'win32') {
      // Windows
      try {
        execSync('netstat -an | findstr :27017', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    } else {
      // macOS/Linux
      try {
        execSync('lsof -i :27017 2>/dev/null', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    }
  } catch {
    return false;
  }
}

/**
 * Проверяет, установлена ли MongoDB
 */
async function isMongoDBInstalled(): Promise<boolean> {
  try {
    execSync('mongod --version', { stdio: 'ignore' });
    return true;
  } catch {
    // Проверяем через Homebrew на macOS
    if (getPlatform() === 'darwin') {
      try {
        execSync('brew list mongodb-community 2>/dev/null', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

/**
 * Получает версию MongoDB
 */
async function getMongoDBVersion(): Promise<string | undefined> {
  try {
    const output = execSync('mongod --version', { encoding: 'utf-8' });
    const match = output.match(/db version v?([\d.]+)/);
    return match ? match[1] : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Проверяет статус MongoDB
 */
async function checkMongoDB(): Promise<CheckResult> {
  const installed = await isMongoDBInstalled();
  const running = await isMongoDBRunning();
  const version = installed ? await getMongoDBVersion() : undefined;

  return { installed, running, version };
}

/**
 * Устанавливает MongoDB на macOS (Homebrew)
 */
async function installMongoDBDarwin(): Promise<void> {
  console.log('📦 Installing MongoDB on macOS...');

  try {
    // Проверяем наличие Homebrew
    execSync('which brew', { stdio: 'ignore' });
  } catch {
    throw new Error('Homebrew is not installed. Please install it first: https://brew.sh');
  }

  try {
    // Добавляем tap для MongoDB
    console.log('Adding MongoDB tap...');
    execSync('brew tap mongodb/brew', { stdio: 'inherit' });

    // Устанавливаем MongoDB
    console.log('Installing MongoDB Community Edition...');
    execSync('brew install mongodb-community', { stdio: 'inherit' });

    console.log('✅ MongoDB installed successfully');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to install MongoDB: ${errorMessage}`);
  }
}

/**
 * Устанавливает MongoDB на Linux (Ubuntu/Debian)
 */
async function installMongoDBLinux(): Promise<void> {
  console.log('📦 Installing MongoDB on Linux...');

  try {
    // Проверяем наличие sudo
    execSync('which sudo', { stdio: 'ignore' });
  } catch {
    throw new Error('sudo is not available. Please run as root or install sudo.');
  }

  try {
    // Устанавливаем зависимости
    console.log('Installing dependencies...');
    execSync('sudo apt-get update', { stdio: 'inherit' });
    execSync('sudo apt-get install -y wget curl gnupg', { stdio: 'inherit' });

    // Добавляем репозиторий MongoDB
    console.log('Adding MongoDB repository...');
    execSync(
      'curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor',
      { stdio: 'inherit' }
    );
    execSync(
      'echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list',
      { stdio: 'inherit' }
    );

    // Устанавливаем MongoDB
    console.log('Installing MongoDB...');
    execSync('sudo apt-get update', { stdio: 'inherit' });
    execSync('sudo apt-get install -y mongodb-org', { stdio: 'inherit' });

    console.log('✅ MongoDB installed successfully');

    // Предотвращаем автоматическое обновление
    execSync('echo "mongodb-org hold" | sudo dpkg --set-selections', { stdio: 'ignore' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to install MongoDB: ${errorMessage}`);
  }
}

/**
 * Устанавливает MongoDB
 */
async function installMongoDB(): Promise<void> {
  const platform = getPlatform();

  console.log(`\n🔍 Platform detected: ${platform}`);

  switch (platform) {
    case 'darwin':
      await installMongoDBDarwin();
      break;
    case 'linux':
      await installMongoDBLinux();
      break;
    case 'win32':
      throw new Error(
        'Windows installation is not automated. Please install MongoDB manually: https://www.mongodb.com/try/download/community'
      );
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

/**
 * Запускает MongoDB
 */
async function startMongoDB(): Promise<void> {
  const platform = getPlatform();
  const running = await isMongoDBRunning();

  if (running) {
    console.log('✅ MongoDB is already running');
    return;
  }

  console.log('🚀 Starting MongoDB...');

  try {
    switch (platform) {
      case 'darwin':
        try {
          execSync('brew services start mongodb-community', { stdio: 'inherit' });
          console.log('✅ MongoDB started via Homebrew');
        } catch {
          // Пробуем запустить напрямую
          execSync(
            'mongod --fork --logpath /usr/local/var/log/mongodb/mongo.log --dbpath /usr/local/var/mongodb',
            { stdio: 'inherit' }
          );
          console.log('✅ MongoDB started');
        }
        break;
      case 'linux':
        execSync('sudo systemctl start mongod', { stdio: 'inherit' });
        console.log('✅ MongoDB started via systemd');
        break;
      case 'win32':
        throw new Error('Please start MongoDB manually on Windows: net start MongoDB');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    // Ждем, пока MongoDB запустится
    console.log('⏳ Waiting for MongoDB to start...');
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      if (await isMongoDBRunning()) {
        console.log('✅ MongoDB is ready');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;
    }

    throw new Error('MongoDB failed to start within 30 seconds');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to start MongoDB: ${errorMessage}`);
  }
}

/**
 * Инициализирует базу данных (проверяет доступность)
 * MongoDB автоматически создаст БД при первом подключении
 */
async function initializeDatabase(): Promise<void> {
  console.log('📝 Verifying database setup...');

  // MongoDB автоматически создаст БД при первом подключении
  // Просто проверяем что сервер доступен через порт
  if (await isMongoDBRunning()) {
    console.log('✅ MongoDB is running');
    console.log('📊 Database "voice-assistant" will be created automatically on first connection');
  } else {
    console.log('⚠️  MongoDB may not be fully started yet');
    console.log('   Database will be created automatically when backend connects');
  }
}

/**
 * Основная функция
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const autoMode = args.includes('--auto') || args.includes('-y');

  console.log('🔍 Checking MongoDB status...\n');

  const status = await checkMongoDB();

  console.log(`Installed: ${status.installed ? '✅' : '❌'}`);
  console.log(`Running: ${status.running ? '✅' : '❌'}`);
  if (status.version) {
    console.log(`Version: ${status.version}`);
  }
  console.log();

  // Если MongoDB не установлена
  if (!status.installed) {
    console.log('❌ MongoDB is not installed');

    if (!autoMode) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise<string>((resolve) => {
        rl.question('Do you want to install MongoDB now? (y/n): ', resolve);
      });
      rl.close();

      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('❌ Installation cancelled');
        process.exit(1);
      }
    } else {
      console.log('🤖 Auto mode: Installing MongoDB...');
    }

    await installMongoDB();
  }

  // Если MongoDB не запущена
  if (!status.running) {
    console.log('❌ MongoDB is not running');
    await startMongoDB();
  } else {
    console.log('✅ MongoDB is already running');
  }

  // Инициализируем БД
  await initializeDatabase();

  console.log('\n✅ MongoDB setup completed successfully!');
}

// Запуск скрипта
if (require.main === module) {
  main().catch((error) => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

export { checkMongoDB, installMongoDB, startMongoDB, initializeDatabase };
