import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

const EditableSection = ({ title, id, dirtySections, isSaving, onSave, children }) => {
  const isDirty = dirtySections?.has(id);

  return (
    <div className="card glass-strong rounded-2xl overflow-hidden mb-6 border border-border">
      <div className="flex items-center justify-between p-4 border-b border-border bg-dark-800">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <div className="flex items-center gap-3 text-sm">
          {isSaving ? (
            <div className="flex items-center gap-2 text-text-secondary">
              <Loader2 className="w-4 h-4 animate-spin text-accent-500" />
              <span>Saving...</span>
            </div>
          ) : isDirty ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-warning">
                <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
                <span>Unsaved changes</span>
              </div>
              <button 
                onClick={() => onSave(id)} 
                className="btn-primary py-1.5 px-4 text-sm"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 bg-dark-900/50">
        {children}
      </div>
    </div>
  );
};

export default EditableSection;
