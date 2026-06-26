import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserReviews } from '../hooks/useReviews';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';
import {
  Search,
  MessageCircle,
  Star,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function StudentDashboard() {
  const { userProfile } = useAuth();
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      if (!userProfile?.id) return;
      try {
        const reviews = await getUserReviews(userProfile.id);
        setMyReviews(reviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [userProfile?.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-10 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-2 tracking-tight">
          Welcome back, <span className="gradient-text">{userProfile?.name}</span> 👋
        </h1>
        <p className="text-lg text-text-secondary">
          Here's your student dashboard
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 stagger-children">
        <Link to="/" className="glass-strong rounded-2xl p-6 group hover:-translate-y-1 hover:shadow-xl transition-all h-full flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center mb-4 group-hover:bg-accent-500/25 transition-colors">
            <Search size={24} className="text-accent-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Explore Properties</h3>
          <p className="text-sm text-text-muted mb-4 flex-grow">Browse and find your ideal stay</p>
          <span className="text-sm font-medium text-accent-400 flex items-center gap-1 group-hover:gap-2 transition-all">
            Browse now <ArrowRight size={14} />
          </span>
        </Link>

        <Link to="/inbox" className="glass-strong rounded-2xl p-6 group hover:-translate-y-1 hover:shadow-xl transition-all h-full flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-success/15 flex items-center justify-center mb-4 group-hover:bg-success/25 transition-colors">
            <MessageCircle size={24} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Community Chat</h3>
          <p className="text-sm text-text-muted mb-4 flex-grow">Connect with fellow students</p>
          <span className="text-sm font-medium text-success flex items-center gap-1 group-hover:gap-2 transition-all">
            Open chat <ArrowRight size={14} />
          </span>
        </Link>

        <div className="glass-strong rounded-2xl p-6 h-full flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-warning/15 flex items-center justify-center mb-4">
            <Star size={24} className="text-warning" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Your Reviews</h3>
          <p className="text-sm text-text-muted mb-4 flex-grow">You've written {myReviews.length} reviews</p>
          <span className="text-sm font-medium text-warning">{myReviews.length} total</span>
        </div>
      </div>

      {/* My Reviews */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={20} className="text-accent-400" />
          <h2 className="text-lg font-semibold text-text-primary">Your Reviews</h2>
        </div>

        {loading ? (
          <Loader text="Loading your reviews..." />
        ) : myReviews.length === 0 ? (
          <div className="text-center py-16 glass rounded-xl">
            <Star size={32} className="text-text-muted mx-auto mb-3" />
            <h3 className="font-semibold text-text-primary mb-1">No reviews yet</h3>
            <p className="text-sm text-text-muted mb-4">
              Start by exploring properties and sharing your experience
            </p>
            <Link to="/" className="btn-primary text-sm">
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myReviews.map((review) => (
              <Link key={review.id} to={`/property/${review.propertyId}`}>
                <ReviewCard review={review} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
