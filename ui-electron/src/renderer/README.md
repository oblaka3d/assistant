# THREE.js Renderer

Рендеринг 3D сцены с персонажем.

## Структура

- **`main.ts`** - точка входа, `initCharacterScene`
- **`three/CharacterScene.ts`** - класс управления сценой
- **`three/loadCharacter.ts`** - загрузка GLB моделей
- **`three/ToonShader.ts`** - toon шейдер

## Использование

```typescript
import { initCharacterScene } from '../renderer/main';

const scene = await initCharacterScene({
  canvas: canvasElement,
  enableToonShader: false,
});

scene.playIdle();
scene.playTalking();
```

## Анимации

Автоматически загружаются из GLB или используются программные:

- `idle`, `talking`, `listening`, `thinking`, `tpose`
