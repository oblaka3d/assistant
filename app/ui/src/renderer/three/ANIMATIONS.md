# Анимации персонажа

## Типы анимаций

### Встроенные из GLB

Анимации из файла модели автоматически загружаются при загрузке персонажа.

**Поддерживаемые имена:**
- `tpose` или `t-pose` - T-pose (используется по умолчанию)
- `idle` - анимация покоя
- `listening` - анимация прослушивания
- `thinking` - анимация размышления
- `talking` - анимация разговора

**Проверка доступных анимаций:**

В консоли после загрузки модели:
```
[loadCharacterGLB] Available animations: [...]
[CharacterAnimationController] Available animations: [...]
```

### Программные анимации

Если встроенная анимация не найдена, используется программная версия:

- **Talking** - покачивание головы вверх-вниз
- **Listening** - наклон головы в сторону
- **Thinking** - медленное покачивание головы

## Использование

```typescript
// В компоненте
sceneRef.current?.playIdle();
sceneRef.current?.playTalking();
sceneRef.current?.playListening();
sceneRef.current?.playThinking();

// Получить список доступных анимаций
const animations = sceneRef.current?.getAvailableAnimations();
```

## Настройка

В настройках можно изменить скорость анимаций через слайдер "Скорость анимации".
