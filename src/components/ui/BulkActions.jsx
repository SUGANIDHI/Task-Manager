import { Trash2, CheckSquare, Square } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useUI } from '../../context/UIContext';
import Button from './Button';

const BulkActions = () => {
  const { selectedTasks, clearSelection, selectAllTasks, showToast } = useUI();
  const { filteredTasks, bulkDelete, bulkUpdateStatus } = useTasks();

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      clearSelection();
    } else {
      selectAllTasks(filteredTasks.map((t) => t.id));
    }
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedTasks.length} task(s)?`
      )
    ) {
      bulkDelete(selectedTasks);
      clearSelection();
      showToast(
        `${selectedTasks.length} task(s) deleted successfully`,
        'success'
      );
    }
  };

  const handleBulkComplete = () => {
    bulkUpdateStatus(selectedTasks, 'done');
    clearSelection();
    showToast(
      `${selectedTasks.length} task(s) marked as complete`,
      'success'
    );
  };

  if (selectedTasks.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 flex items-center gap-4 z-40">
      <span className="text-sm font-medium text-gray-700">
        {selectedTasks.length} selected
      </span>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSelectAll}
          icon={
            selectedTasks.length === filteredTasks.length
              ? CheckSquare
              : Square
          }
        >
          {selectedTasks.length === filteredTasks.length
            ? 'Deselect All'
            : 'Select All'}
        </Button>

        <Button
          variant="success"
          size="sm"
          onClick={handleBulkComplete}
          icon={CheckSquare}
        >
          Mark Complete
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={handleBulkDelete}
          icon={Trash2}
        >
          Delete
        </Button>

        <Button variant="ghost" size="sm" onClick={clearSelection}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;