import { Edit2, Trash2, Calendar, Flag, CheckCircle, Circle } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useUI } from '../../context/UIContext';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../utils/constants';
import { getRelativeDateLabel, isOverdue } from '../../utils/dateHelpers';

const TaskCard = ({ task }) => {
  const { deleteTask, toggleTask } = useTasks();
  const { openEditor, toggleSelectTask, selectedTasks, showToast } = useUI();

  const isSelected = selectedTasks.includes(task.id);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      showToast('Task deleted successfully', 'success');
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    openEditor(task.id);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleTask(task.id);
  };

  const handleSelect = (e) => {
    if (e.target.type === 'checkbox') {
      toggleSelectTask(task.id);
    }
  };

  const isDone = task.status === 'done';
  const overdue = isOverdue(task.dueDate) && !isDone;

  return (
    <div
      onClick={() => openEditor(task.id)}
      className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
      } ${isDone ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />

        {/* Status Toggle */}
        <button
          onClick={handleToggle}
          className="mt-0.5 text-gray-400 hover:text-blue-600 transition-colors"
        >
          {isDone ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-900 mb-1 ${
              isDone ? 'line-through' : ''
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 flex-wrap text-xs">
            {/* Due Date */}
            {task.dueDate && (
              <span
                className={`flex items-center gap-1 ${
                  overdue ? 'text-red-600 font-semibold' : 'text-gray-500'
                }`}
              >
                <Calendar className="w-3 h-3" />
                {getRelativeDateLabel(task.dueDate)}
              </span>
            )}

            {/* Priority */}
            {task.priority && (
              <span
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                  PRIORITY_COLORS[task.priority]
                }`}
              >
                <Flag className="w-3 h-3" />
                {task.priority}
              </span>
            )}

            {/* Status */}
            <span
              className={`px-2 py-0.5 rounded-full border text-xs ${
                STATUS_COLORS[task.status]
              }`}
            >
              {task.status?.replace('-', ' ')}
            </span>

            {/* Tags */}
            {task.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <button
            onClick={handleEdit}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;