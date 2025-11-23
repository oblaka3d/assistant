# THREE.js Renderer

Этот модуль содержит реализацию 3D сцены с персонажем на основе THREE.js.

## Структура

- `three/CharacterScene.ts` - Основной класс для управления THREE.js сценой
- `three/ToonShader.ts` - Toon шейдер для стилизации персонажа
- `three/loadCharacter.ts` - Загрузчик GLB/VRM моделей и контроллер анимаций
- `main.ts` - Инициализация и экспорт сцены

## Использование

```typescript
import { initCharacterScene } from '../renderer/main';

const scene = await initCharacterScene({
  canvas: canvasElement,
  modelUrl: '/assets/models/character.glb',
  onProgress: (progress) => console.log(progress),
  enableToonShader: true,
});

// Управление анимациями
scene.playIdle();
scene.playListening();
scene.playThinking();
scene.playTalking();
scene.playHeadNod();
```

## Модели персонажа

Поместите GLB модель персонажа в:

- `app/ui/public/assets/models/character.glb`

Если модель не найдена, будет использован простой placeholder.

## Оптимизации для ARM

- `antialias: false` - отключено для производительности
- `pixelRatio: 1` - фиксированный pixel ratio
- `shadows: false` - тени отключены
- Простое освещение (HemisphereLight + DirectionalLight)

## Toon Shader

Применяется автоматически к модели персонажа. Создает:

- 2-3 ступени яркости
- Outline эффект
- Стилизованный внешний вид
