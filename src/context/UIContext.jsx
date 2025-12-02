import { createContext, useState, useCallback, useContext } from 'react';
import { VIEW_MODES, TOAST_DURATION } from '../utils/constants';

export const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [viewMode, setViewMode] = useState(VIEW_MODES.LIST);
  const [toasts, setToasts] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Editor controls
  const openEditor = useCallback((taskId = null) => {
    setSelectedTaskId(taskId);
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setSelectedTaskId(null);
  }, []);

  // Toast notifications
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Selection controls
  const toggleSelectTask = useCallback((taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  }, []);

  const selectAllTasks = useCallback((taskIds) => {
    setSelectedTasks(taskIds);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTasks([]);
  }, []);

  const value = {
    editorOpen,
    selectedTaskId,
    viewMode,
    toasts,
    selectedTasks,
    openEditor,
    closeEditor,
    setViewMode,
    showToast,
    removeToast,
    toggleSelectTask,
    selectAllTasks,
    clearSelection,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};