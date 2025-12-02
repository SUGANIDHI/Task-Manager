import { useEffect } from 'react';
import { KEYBOARD_SHORTCUTS } from '../utils/constants';

export const useKeyboardShortcuts = (callbacks) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore if user is typing in an input or textarea
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable
      ) {
        // Allow escape key to work in inputs
        if (event.key !== KEYBOARD_SHORTCUTS.ESCAPE) {
          return;
        }
      }

      const key = event.key.toLowerCase();

      // Handle shortcuts
      if (key === KEYBOARD_SHORTCUTS.NEW_TASK && callbacks.onNew) {
        event.preventDefault();
        callbacks.onNew();
      } else if (key === KEYBOARD_SHORTCUTS.EDIT_TASK && callbacks.onEdit) {
        event.preventDefault();
        callbacks.onEdit();
      } else if (key === KEYBOARD_SHORTCUTS.DELETE_TASK && callbacks.onDelete) {
        event.preventDefault();
        callbacks.onDelete();
      } else if (key === KEYBOARD_SHORTCUTS.SEARCH && callbacks.onSearch) {
        event.preventDefault();
        callbacks.onSearch();
      } else if (key === KEYBOARD_SHORTCUTS.ESCAPE && callbacks.onEscape) {
        event.preventDefault();
        callbacks.onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [callbacks]);
};