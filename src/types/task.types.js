/**
 * @typedef {string} TaskID
 */

/**
 * @typedef {'low' | 'medium' | 'high'} Priority
 */

/**
 * @typedef {'todo' | 'in-progress' | 'done' | 'archived'} Status
 */

/**
 * @typedef {Object} Subtask
 * @property {string} id
 * @property {string} title
 * @property {boolean} done
 */

/**
 * @typedef {Object} Task
 * @property {TaskID} id
 * @property {string} title
 * @property {string} [description]
 * @property {string} createdAt - ISO date string
 * @property {string} [updatedAt] - ISO date string
 * @property {string} [dueDate] - ISO date string
 * @property {Priority} [priority]
 * @property {Status} [status]
 * @property {string[]} [tags]
 * @property {Subtask[]} [subtasks]
 * @property {string} [color]
 * @property {string} [assignedTo]
 * @property {string | null} [completedAt]
 */

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
  ARCHIVED: 'archived',
};