import { X, AlertTriangle, Info } from 'lucide-react';
import { useEffect } from 'react';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  isDestructive = false,
  children
}) {
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative w-full max-w-md bg-dark-900 border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in glass-strong">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-full ${isDestructive ? 'bg-error/10 text-error' : 'bg-accent-500/10 text-accent-500'}`}>
              {isDestructive ? <AlertTriangle size={24} /> : <Info size={24} />}
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-dark-800 text-text-secondary hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {title}
          </h3>
          <p className="text-text-secondary mb-4">
            {message}
          </p>
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 pt-0">
          <button 
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={isDestructive ? "btn-danger" : "btn-primary"}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
