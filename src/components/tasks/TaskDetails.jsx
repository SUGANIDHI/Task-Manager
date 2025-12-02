import { useTasks } from '../../hooks/useTasks';
import { formatDate } from '../../utils/dateHelpers';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../utils/constants';
import { Calendar, Flag, Tag, Clock } from 'lucide-react';

const TaskDetails = ({ taskId }) => {
  const { tasks } = useTasks();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return null;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
        {task.description && (
          <p className="text-gray-600">{task.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
        {/* Status */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <span
            className={`inline-block px-3 py-1 rounded-full border text-sm ${
              STATUS_COLORS[task.status]
            }`}
          >
            {task.status?.replace('-', ' ')}
          </span>
        </div>

        {/* Priority */}
        {task.priority && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Priority</p>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm ${
                PRIORITY_COLORS[task.priority]
              }`}
            >
              <Flag className="w-3 h-3" />
              {task.priority}
            </span>
          </div>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Due Date</p>
            <div className="flex items-center gap-1 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(task.dueDate, 'MMM dd, yyyy HH:mm')}</span>
            </div>
          </div>
        )}

        {/* Created */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Created</p>
          <div className="flex items-center gap-1 text-gray-700">
            <Clock className="w-4 h-4" />
            <span>{formatDate(task.createdAt, 'MMM dd, yyyy HH:mm')}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Tag className="w-4 h-4" />
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Subtasks */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-2">Subtasks</p>
          <div className="space-y-2">
            {task.subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.done}
                  readOnly
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span
                  className={subtask.done ? 'line-through text-gray-500' : ''}
                >
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;