import React from 'react';
import { X, ShieldCheck, MapPin, MessageCircle, Globe, Star, CheckCircle } from 'lucide-react';

const PublicProfilePreview = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-out panel */}
      <div className="relative w-full max-w-md h-full bg-dark-900 border-l border-border shadow-2xl flex flex-col animate-slide-in overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-dark-800">
          <h2 className="text-lg font-semibold text-white">Public Profile Preview</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dark-700 text-text-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img 
                src={profile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'Owner')}&background=6366f1&color=fff`} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-dark-800 shadow-xl"
              />
              {profile.isVerified && (
                <div className="absolute bottom-0 right-0 bg-dark-800 rounded-full p-1">
                  <ShieldCheck className="w-6 h-6 text-success" />
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              {profile.name || 'Owner Name'}
            </h1>
            <p className="text-text-muted mt-1">Host since {profile.joinDate || '2023'}</p>
          </div>

          {/* Stats & Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-800 p-4 rounded-xl border border-border flex flex-col items-center text-center">
              <MessageCircle className="w-5 h-5 text-accent-400 mb-2" />
              <span className="text-sm text-text-muted">Response Rate</span>
              <span className="text-lg font-semibold text-white">{profile.responseRate || '100%'}</span>
            </div>
            <div className="bg-dark-800 p-4 rounded-xl border border-border flex flex-col items-center text-center">
              <Globe className="w-5 h-5 text-accent-400 mb-2" />
              <span className="text-sm text-text-muted">Languages</span>
              <span className="text-lg font-semibold text-white">{profile.languages?.join(', ') || 'English'}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">About</h3>
            <p className="text-text-secondary leading-relaxed">
              {profile.bio || "Hi, I'm a verified property owner on StayScout. I strive to provide comfortable and safe living spaces for students. Always happy to help and ensure you have a great stay!"}
            </p>
          </div>

          {/* Verifications */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Verifications</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-text-secondary">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Identity verified</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Phone number verified</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Email address verified</span>
              </div>
            </div>
          </div>

          {/* Mock Properties List */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Properties (2)</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl border border-border bg-dark-800">
                  <div className="w-20 h-20 rounded-lg bg-dark-700 flex-shrink-0 animate-pulse-glow" />
                  <div className="flex-1 py-1">
                    <div className="h-4 bg-dark-600 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-dark-600 rounded w-1/2 mb-3" />
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span>4.8 (12 reviews)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-border bg-dark-800">
          <button onClick={onClose} className="btn-secondary w-full">
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};

export default PublicProfilePreview;
