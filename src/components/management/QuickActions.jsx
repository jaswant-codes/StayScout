import React from 'react';
import { Eye, Pause, Play, Copy, CopyPlus } from 'lucide-react';

const QuickActions = ({ togglePreview, status }) => {
  const isLive = status === 'live' || status === 'Live';

  const handleCopyLink = () => {
    alert("Listing link copied to clipboard!");
  };

  const handleDuplicate = () => {
    alert("Property duplicated successfully!");
  };

  return (
    <div className="card glass-strong p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button 
          onClick={togglePreview}
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-accent-500 bg-dark-800 hover:bg-dark-700 transition-colors gap-2 text-primary hover:text-accent-400 group"
        >
          <Eye className="w-6 h-6 text-secondary group-hover:text-accent-400" />
          <span className="text-sm font-medium">Preview Listing</span>
        </button>

        <button 
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-warning/50 bg-dark-800 hover:bg-dark-700 transition-colors gap-2 text-primary hover:text-warning group"
        >
          {isLive ? (
            <>
              <Pause className="w-6 h-6 text-secondary group-hover:text-warning" />
              <span className="text-sm font-medium">Pause Listing</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6 text-secondary group-hover:text-success" />
              <span className="text-sm font-medium">Resume Listing</span>
            </>
          )}
        </button>

        <button 
          onClick={handleDuplicate}
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-accent-500 bg-dark-800 hover:bg-dark-700 transition-colors gap-2 text-primary hover:text-accent-400 group"
        >
          <CopyPlus className="w-6 h-6 text-secondary group-hover:text-accent-400" />
          <span className="text-sm font-medium">Duplicate</span>
        </button>

        <button 
          onClick={handleCopyLink}
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-accent-500 bg-dark-800 hover:bg-dark-700 transition-colors gap-2 text-primary hover:text-accent-400 group"
        >
          <Copy className="w-6 h-6 text-secondary group-hover:text-accent-400" />
          <span className="text-sm font-medium">Copy Link</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
