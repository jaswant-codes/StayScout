import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function DrawerPanel({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full sm:w-[400px] h-full bg-dark-900 border-l border-border shadow-2xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-border bg-dark-800/50">
          <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-dark-700 text-text-secondary hover:text-white transition-colors"
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-dark-900">
          {children}
        </div>
      </div>
    </div>
  );
}
