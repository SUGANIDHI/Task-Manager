import { TaskProvider } from './context/TaskContext';
import { UIProvider } from './context/UIContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useUI } from './context/UIContext';
import {
  Layout,
  TaskList,
  TaskEditor,
  FiltersBar,
  Notifications,
  BulkActions,
} from './components';

const AppContent = () => {
  const { openEditor, closeEditor, clearSelection } = useUI();

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onNew: () => openEditor(),
    onEscape: () => {
      closeEditor();
      clearSelection();
    },
  });

  return (
    <Layout>
      <FiltersBar />
      <div className="mt-6">
        <TaskList />
      </div>
      <TaskEditor />
      <BulkActions />
      <Notifications />
    </Layout>
  );
};

function App() {
  return (
    <TaskProvider>
      <UIProvider>
        <AppContent />
      </UIProvider>
    </TaskProvider>
  );
}

export default App;