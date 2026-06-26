import React from 'react';
import { BadgeCheck, Phone, MessageCircle, MessageSquare, Star, Clock, Home, Calendar } from 'lucide-react';

const OwnerProfile = ({ owner }) => {
  if (!owner) return null;

  return (
    <div className="card">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Listed by</h3>
        
        <div className="flex items-start gap-5 mb-6">
          <div className="relative">
            {owner.photo ? (
              <img 
                src={owner.photo} 
                alt={owner.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-dark-600"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center border-2 border-dark-600">
                <span className="text-2xl font-semibold text-text-muted">
                  {owner.name?.charAt(0) || 'O'}
                </span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-dark-800 rounded-full p-0.5">
              <BadgeCheck className="w-5 h-5 text-accent-500" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-lg font-medium text-text-primary flex items-center gap-2">
              {owner.name}
            </h4>
            <div className="flex items-center gap-1 text-sm text-text-muted mt-1">
              <Calendar className="w-4 h-4" />
              <span>Joined {owner.joinedSince || 'recently'}</span>
            </div>
            
            {owner.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-medium text-text-primary">{owner.rating}</span>
                <span className="text-text-muted text-sm">Owner Rating</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-dark-800 rounded-lg p-3 text-center border border-border">
            <div className="text-text-muted text-xs mb-1 flex justify-center"><MessageCircle className="w-4 h-4" /></div>
            <div className="font-semibold text-text-primary text-sm">{owner.responseRate || '100%'}</div>
            <div className="text-xs text-text-muted">Response</div>
          </div>
          <div className="bg-dark-800 rounded-lg p-3 text-center border border-border">
            <div className="text-text-muted text-xs mb-1 flex justify-center"><Clock className="w-4 h-4" /></div>
            <div className="font-semibold text-text-primary text-sm">{owner.responseTime || '1 hr'}</div>
            <div className="text-xs text-text-muted">Avg Time</div>
          </div>
          <div className="bg-dark-800 rounded-lg p-3 text-center border border-border">
            <div className="text-text-muted text-xs mb-1 flex justify-center"><Home className="w-4 h-4" /></div>
            <div className="font-semibold text-text-primary text-sm">{owner.totalListings || 1}</div>
            <div className="text-xs text-text-muted">Listings</div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Call Owner
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-secondary flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-transparent">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
          </div>
          
          <button className="w-full py-2 text-sm font-medium text-accent-500 hover:text-accent-400 transition-colors mt-2">
            View Owner Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
