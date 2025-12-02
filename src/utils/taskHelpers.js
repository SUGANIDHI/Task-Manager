import { v4 as uuidv4 } from 'uuid';

export const createTask = (taskData) => {
  return {
    id: uuidv4(),
    title: '',
    description: '',
    createdAt: new Date().toISOString(),
    status: 'todo',
    priority: 'medium',
    tags: [],
    subtasks: [],
    ...taskData,
  };
};

export const updateTask = (task, updates) => {
  return {
    ...task,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
};

export const toggleTaskStatus = (task) => {
  const newStatus = task.status === 'done' ? 'todo' : 'done';
  return {
    ...task,
    status: newStatus,
    completedAt: newStatus === 'done' ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString(),
  };
};

export const filterTasks = (tasks, filters) => {
  return tasks.filter((task) => {
    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDescription = task.description?.toLowerCase().includes(query);
      const matchesTags = task.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      if (!matchesTitle && !matchesDescription && !matchesTags) return false;
    }

    // Priority filter
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    // Status filter
    if (filters.status && task.status !== filters.status) {
      return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasTag = filters.tags.some((filterTag) =>
        task.tags?.includes(filterTag)
      );
      if (!hasTag) return false;
    }

    return true;
  });
};

export const groupTasksByStatus = (tasks) => {
  return tasks.reduce(
    (groups, task) => {
      const status = task.status || 'todo';
      groups[status].push(task);
      return groups;
    },
    {
      todo: [],
      'in-progress': [],
      done: [],
      archived: [],
    }
  );
};

export const sortTasks = (tasks, sortBy = 'dueDate', order = 'asc') => {
  return [...tasks].sort((a, b) => {
    let compareA = a[sortBy];
    let compareB = b[sortBy];

    // Handle undefined values
    if (compareA === undefined) compareA = '';
    if (compareB === undefined) compareB = '';

    // Date comparison
    if (sortBy === 'dueDate' || sortBy === 'createdAt') {
      compareA = compareA ? new Date(compareA) : new Date(8640000000000000);
      compareB = compareB ? new Date(compareB) : new Date(8640000000000000);
    }

    // String comparison
    if (typeof compareA === 'string') {
      compareA = compareA.toLowerCase();
      compareB = compareB.toLowerCase();
    }

    if (compareA < compareB) return order === 'asc' ? -1 : 1;
    if (compareA > compareB) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const getTaskStats = (tasks) => {
  return {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
    overdue: tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
    ).length,
  };
};