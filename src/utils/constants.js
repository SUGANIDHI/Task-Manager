export const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-red-100 text-red-800 border-red-300',
};

export const STATUS_COLORS = {
  todo: 'bg-gray-100 text-gray-800 border-gray-300',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
  done: 'bg-green-100 text-green-800 border-green-300',
  archived: 'bg-gray-400 text-gray-700 border-gray-500',
};

export const KEYBOARD_SHORTCUTS = {
  NEW_TASK: 'n',
  EDIT_TASK: 'e',
  DELETE_TASK: 'd',
  SEARCH: '/',
  ESCAPE: 'Escape',
};

export const LOCAL_STORAGE_KEYS = {
  TASKS: 'taskmanager_tasks',
  FILTERS: 'taskmanager_filters',
  UI_PREFERENCES: 'taskmanager_ui_prefs',
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};

export const TOAST_DURATION = 3000;

export const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
};