import React from 'react';
import { MapPin, GraduationCap, Train, Hospital, Coffee, Map as MapIcon, Landmark } from 'lucide-react';

const MapWidget = ({ location, nearby = {} }) => {
  // Map category to icon
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'colleges':
      case 'universities':
      case 'education':
        return <GraduationCap size={18} className="text-accent-500" />;
      case 'transit':
      case 'metro':
      case 'bus':
        return <Train size={18} className="text-accent-500" />;
      case 'hospitals':
      case 'medical':
        return <Hospital size={18} className="text-accent-500" />;
      case 'food':
      case 'cafe':
      case 'restaurants':
        return <Coffee size={18} className="text-accent-500" />;
      default:
        return <Landmark size={18} className="text-accent-500" />;
    }
  };

  const getCategoryTitle = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const mapQuery = encodeURIComponent(location || 'Delhi, India');
  const freeMapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-dark-800 rounded-xl border border-border overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MapIcon className="text-accent-500" size={20} />
            Location & Neighborhood
          </h3>
          <p className="text-text-secondary mt-1 flex items-center gap-1.5 text-sm">
            <MapPin size={16} />
            {location || 'Location not specified'}
          </p>
        </div>
      </div>
      
      {/* Map Embed */}
      <div className="w-full h-64 bg-dark-900 relative">
        {location ? (
          <iframe
            src={freeMapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${location}`}
            className="opacity-80 filter grayscale contrast-125 invert" 
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
            <MapIcon size={48} className="mb-2 opacity-30" />
            <p>Map unavailable</p>
          </div>
        )}
      </div>

      {/* Nearby Places */}
      {nearby && Object.keys(nearby).length > 0 && (
        <div className="p-5">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">
            Nearby Places
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(nearby).map(([category, places]) => {
              if (!places || places.length === 0) return null;
              
              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    {getCategoryIcon(category)}
                    <span>{getCategoryTitle(category)}</span>
                  </div>
                  <ul className="space-y-2">
                    {places.map((place, idx) => (
                      <li key={idx} className="text-text-secondary text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 flex-shrink-0"></span>
                        <span className="leading-tight">{place}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWidget;
