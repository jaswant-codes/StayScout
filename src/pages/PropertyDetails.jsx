import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, firebaseInitialized } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useReviews, addReview } from '../hooks/useReviews';
import { mockProperties } from '../hooks/useProperties';
import { generateReviewSummary } from '../utils/reviewSummary';
import { formatCurrency, REVIEW_TAGS } from '../utils/helpers';
import ImageGallery from '../components/ImageGallery';
import StarRating from '../components/StarRating';
import FacilityTag from '../components/FacilityTag';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';
import {
  MapPin,
  User,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  XCircle,
  Send,
} from 'lucide-react';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userProfile, isStudent } = useAuth();
  const { reviews, loading: reviewsLoading, avgRating } = useReviews(id);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  // Review form
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const demoProp = mockProperties.find(p => p.id === id);
        if (demoProp) {
          setProperty(demoProp);
          return;
        }

        if (!firebaseInitialized || !db) {
          return;
        }

        const docSnap = await getDoc(doc(db, 'properties', id));
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  const handleContactOwner = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (mockProperties.some(p => p.id === id)) {
      setShowDemoAlert(true);
      setTimeout(() => setShowDemoAlert(false), 3000);
      return;
    }
    
    navigate('/chat', { state: { propertyId: id, ownerId: property.ownerId } });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    setSubmitting(true);
    try {
      await addReview({
        propertyId: id,
        userId: user.uid,
        userName: userProfile.name,
        rating,
        comment: comment.trim(),
        tags: selectedTags,
      });
      setRating(0);
      setComment('');
      setSelectedTags([]);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const reviewSummary = generateReviewSummary(reviews);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading property..." />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-text-primary mb-2">Property not found</h2>
          <Link to="/" className="text-accent-400 hover:text-accent-300">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <ImageGallery images={property.images || []} />

          {/* Info */}
          <div className="animate-fade-in">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                  {property.name}
                </h1>
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin size={16} />
                  <span>{property.area}, {property.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold gradient-text">
                    {formatCurrency(property.rent)}
                  </div>
                  <span className="text-xs text-text-muted">per month</span>
                </div>
              </div>
            </div>

            {/* Rating + Availability */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(avgRating)} size={18} />
                <span className="text-sm font-medium text-text-primary">
                  {avgRating || '0.0'}
                </span>
                <span className="text-sm text-text-muted">
                  ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                  property.availability === 'available'
                    ? 'bg-success/15 text-success border border-success/20'
                    : 'bg-error/15 text-error border border-error/20'
                }`}
              >
                {property.availability === 'available' ? (
                  <><CheckCircle size={12} /> Available</>
                ) : (
                  <><XCircle size={12} /> Full</>
                )}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">Description</h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            {/* Facilities */}
            {property.facilities?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-3">Facilities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.facilities.map((f) => (
                    <FacilityTag key={f} facility={f} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Review Summary */}
          {reviewSummary && (
            <div className="glass rounded-xl p-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-accent-400" />
                <h3 className="text-sm font-semibold text-text-primary">AI Review Summary</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{reviewSummary}</p>
            </div>
          )}

          {/* Reviews */}
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Student Reviews ({reviews.length})
            </h2>

            {/* Write Review Form */}
            {isStudent && (
              <div className="glass rounded-xl p-5 mb-6">
                <h3 className="text-sm font-semibold text-text-primary mb-4">
                  Write a Review
                </h3>

                {reviewSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm mb-4 animate-fade-in">
                    <CheckCircle size={16} />
                    Review submitted successfully!
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-2">
                      Your Rating
                    </label>
                    <StarRating
                      rating={rating}
                      interactive
                      onChange={setRating}
                      size={24}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-2">
                      Tags (optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {REVIEW_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedTags.includes(tag)
                              ? 'bg-accent-500 text-white'
                              : 'bg-dark-600 text-text-secondary hover:text-text-primary border border-border'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience..."
                      rows={4}
                      required
                      className="input-field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !rating}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        Submit Review
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {!isStudent && !user && (
              <div className="glass rounded-xl p-5 mb-6 text-center">
                <p className="text-sm text-text-secondary mb-3">
                  Sign in as a student to write a review
                </p>
                <Link to="/login" className="btn-primary text-sm">
                  Sign in
                </Link>
              </div>
            )}

            {/* Reviews List */}
            {reviewsLoading ? (
              <Loader text="Loading reviews..." />
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 bg-dark-700/30 rounded-xl border border-border">
                <p className="text-text-muted text-sm">No reviews yet. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Owner Info */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Listed by
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <User size={18} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {property.ownerName || 'Property Owner'}
                  </p>
                  <p className="text-xs text-text-muted">Verified Owner</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                Quick Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Rent</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(property.rent)}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Location</span>
                  <span className="text-text-secondary">{property.city}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Rating</span>
                  <span className="text-text-secondary">{avgRating || '—'}/5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Reviews</span>
                  <span className="text-text-secondary">{reviews.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Status</span>
                  <span className={property.availability === 'available' ? 'text-success' : 'text-error'}>
                    {property.availability === 'available' ? 'Available' : 'Full'}
                  </span>
                </div>
              </div>
              
              {/* Contact Button */}
              <div className="mt-6">
                <button 
                  onClick={handleContactOwner}
                  className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Contact Owner
                </button>
                {showDemoAlert && (
                  <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-lg flex items-center gap-2 text-warning text-xs animate-fade-in">
                    <XCircle size={14} />
                    Demo owner cannot be contacted
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
