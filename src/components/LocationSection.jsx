import React from 'react';
import { MapPin, Navigation, BookOpen, Utensils, ShoppingBag, Hospital, Train } from 'lucide-react';

const getCategoryIcon = (category) => {
  switch(category?.toLowerCase()) {
    case 'university':
    case 'school':
    case 'college':
      return <BookOpen size={20} />;
    case 'food':
    case 'restaurant':
    case 'cafe':
      return <Utensils size={20} />;
    case 'shopping':
    case 'mall':
    case 'supermarket':
      return <ShoppingBag size={20} />;
    case 'hospital':
    case 'clinic':
      return <Hospital size={20} />;
    case 'transit':
    case 'metro':
    case 'bus':
    case 'station':
      return <Train size={20} />;
    default:
      return <MapPin size={20} />;
  }
};

const getCommuteIcon = (type) => {
  switch(type?.toLowerCase()) {
    case 'walk': return '🚶';
    case 'drive': return '🚗';
    case 'bike': return '🚲';
    case 'transit': return '🚌';
    default: return '📍';
  }
};

export default function LocationSection({ location = "Pune, Maharashtra", commute = [], nearby = [] }) {
  // Use a generic dark map static image from a placeholder or simply a dark gradient if it fails
  // Since we can't reliably load Google maps without API key, we will use a generic map pattern background
  return (
    <div className="space-y-8 bg-dark-800 rounded-3xl p-6 md:p-8 border border-border">
      {/* Top Part: Map Placeholder */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <MapPin className="text-accent-500" />
          Location & Neighborhood
        </h3>
        <p className="text-text-secondary">{location}</p>
        
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-dark-900 border border-border group flex items-center justify-center">
          {/* Mock Map Background */}
          <div 
            className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>

          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center animate-pulse-glow">
              <MapPin size={32} className="text-accent-500" />
            </div>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary shadow-lg hover:scale-105 transition-transform flex items-center gap-2 px-6 py-3"
            >
              <Navigation size={18} />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Middle Part: Commute Times */}
      {commute && commute.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Commute Times</h4>
          <div className="flex flex-wrap gap-4">
            {commute.map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-dark-700 px-5 py-3 rounded-xl border border-dark-600 hover:border-accent-500/30 transition-colors">
                <span className="text-2xl">{getCommuteIcon(item.type)}</span>
                <div>
                  <div className="text-sm font-bold text-text-primary">{item.time}</div>
                  <div className="text-xs text-text-muted capitalize">{item.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Part: Nearby Places */}
      {nearby && nearby.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Nearby Places</h4>
          <div 
            className="flex overflow-x-auto gap-4 pb-4 -mx-2 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {nearby.map((place, index) => (
              <div 
                key={index} 
                className="snap-start shrink-0 w-64 bg-dark-700 p-4 rounded-2xl border border-dark-600 flex flex-col gap-3 hover:border-accent-500/50 transition-colors cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-dark-600 rounded-lg text-accent-400">
                    {getCategoryIcon(place.category)}
                  </div>
                  <span className="text-xs font-medium bg-dark-800 px-2 py-1 rounded-md text-text-secondary border border-border">
                    {place.distance}
                  </span>
                </div>
                
                <div>
                  <h5 className="font-semibold text-text-primary truncate" title={place.name}>{place.name}</h5>
                  <p className="text-xs text-text-muted capitalize mt-1">{place.category}</p>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-text-secondary pt-2 border-t border-dark-600">
                  {place.walkTime && (
                    <div className="flex items-center gap-1" title="Walking time">
                      <span>🚶</span> {place.walkTime}
                    </div>
                  )}
                  {place.driveTime && (
                    <div className="flex items-center gap-1" title="Driving time">
                      <span>🚗</span> {place.driveTime}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
