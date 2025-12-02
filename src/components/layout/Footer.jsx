const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} TaskManager. Built with React + Vite.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>v1.0.0</span>
            <span className="text-gray-400">•</span>
            <span>Keyboard shortcuts: N (new), E (edit), D (delete)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;