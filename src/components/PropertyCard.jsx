import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Heart, Share2, Bed, CheckCircle2, Zap, Clock, Maximize2 } from 'lucide-react';
import StarRating from './StarRating';
import { formatCurrency, truncateText } from '../utils/helpers';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../context/AuthContext';
import { useAnalytics } from '../hooks/useAnalytics';

export default function PropertyCard({ property }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const { trackListingClick } = useAnalytics();
  const [isHovered, setIsHovered] = useState(false);
  const [shareText, setShareText] = useState('Share');
  
  const thumbnail = property.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80';
  const isSaved = isInWishlist(property.id);

  // Time calculations
  const createdDate = new Date(property.createdAt || Date.now());
  const isNew = (Date.now() - createdDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
  
  // Format updated time
  const updatedDate = property.updatedAt ? new Date(property.updatedAt) : createdDate;
  const timeDiff = Math.floor((Date.now() - updatedDate.getTime()) / (1000 * 60 * 60));
  const updatedText = timeDiff < 24 ? `${timeDiff}h ago` : `${Math.floor(timeDiff/24)}d ago`;

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(property.id);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/property/${property.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.name,
          text: `Check out ${property.name} on StayScout`,
          url: url,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      setShareText('Copied!');
      setTimeout(() => setShareText('Share'), 2000);
    }
  };

  return (
    <div 
      className="card group relative flex flex-col h-full bg-dark-800 border-border hover:border-accent-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Floating Actions */}
      <div className={`absolute top-4 right-4 z-20 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 md:opacity-100 md:translate-x-0'}`}>
        <button 
          onClick={handleWishlist}
          className="p-2.5 rounded-full bg-dark-900/60 backdrop-blur-md border border-white/10 hover:bg-dark-800 text-white transition-all shadow-lg hover:scale-110 active:scale-95 group/btn"
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${isSaved ? 'fill-error text-error' : 'text-white group-hover/btn:text-error'}`} 
          />
        </button>
        <button 
          onClick={handleShare}
          className="p-2.5 rounded-full bg-dark-900/60 backdrop-blur-md border border-white/10 hover:bg-dark-800 text-white transition-all shadow-lg hover:scale-110 active:scale-95 group/share relative"
          aria-label="Share property"
        >
          <Share2 size={18} className="text-white group-hover/share:text-blue-400 transition-colors" />
          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-dark-800 text-xs font-medium text-white opacity-0 group-hover/share:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {shareText}
          </span>
        </button>
      </div>

      <Link 
        to={`/property/${property.id}`} 
        className="flex flex-col h-full"
        onClick={() => trackListingClick(property.id, property.name)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden h-[240px] shrink-0">
          <img
            src={thumbnail}
            alt={property.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-dark-900/30" />

          {/* Top Left Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
            {property.isFeatured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-accent-600 to-accent-500 text-white shadow-lg flex items-center gap-1">
                <Star size={12} className="fill-white" /> Featured
              </span>
            )}
            {isNew && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                New
              </span>
            )}
            {property.instantBook && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-dark-900 shadow-lg flex items-center gap-1">
                <Zap size={12} className="fill-dark-900" /> Instant Contact
              </span>
            )}
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-medium text-accent-400 bg-accent-500/20 backdrop-blur-md px-2 py-1 rounded border border-accent-500/30 mb-2 inline-block uppercase tracking-wider">
                  {property.propertyType} • {property.preference || 'Co-ed'}
                </span>
                <div className="flex items-center gap-1 text-white">
                  <span className="text-xs font-medium opacity-80">Starting from</span>
                </div>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-2xl font-bold">{formatCurrency(property.rent)}</span>
                  <span className="text-sm opacity-80 font-medium">/mo</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 bg-dark-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                  <Bed size={14} className="text-blue-400" />
                  <span className="font-semibold">{property.bedsAvailable || 2} Beds</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-bold text-lg text-text-primary group-hover:text-accent-400 transition-colors line-clamp-1">
              {property.name}
            </h3>
            {property.verified && (
              <div className="flex items-center gap-1 text-success shrink-0 bg-success/10 px-2 py-0.5 rounded text-xs font-medium border border-success/20">
                <ShieldCheck size={14} /> Verified
              </div>
            )}
          </div>

          {/* Location & Distance */}
          <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-4">
            <MapPin size={16} className="text-accent-500 shrink-0" />
            <span className="truncate">{property.area}, {property.city}</span>
            {property.distance && (
              <>
                <span className="text-text-muted mx-1">•</span>
                <span className="text-text-muted whitespace-nowrap">{property.distance} away</span>
              </>
            )}
          </div>

          {/* Facilities Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.facilities?.slice(0, 3).map((f) => (
              <span key={f} className="px-2.5 py-1 rounded-md text-xs font-medium bg-dark-700 text-text-secondary border border-border">
                {f}
              </span>
            ))}
            {property.facilities?.length > 3 && (
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-dark-700 text-text-muted border border-border">
                +{property.facilities.length - 3}
              </span>
            )}
          </div>

          {/* Footer Metrics */}
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <StarRating rating={property.avgRating || 0} size={14} />
                <span className="text-sm font-semibold text-text-primary">{property.avgRating?.toFixed(1) || 'New'}</span>
                {property.reviewCount > 0 && (
                  <span className="text-xs text-text-muted">({property.reviewCount})</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-text-muted">
                <Clock size={12} /> Updated {updatedText}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {property.ownerVerified && (
                <div className="flex items-center gap-1 text-xs text-text-muted mr-2" title="Verified Owner">
                  <CheckCircle2 size={14} className="text-blue-500" /> Owner
                </div>
              )}
              <button className="btn-secondary px-3 py-1.5 text-xs font-semibold gap-1 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <Maximize2 size={14} /> View
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
