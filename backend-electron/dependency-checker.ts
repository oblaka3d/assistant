import { spawn } from 'child_process';
import { platform } from 'os';

import { checkAudioCommands } from './audio-utils';

export interface DependencyCheckResult {
  name: string;
  available: boolean;
  required: boolean;
  message?: string;
  installInstructions?: string;
}

/**
 * Проверяет доступность команды в системе
 */
function checkCommand(command: string, args: string[] = ['--version']): Promise<boolean> {
  return new Promise((resolve) => {
    const process = spawn(command, args);
    process.on('close', (code: number | null) => {
      resolve(code === 0);
    });
    process.on('error', () => {
      resolve(false);
    });
    // Таймаут на случай зависания
    setTimeout(() => resolve(false), 2000);
  });
}

/**
 * Получает инструкции по установке для текущей платформы
 */
function getInstallInstructions(tool: string): string {
  const os = platform();

  if (tool === 'sox') {
    if (os === 'linux') {
      return 'sudo apt install sox libsox-fmt-all';
    } else if (os === 'darwin') {
      return 'brew install sox';
    } else if (os === 'win32') {
      return 'choco install sox (или скачайте с http://sox.sourceforge.net/)';
    }
  } else if (tool === 'arecord' || tool === 'aplay') {
    if (os === 'linux') {
      return 'sudo apt install alsa-utils alsa-base';
    }
  }

  return 'Проверьте документацию для вашей платформы';
}

/**
 * Проверяет все необходимые зависимости
 */
export async function checkDependencies(): Promise<DependencyCheckResult[]> {
  const os = platform();
  const results: DependencyCheckResult[] = [];

  // Проверка аудио команд
  const audioCommands = await checkAudioCommands();

  if (os === 'linux') {
    // На Linux проверяем arecord/aplay или sox
    const hasArecord = await checkCommand('arecord');
    const hasAplay = await checkCommand('aplay');
    const hasSox = await checkCommand('sox');

    if (hasArecord && hasAplay) {
      results.push({
        name: 'ALSA (arecord/aplay)',
        available: true,
        required: false,
        message: 'ALSA утилиты доступны для записи и воспроизведения аудио',
      });
    } else {
      results.push({
        name: 'ALSA (arecord/aplay)',
        available: false,
        required: false,
        message: 'ALSA утилиты не найдены',
        installInstructions: getInstallInstructions('arecord'),
      });
    }

    if (hasSox) {
      results.push({
        name: 'sox',
        available: true,
        required: false,
        message: 'sox доступен как альтернатива для аудио',
      });
    } else {
      results.push({
        name: 'sox',
        available: false,
        required: !hasArecord || !hasAplay,
        message:
          hasArecord && hasAplay
            ? 'sox не найден (не требуется, так как ALSA доступен)'
            : 'sox не найден (требуется для работы аудио)',
        installInstructions: getInstallInstructions('sox'),
      });
    }
  } else {
    // На macOS и Windows проверяем только sox
    const hasSox = await checkCommand('sox');

    results.push({
      name: 'sox',
      available: hasSox,
      required: true,
      message: hasSox
        ? 'sox доступен для записи и воспроизведения аудио'
        : 'sox не найден (требуется для работы аудио)',
      installInstructions: hasSox ? undefined : getInstallInstructions('sox'),
    });
  }

  // Проверяем, есть ли хотя бы одна доступная команда для записи и воспроизведения
  if (!audioCommands.record || !audioCommands.play) {
    const missingCommands = [];
    if (!audioCommands.record) missingCommands.push('записи');
    if (!audioCommands.play) missingCommands.push('воспроизведения');

    results.push({
      name: 'Аудио функциональность',
      available: false,
      required: true,
      message: `Отсутствуют команды для ${missingCommands.join(' и ')}`,
      installInstructions: `Установите sox или ALSA утилиты согласно инструкциям выше`,
    });
  }

  return results;
}

/**
 * Выводит результаты проверки зависимостей в консоль
 */
export function printDependencyResults(results: DependencyCheckResult[]): void {
  console.log('\n=== Проверка зависимостей ===');

  let hasErrors = false;
  let hasWarnings = false;

  results.forEach((result) => {
    if (result.required && !result.available) {
      hasErrors = true;
      console.error(`\n❌ ${result.name}:`);
      console.error(`   ${result.message}`);
      if (result.installInstructions) {
        console.error(`   Установка: ${result.installInstructions}`);
      }
    } else if (!result.available && !result.required) {
      hasWarnings = true;
      console.warn(`\n⚠️  ${result.name}:`);
      console.warn(`   ${result.message}`);
      if (result.installInstructions) {
        console.warn(`   Установка: ${result.installInstructions}`);
      }
    } else {
      console.log(`\n✅ ${result.name}:`);
      console.log(`   ${result.message}`);
    }
  });

  if (hasErrors) {
    console.error('\n⚠️  ВНИМАНИЕ: Некоторые обязательные зависимости отсутствуют!');
    console.error('   Аудио функциональность может не работать.');
  } else if (hasWarnings) {
    console.warn('\n⚠️  Некоторые опциональные зависимости отсутствуют.');
    console.warn('   Приложение будет работать, но некоторые функции могут быть недоступны.');
  } else {
    console.log('\n✅ Все зависимости в порядке!');
  }

  console.log('=============================\n');
}

/**
 * Проверяет зависимости и возвращает true, если все обязательные зависимости доступны
 */
export async function checkDependenciesOnStartup(): Promise<boolean> {
  try {
    const results = await checkDependencies();
    printDependencyResults(results);

    // Проверяем, есть ли критические ошибки
    const criticalErrors = results.filter((r) => r.required && !r.available);

    if (criticalErrors.length > 0) {
      console.error(`\n❌ Найдено ${criticalErrors.length} критических ошибок зависимостей`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Ошибка при проверке зависимостей:', error);
    return false;
  }
}
