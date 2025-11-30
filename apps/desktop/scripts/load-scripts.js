#!/usr/bin/env node

/**
 * Скрипт для загрузки команд из commands.json в package.json
 * Запускается автоматически через npm prepare hook
 */

const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, 'commands.json');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

function loadCommands() {
  if (!fs.existsSync(commandsPath)) {
    console.warn('⚠️  commands.json not found, skipping script loading');
    return;
  }

  const commandsData = JSON.parse(fs.readFileSync(commandsPath, 'utf-8'));
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Сохраняем основные команды из package.json (которые имеют приоритет)
  const essentialScripts = { ...packageJson.scripts };

  // Объединяем все команды: сначала из commands.json, потом основные из package.json (перезаписывают)
  packageJson.scripts = {
    ...commandsData.scripts,
    ...essentialScripts, // Основные команды из package.json перезаписывают commands.json
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
  console.log('✅ Scripts loaded from commands.json');
}

if (require.main === module) {
  loadCommands();
}

module.exports = { loadCommands };
