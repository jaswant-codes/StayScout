import React from 'react';
import { Star, ThumbsUp, MessageSquare, Flag, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ReviewCards({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-10 text-text-secondary bg-dark-800 rounded-3xl border border-border">
        No reviews yet. Be the first to review this property!
      </div>
    );
  }

  // Calculate overall rating
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews;
  
  // Calculate rating distribution
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const rounded = Math.round(r.rating || 5);
    if (rounded >= 1 && rounded <= 5) distribution[rounded]++;
  });

  // Mock category ratings if not present in generic reviews
  const categories = [
    { name: 'Cleanliness', score: 4.8 },
    { name: 'Safety', score: 4.9 },
    { name: 'Food', score: 4.2 },
    { name: 'WiFi', score: 4.5 },
    { name: 'Location', score: 4.7 },
    { name: 'Value for Money', score: 4.6 },
  ];

  return (
    <div className="space-y-8 bg-dark-800 rounded-3xl p-6 md:p-8 border border-border">
      {/* Top Section: Overall & Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-border pb-8">
        <div className="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold text-text-primary mb-2">Overall Rating</h3>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-5xl font-black text-text-primary">{averageRating.toFixed(1)}</span>
            <span className="text-lg text-text-muted mb-1">/ 5</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={20} 
                className={star <= Math.round(averageRating) ? "fill-accent-500 text-accent-500" : "fill-dark-600 text-dark-600"} 
              />
            ))}
          </div>
          <p className="text-sm text-text-secondary">Based on {totalReviews} reviews</p>
        </div>

        <div className="md:col-span-8 space-y-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] || 0;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-4">
                <span className="text-sm font-medium text-text-secondary w-16 flex items-center gap-1">
                  {star} <Star size={12} className="fill-current" />
                </span>
                <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-500 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-text-muted w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Ratings */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 pb-8 border-b border-border">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-text-primary">{cat.name}</span>
              <span className="text-sm font-bold text-text-secondary">{cat.score.toFixed(1)}</span>
            </div>
            <div className="h-1.5 w-full bg-dark-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-text-primary rounded-full" 
                style={{ width: `${(cat.score / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h4 className="text-lg font-bold text-text-primary">Guest Reviews</h4>
        {reviews.map((review, index) => (
          <div key={index} className="bg-dark-900 rounded-2xl p-6 border border-dark-600 hover:border-accent-500/30 transition-colors">
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
                  <h4 className="font-bold text-text-primary flex items-center gap-2">
                    {review.userName}
                    {/* Mock verified badge */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                      <ShieldCheck size={12} /> Verified Stay
                    </span>
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                    <span>{new Date(review.date || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    {review.isVerifiedStudent && (
                      <>
                        <span>•</span>
                        <span className="text-accent-400 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} /> Student
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 bg-dark-700 px-3 py-1.5 rounded-lg border border-dark-600">
                <span className="font-bold text-text-primary">{(review.rating || 5).toFixed(1)}</span>
                <Star size={14} className="fill-accent-500 text-accent-500" />
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              {review.comment}
            </p>

            {/* Owner Reply Mock for the first review */}
            {index === 0 && (
              <div className="mb-5 ml-6 pl-4 border-l-2 border-accent-500/30 bg-dark-800/50 p-4 rounded-r-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-sm text-text-primary">Property Owner</span>
                  <span className="text-[10px] bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded">Host</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Thank you for your wonderful review! We're glad you enjoyed your stay and found the location convenient. We hope to host you again soon.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-dark-600 pt-4">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-accent-400 transition-colors">
                  <ThumbsUp size={14} /> Helpful ({review.helpfulCount || Math.floor(Math.random() * 15) + 1})
                </button>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-error transition-colors">
                <Flag size={14} /> Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
