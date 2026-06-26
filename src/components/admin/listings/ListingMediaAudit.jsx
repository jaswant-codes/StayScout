import React from 'react';
import { ShieldCheck, AlertCircle, EyeOff } from 'lucide-react';

const ListingMediaAudit = ({ images = [] }) => {
  const getSimulatedAnalysis = (index) => {
    const statuses = [
      { text: 'High Quality', color: 'text-success', bg: 'bg-success/10', icon: ShieldCheck },
      { text: 'Watermarked', color: 'text-warning', bg: 'bg-warning/10', icon: AlertCircle },
      { text: 'Blurry', color: 'text-error', bg: 'bg-error/10', icon: EyeOff },
    ];
    return statuses[index % statuses.length];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white mb-4">Media Audit (AI Simulated)</h3>
      {images.length === 0 ? (
        <p className="text-text-muted">No images available for this listing.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => {
            const analysis = getSimulatedAnalysis(index);
            const Icon = analysis.icon;
            return (
              <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                <img 
                  src={img} 
                  alt={`Property media ${index + 1}`} 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium backdrop-blur-md bg-dark-900/80 border border-border">
                  <Icon size={14} className={analysis.color} />
                  <span className={analysis.color}>{analysis.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListingMediaAudit;
