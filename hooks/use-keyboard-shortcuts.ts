// Keyboard shortcuts hook for builder
import { useEffect } from 'react';
import { useBuilderStore } from '@/lib/builder/store';

export const useKeyboardShortcuts = () => {
  const { 
    undo, 
    redo, 
    deleteElement, 
    selectedElementId,
    elements 
  } = useBuilderStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      
      // Ignore if typing in input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Undo: Ctrl/Cmd + Z
      if (mod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      
      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if ((mod && e.key === 'z' && e.shiftKey) || (mod && e.key === 'y')) {
        e.preventDefault();
        redo();
      }
      
      // Delete: Delete or Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        e.preventDefault();
        deleteElement(selectedElementId);
      }
      
      // Duplicate: Ctrl/Cmd + D
      if (mod && e.key === 'd' && selectedElementId) {
        e.preventDefault();
        // TODO: Implement duplicate
      }
      
      // Save: Ctrl/Cmd + S
      if (mod && e.key === 's') {
        e.preventDefault();
        console.log('Save triggered');
      }
      
      // Escape: Deselect
      if (e.key === 'Escape') {
        useBuilderStore.getState().selectElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, deleteElement, selectedElementId, elements]);
};
