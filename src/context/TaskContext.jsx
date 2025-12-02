import { createContext, useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import {
  createTask,
  updateTask,
  toggleTaskStatus,
  filterTasks,
  sortTasks,
} from '../utils/taskHelpers';

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage(LOCAL_STORAGE_KEYS.TASKS, []);
  const [filters, setFilters] = useState({
    query: '',
    priority: null,
    status: null,
    tags: [],
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: 'createdAt',
    order: 'desc',
  });

  // Add task
  const addTask = useCallback(
    (taskData) => {
      const newTask = createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    },
    [setTasks]
  );

  // Update task
  const editTask = useCallback(
    (taskId, updates) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? updateTask(task, updates) : task
        )
      );
    },
    [setTasks]
  );

  // Delete task
  const deleteTask = useCallback(
    (taskId) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    },
    [setTasks]
  );

  // Toggle task completion
  const toggleTask = useCallback(
    (taskId) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? toggleTaskStatus(task) : task
        )
      );
    },
    [setTasks]
  );

  // Bulk delete
  const bulkDelete = useCallback(
    (taskIds) => {
      setTasks((prev) => prev.filter((task) => !taskIds.includes(task.id)));
    },
    [setTasks]
  );

  // Bulk update status
  const bulkUpdateStatus = useCallback(
    (taskIds, status) => {
      setTasks((prev) =>
        prev.map((task) =>
          taskIds.includes(task.id) ? updateTask(task, { status }) : task
        )
      );
    },
    [setTasks]
  );

  // Get filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let result = filterTasks(tasks, filters);
    result = sortTasks(result, sortConfig.sortBy, sortConfig.order);
    return result;
  }, [tasks, filters, sortConfig]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      query: '',
      priority: null,
      status: null,
      tags: [],
    });
  }, []);

  // Update sort config
  const updateSort = useCallback((sortBy, order) => {
    setSortConfig({ sortBy, order });
  }, []);

  const value = {
    tasks,
    filteredTasks,
    filters,
    sortConfig,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    bulkDelete,
    bulkUpdateStatus,
    updateFilters,
    clearFilters,
    updateSort,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};