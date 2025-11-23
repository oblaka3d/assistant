# THREE.js Renderer

Модуль для рендеринга 3D сцены с персонажем на основе THREE.js.

## Структура

- `main.ts` - точка входа, экспорт `initCharacterScene`
- `three/CharacterScene.ts` - основной класс управления сценой
- `three/loadCharacter.ts` - загрузка GLB моделей и управление анимациями
- `three/ToonShader.ts` - toon шейдер для стилизации персонажа

## Использование

```typescript
import { initCharacterScene } from '../renderer/main';

const scene = await initCharacterScene({
  canvas: canvasElement,
  modelUrl: './assets/models/character.glb',
  enableToonShader: false,
});

// Управление анимациями
scene.playIdle();
scene.playListening();
scene.playThinking();
scene.playTalking();
scene.playHeadNod();

// Получение списка доступных анимаций
const animations = scene.getAvailableAnimations();
```

## Модели

GLB модели должны находиться в `app/ui/public/assets/models/`.

При загрузке:

1. Ищется T-pose анимация (приоритет)
2. Если нет - используется idle анимация
3. Если нет - используется первая доступная анимация

## Анимации

**Встроенные из GLB:**

- Автоматически загружаются при загрузке модели
- Ищутся по имени: `idle`, `talking`, `listening`, `thinking`, `tpose`

**Программные:**

- Автоматически используются, если встроенные анимации не найдены
- Работают через изменение костей персонажа

## Оптимизации для ARM

- `antialias: false`
- `pixelRatio: 1`
- `shadows: false`
- Простое освещение (HemisphereLight + DirectionalLight)
