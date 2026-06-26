import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOwnerProperties, deleteProperty } from '../hooks/useProperties';
import { formatCurrency } from '../utils/helpers';
import StarRating from '../components/StarRating';
import Loader from '../components/Loader';
import {
  Plus,
  Edit3,
  Trash2,
  Building2,
  Star,
  Eye,
  MapPin,
} from 'lucide-react';

export default function OwnerDashboard() {
  const { user, userProfile } = useAuth();
  const { properties, loading } = useOwnerProperties(user?.uid);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This will also remove all reviews.`)) return;
    try {
      await deleteProperty(id);
    } catch (err) {
      console.error('Error deleting property:', err);
    }
  };

  const totalReviews = properties.reduce((sum, p) => sum + (p.reviewCount || 0), 0);
  const avgRating =
    properties.length > 0
      ? (properties.reduce((sum, p) => sum + (p.avgRating || 0), 0) / properties.length).toFixed(1)
      : '0.0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-10 animate-fade-in">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-2 tracking-tight">
            Owner Dashboard
          </h1>
          <p className="text-lg text-text-secondary">
            Manage your properties, <span className="gradient-text font-semibold">{userProfile?.name}</span>
          </p>
        </div>
        <Link to="/owner/add-property" className="btn-primary shadow-lg shadow-accent-500/30">
          <Plus size={16} />
          Add Property
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 stagger-children">
        <div className="glass-strong rounded-2xl p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center mb-4">
            <Building2 size={24} className="text-accent-400" />
          </div>
          <p className="text-3xl font-bold text-text-primary mb-1">{properties.length}</p>
          <p className="text-sm font-medium text-text-muted mt-auto">Total Properties</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-warning/15 flex items-center justify-center mb-4">
            <Star size={24} className="text-warning" />
          </div>
          <p className="text-3xl font-bold text-text-primary mb-1">{avgRating}</p>
          <p className="text-sm font-medium text-text-muted mt-auto">Average Rating</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center mb-4">
            <Eye size={24} className="text-success" />
          </div>
          <p className="text-3xl font-bold text-text-primary mb-1">{totalReviews}</p>
          <p className="text-sm font-medium text-text-muted mt-auto">Total Reviews</p>
        </div>
      </div>

      {/* Properties List */}
      <div className="animate-fade-in">
        <h2 className="text-lg font-semibold text-text-primary mb-5">
          Your Properties
        </h2>

        {loading ? (
          <Loader text="Loading properties..." />
        ) : properties.length === 0 ? (
          <div className="text-center py-16 glass rounded-xl">
            <Building2 size={32} className="text-text-muted mx-auto mb-3" />
            <h3 className="font-semibold text-text-primary mb-1">No properties listed</h3>
            <p className="text-sm text-text-muted mb-4">
              Start by adding your first property listing
            </p>
            <Link to="/owner/add-property" className="btn-primary text-sm">
              <Plus size={14} /> Add Property
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="glass rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 animate-fade-in"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-40 h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop'}
                    alt={property.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <Link
                      to={`/property/${property.id}`}
                      className="text-base font-semibold text-text-primary hover:text-accent-400 transition-colors truncate"
                    >
                      {property.name}
                    </Link>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                        property.availability === 'available'
                          ? 'bg-success/15 text-success'
                          : 'bg-error/15 text-error'
                      }`}
                    >
                      {property.availability === 'available' ? 'Available' : 'Full'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-text-muted mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {property.area}, {property.city}
                    </span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(property.rent)}/mo
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={Math.round(property.avgRating || 0)} size={13} />
                    <span className="text-xs text-text-muted">
                      {property.avgRating?.toFixed(1) || '0.0'} ({property.reviewCount || 0} reviews)
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/owner/edit-property/${property.id}`}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      <Edit3 size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id, property.name)}
                      className="btn-danger text-xs py-1.5 px-3"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
