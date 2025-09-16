'use client';

import { useEffect, RefObject } from 'react';

export function useTextSelection(
  ref: RefObject<HTMLElement>,
  onSelect: (text: string) => void
) {
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection) {
        const selectedText = selection.toString().trim();
        if (selectedText.length > 0) {
          onSelect(selectedText);
        }
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [ref, onSelect]);
}
