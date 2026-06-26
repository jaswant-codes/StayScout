import React from 'react';
import { ToggleRight } from 'lucide-react';

const FeatureToggles = ({ features = [], onToggle }) => {
  // Normalize features to array if it's an object
  const featureList = Array.isArray(features) 
    ? features 
    : Object.entries(features || {}).map(([key, value]) => ({
        id: key,
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), // Convert camelCase to Title Case
        enabled: Boolean(value)
      }));

  return (
    <div className="card bg-dark-800 border border-border p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
          <ToggleRight className="w-5 h-5 text-accent-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Feature Flags</h2>
          <p className="text-sm text-text-muted">Enable or disable platform features</p>
        </div>
      </div>

      <div className="space-y-4">
        {featureList.map((feature, index) => (
          <div key={feature.id || index} className="flex items-center justify-between p-4 rounded-lg bg-dark-700/50 border border-border">
            <div>
              <h3 className="font-medium text-white">{feature.name}</h3>
              {feature.description && (
                <p className="text-xs text-text-muted mt-1">{feature.description}</p>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => onToggle && onToggle(feature.id, !feature.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                feature.enabled ? 'bg-accent-500' : 'bg-dark-600'
              }`}
            >
              <span className="sr-only">Toggle {feature.name}</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  feature.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
        {featureList.length === 0 && (
          <div className="text-center p-4 text-text-muted">
            No features available to configure.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureToggles;
