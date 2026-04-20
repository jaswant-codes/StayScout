import { Link } from 'react-router-dom';
import { MapPin, IndianRupee } from 'lucide-react';
import StarRating from './StarRating';
import { formatCurrency, truncateText } from '../utils/helpers';

export default function PropertyCard({ property }) {
  const thumbnail = property.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop';

  return (
    <Link to={`/property/${property.id}`} className="block group">
      <div className="card">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: '200px' }}>
          <img
            src={thumbnail}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />

          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                property.availability === 'available'
                  ? 'bg-success/20 text-success border border-success/30'
                  : 'bg-error/20 text-error border border-error/30'
              }`}
            >
              {property.availability === 'available' ? 'Available' : 'Full'}
            </span>
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1.5 rounded-lg bg-dark-900/80 backdrop-blur-sm text-white font-bold text-sm flex items-center gap-1">
              {formatCurrency(property.rent)}
              <span className="text-text-muted font-normal text-xs">/mo</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-text-primary mb-1.5 group-hover:text-accent-400 transition-colors">
            {property.name}
          </h3>

          <div className="flex items-center gap-1.5 text-text-muted text-sm mb-3">
            <MapPin size={14} />
            <span>{property.area}, {property.city}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(property.avgRating || 0)} size={14} />
              <span className="text-sm text-text-secondary">
                {property.avgRating?.toFixed(1) || '0.0'}
              </span>
            </div>
            <span className="text-xs text-text-muted">
              {property.reviewCount || 0} reviews
            </span>
          </div>

          {/* Facility preview */}
          {property.facilities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {property.facilities.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded-full text-xs bg-dark-600 text-text-muted"
                >
                  {f}
                </span>
              ))}
              {property.facilities.length > 3 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-dark-600 text-text-muted">
                  +{property.facilities.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
