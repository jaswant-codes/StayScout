import React from 'react';
import { BadgeCheck, Star, MessageSquare, Home, Clock } from 'lucide-react';

export default function OwnerProfileHeader({ profile }) {
  const {
    name = 'Owner Name',
    businessName = 'Business Name',
    avatar = 'https://ui-avatars.com/api/?name=Owner&background=random',
    coverImage = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
    isVerified = true,
    stats = {
      listings: 0,
      reviews: 0,
      rating: 0,
      responseRate: '100%',
    }
  } = profile || {};

  return (
    <div className="card overflow-hidden">
      <div className="h-48 w-full relative">
        <img 
          src={coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 -mt-16 sm:-mt-20 mb-6 relative z-10">
          <div className="relative">
            <img 
              src={avatar} 
              alt={name} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-dark-900 object-cover bg-dark-800"
            />
            {isVerified && (
              <div className="absolute bottom-1 right-1 bg-dark-900 rounded-full p-0.5">
                <BadgeCheck className="w-6 h-6 sm:w-8 sm:h-8 text-accent-500" fill="currentColor" stroke="white" strokeWidth={1} />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left mt-2 sm:mt-16">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white">{name}</h1>
            </div>
            {businessName && (
              <p className="text-text-muted mt-1 font-medium">{businessName}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 border-t border-border pt-6">
          <div className="flex flex-col items-center sm:items-start gap-1 p-3 glass-strong rounded-xl">
            <div className="flex items-center gap-2 text-text-muted mb-1">
              <Home className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium">Listings</span>
            </div>
            <span className="text-2xl font-bold text-white">{stats.listings}</span>
          </div>
          
          <div className="flex flex-col items-center sm:items-start gap-1 p-3 glass-strong rounded-xl">
            <div className="flex items-center gap-2 text-text-muted mb-1">
              <MessageSquare className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium">Reviews</span>
            </div>
            <span className="text-2xl font-bold text-white">{stats.reviews}</span>
          </div>
          
          <div className="flex flex-col items-center sm:items-start gap-1 p-3 glass-strong rounded-xl">
            <div className="flex items-center gap-2 text-text-muted mb-1">
              <Star className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium">Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-white">{stats.rating.toFixed(1)}</span>
              <span className="text-sm text-text-muted">/ 5.0</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-start gap-1 p-3 glass-strong rounded-xl">
            <div className="flex items-center gap-2 text-text-muted mb-1">
              <Clock className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium">Response Rate</span>
            </div>
            <span className="text-2xl font-bold text-white">{stats.responseRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
