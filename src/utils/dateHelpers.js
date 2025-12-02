import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), formatStr);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.error('Invalid date:', dateString);
    return '';
  }
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate));
};

export const isDueToday = (dueDate) => {
  if (!dueDate) return false;
  return isToday(parseISO(dueDate));
};

export const isDueTomorrow = (dueDate) => {
  if (!dueDate) return false;
  return isTomorrow(parseISO(dueDate));
};

export const getRelativeDateLabel = (dueDate) => {
  if (!dueDate) return '';
  
  if (isOverdue(dueDate)) return 'Overdue';
  if (isDueToday(dueDate)) return 'Today';
  if (isDueTomorrow(dueDate)) return 'Tomorrow';
  
  return formatDate(dueDate);
};

export const sortByDate = (tasks, order = 'asc') => {
  return [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
    const dateB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};