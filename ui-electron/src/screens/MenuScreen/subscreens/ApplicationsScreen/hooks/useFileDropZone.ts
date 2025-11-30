import { useCallback, useState } from 'react';
import type { DragEvent } from 'react';

type UseFileDropZoneParams = {
  onFileSelected: (file: File | null) => void;
  onDragStateChange?: (active: boolean) => void;
};

export const useFileDropZone = ({ onFileSelected, onDragStateChange }: UseFileDropZoneParams) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const updateDragState = useCallback(
    (active: boolean) => {
      setIsDragActive(active);
      onDragStateChange?.(active);
    },
    [onDragStateChange]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      updateDragState(true);
    },
    [updateDragState]
  );

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      updateDragState(false);
    },
    [updateDragState]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      updateDragState(false);
      const file = event.dataTransfer.files?.[0] ?? null;
      onFileSelected(file);
    },
    [onFileSelected, updateDragState]
  );

  return {
    isDragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setDragActive: updateDragState,
  };
};
