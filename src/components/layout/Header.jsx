import { Plus, Grid, List, Menu } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useTasks } from '../../hooks/useTasks';
import { VIEW_MODES } from '../../utils/constants';
import Button from '../ui/Button';
import SearchInput from '../filters/SearchInput';

const Header = () => {
  const { openEditor, viewMode, setViewMode } = useUI();
  const { tasks } = useTasks();

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => t.status !== 'done' && t.status !== 'archived')
      .length,
    completed: tasks.filter((t) => t.status === 'done').length,
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Menu className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">TaskManager</h1>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">{stats.active}</span>{' '}
                Active
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {stats.completed}
                </span>{' '}
                Done
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                <span className="font-semibold text-gray-900">{stats.total}</span>{' '}
                Total
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search - Hidden on mobile, shown on tablet+ */}
            <div className="hidden sm:block w-64">
              <SearchInput />
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode(VIEW_MODES.LIST)}
                className={`p-2 ${
                  viewMode === VIEW_MODES.LIST
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode(VIEW_MODES.GRID)}
                className={`p-2 ${
                  viewMode === VIEW_MODES.GRID
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Grid View"
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>

            {/* New Task Button */}
            <Button
              variant="primary"
              onClick={() => openEditor()}
              icon={Plus}
              className="shadow-sm"
            >
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-3">
          <SearchInput />
        </div>
      </div>
    </header>
  );
};

export default Header;