import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import StarRating from '../StarRating';

const ReviewSummary = ({ reviews = [] }) => {
  if (!reviews.length) {
    return (
      <div className="card p-8 text-center text-text-muted">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="card p-5 bg-dark-800 border-border hover:border-border-hover transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-text-primary">{review.propertyName}</h4>
                <div className="flex items-center text-xs text-text-muted sm:hidden">
                  <Calendar size={12} className="mr-1" />
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={review.rating || 0} size={14} />
                <span className="text-xs font-medium text-text-secondary">{review.rating?.toFixed(1)}</span>
              </div>
              
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                "{review.text}"
              </p>
              
              <div className="flex items-center text-xs text-text-muted">
                <span className="font-medium text-text-primary mr-2">{review.author}</span>
                <span className="hidden sm:flex items-center border-l border-border pl-2">
                  <Calendar size={12} className="mr-1" />
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button className="btn-secondary w-full sm:w-auto text-sm py-2 px-4 flex items-center justify-center gap-2">
                <MessageCircle size={16} />
                Reply
              </button>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSummary;
