import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

const SearchInput = () => {
  const { filters, updateFilters } = useTasks();
  const [localQuery, setLocalQuery] = useState(filters.query);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ query: localQuery });
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [localQuery, updateFilters]);

  const handleClear = () => {
    setLocalQuery('');
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search tasks... (Press / to focus)"
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;