import { useTasks } from '../../hooks/useTasks';
import { useUI } from '../../context/UIContext';
import TaskCard from './TaskCard';
import { AlertCircle } from 'lucide-react';

const TaskList = () => {
  const { filteredTasks, filters } = useTasks();
  const { viewMode } = useUI();

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <AlertCircle className="w-16 h-16 mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
        <p className="text-sm">
          {filters.query || filters.priority || filters.status
            ? 'Try adjusting your filters or search query'
            : 'Create your first task to get started!'}
        </p>
      </div>
    );
  }

  const gridClasses =
    viewMode === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      : 'space-y-3';

  return (
    <div className={gridClasses}>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;