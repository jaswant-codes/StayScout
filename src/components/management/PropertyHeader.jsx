import React from 'react';
import { ShieldCheck, MapPin, Building2, Tag } from 'lucide-react';

const PropertyHeader = ({ property }) => {
  if (!property) return null;

  const isLive = property.status === 'live' || property.status === 'Live';

  return (
    <div className="card glass-strong p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Cover Image */}
        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-border">
          <img 
            src={property.coverImage || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400'} 
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{property.name || 'Unnamed Property'}</h1>
            {property.isVerified && (
              <span className="flex items-center gap-1 text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isLive ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
              {isLive ? 'Live' : 'Draft'}
            </span>
          </div>

          <p className="text-muted text-sm flex items-center gap-1.5 mb-4">
            <MapPin className="w-4 h-4" />
            {property.address || 'Address not provided'}
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-secondary">
              <Building2 className="w-4 h-4" />
              <span>{property.type || 'PG/Hostel'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-secondary">
              <Tag className="w-4 h-4" />
              <span>ID: {property.id || 'PROP-001'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
