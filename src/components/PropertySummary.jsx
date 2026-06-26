import { ShieldCheck, MapPin, Hash, Clock, Heart, Share2, Flag, Star } from 'lucide-react';
import StarRating from './StarRating';

export default function PropertySummary({ property }) {
  if (!property) return null;

  const isVerified = property.verified !== false;
  const createdDate = new Date(property.createdAt || Date.now());
  const updatedDate = property.updatedAt ? new Date(property.updatedAt) : createdDate;
  
  return (
    <div className="bg-dark-800 border-b border-border p-6 rounded-b-2xl glass-strong mb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        
        {/* Left Side: Details */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag-active bg-accent-500/20 text-accent-400 border-accent-500/30 uppercase tracking-wider text-xs">
              {property.propertyType || 'PG/Hostel'}
            </span>
            <span className="tag bg-dark-700 text-text-secondary border-border text-xs">
              {property.preference || 'Any'}
            </span>
            <span className="tag bg-success/20 text-success border-success/30 text-xs font-medium">
              Available Today
            </span>
            {!property.brokerage && (
              <span className="tag bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs font-medium">
                No Brokerage
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {property.name}
              </h1>
              {isVerified && (
                <div className="flex items-center gap-1 text-success bg-success/10 px-2.5 py-1 rounded-md text-xs font-medium border border-success/20 shrink-0">
                  <ShieldCheck size={16} />
                  <span>Verified</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-secondary">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-accent-500" />
                <span>{property.locality || property.area}, {property.city}</span>
              </div>
              <span className="hidden sm:inline text-border">•</span>
              <div className="flex items-center gap-1.5 text-text-muted">
                <Hash size={14} />
                <span>ID: {property.id?.slice(0, 8) || 'PROP-001'}</span>
              </div>
              <span className="hidden sm:inline text-border">•</span>
              <div className="flex items-center gap-1.5 text-text-muted">
                <Clock size={14} />
                <span>Updated {updatedDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1 bg-dark-900/50 rounded-lg px-3 py-1.5 border border-white/5">
              <span className="text-lg font-bold text-white">{property.avgRating?.toFixed(1) || '4.5'}</span>
              <StarRating rating={property.avgRating || 4.5} size={16} />
            </div>
            <a href="#reviews" className="text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors underline-offset-4 hover:underline">
              {property.reviewCount || 0} Reviews
            </a>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl bg-dark-700 hover:bg-dark-600 border border-border hover:border-white/20 text-text-secondary hover:text-error transition-all duration-300 group">
            <Heart size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium">Save</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl bg-dark-700 hover:bg-dark-600 border border-border hover:border-white/20 text-text-secondary hover:text-blue-400 transition-all duration-300 group">
            <Share2 size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium">Share</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl bg-dark-700 hover:bg-dark-600 border border-border hover:border-white/20 text-text-secondary hover:text-warning transition-all duration-300 group">
            <Flag size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium">Report</span>
          </button>
        </div>

      </div>
      
      {/* Full Address snippet if available */}
      {property.address && (
        <div className="mt-6 pt-4 border-t border-border/50 text-sm text-text-muted">
          <span className="font-medium text-text-secondary">Full Address: </span> 
          {property.address}
        </div>
      )}
    </div>
  );
}
