import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

export default function ReviewCards({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-10 text-text-secondary bg-dark-800 rounded-3xl border border-border">
        No reviews yet. Be the first to review this property!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div key={index} className="bg-dark-800 rounded-2xl p-6 border border-border group hover:border-accent-500/30 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-dark-700 overflow-hidden shrink-0">
                <img 
                  src={review.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userName}`} 
                  alt={review.userName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-text-primary">{review.userName}</h4>
                <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                  <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  {review.isVerifiedStudent && (
                    <>
                      <span>•</span>
                      <span className="text-success font-medium">Verified Student</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-dark-700 px-3 py-1.5 rounded-lg border border-dark-600">
              <span className="font-bold text-text-primary">{review.rating.toFixed(1)}</span>
              <Star size={14} className="fill-accent-500 text-accent-500" />
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5">
            {review.comment}
          </p>

          <div className="flex items-center gap-4 border-t border-border pt-4">
            <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary transition-colors">
              <ThumbsUp size={14} /> Helpful ({review.helpfulCount || 0})
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary transition-colors">
              <MessageSquare size={14} /> Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
