import StarRating from './StarRating';
import { formatDate } from '../utils/helpers';
import { User } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-fade-in group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent-500/20 flex items-center justify-center">
            <User size={16} className="text-accent-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{review.userName}</p>
            <p className="text-xs text-text-muted">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size={14} />
      </div>

      {review.comment && (
        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          {review.comment}
        </p>
      )}

      {review.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span key={tag} className="tag text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
