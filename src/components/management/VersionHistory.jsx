import React from 'react';
import { History, RotateCcw } from 'lucide-react';

const VersionHistory = ({ propertyId }) => {
  const history = [
    {
      id: 'v1.3',
      title: 'V1.3 - Description updated',
      author: 'Jaswant',
      time: '2 hours ago',
      current: true
    },
    {
      id: 'v1.2',
      title: 'V1.2 - Price updated',
      author: 'Jaswant',
      time: '2 days ago',
      current: false
    },
    {
      id: 'v1.1',
      title: 'V1.1 - Amenities updated',
      author: 'Admin',
      time: '5 days ago',
      current: false
    },
    {
      id: 'v1.0',
      title: 'V1.0 - Initial Publication',
      author: 'Jaswant',
      time: '2 weeks ago',
      current: false
    }
  ];

  const handleRestore = (version) => {
    alert(`Restoring to ${version}...`);
  };

  return (
    <div className="card glass-strong p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-accent-400" />
        <h3 className="text-lg font-semibold text-white">Version History</h3>
      </div>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-dark-800 hover:bg-dark-700 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-primary">{item.title}</h4>
                {item.current && (
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400">
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs text-muted mt-1">
                by {item.author} • {item.time}
              </p>
            </div>
            
            {!item.current && (
              <button 
                onClick={() => handleRestore(item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-secondary hover:text-white bg-dark-700 hover:bg-dark-600 border border-border transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restore
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;
