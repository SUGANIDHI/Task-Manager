import { useTasks } from '../../hooks/useTasks';
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';

const FiltersBar = () => {
  const { filters, updateFilters, clearFilters } = useTasks();

  const priorities = ['low', 'medium', 'high'];
  const statuses = ['todo', 'in-progress', 'done'];

  const hasActiveFilters =
    filters.priority || filters.status || filters.tags?.length > 0;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters:</span>
        </div>

        {/* Priority Filter */}
        <div className="flex gap-2">
          <span className="text-sm text-gray-600 self-center">Priority:</span>
          {priorities.map((priority) => (
            <button
              key={priority}
              onClick={() =>
                updateFilters({
                  priority: filters.priority === priority ? null : priority,
                })
              }
              className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                filters.priority === priority
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          <span className="text-sm text-gray-600 self-center">Status:</span>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() =>
                updateFilters({
                  status: filters.status === status ? null : status,
                })
              }
              className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                filters.status === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} icon={X}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FiltersBar;