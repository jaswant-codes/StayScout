import React, { useState } from 'react';
import { Home, MapPin, DollarSign, User, FileText } from 'lucide-react';
import DrawerPanel from '../DrawerPanel';
import ListingMediaAudit from './ListingMediaAudit';
import ListingActionPanel from './ListingActionPanel';

const ListingModerationDrawer = ({ listing, isOpen, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!listing) return null;

  const handleAction = (action, id, reason) => {
    if (onAction) {
      onAction(action, id, reason);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'media', label: 'Media Audit' },
    { id: 'moderation', label: 'Moderation' }
  ];

  return (
    <DrawerPanel
      isOpen={isOpen}
      onClose={onClose}
      title="Listing Moderation"
      size="lg"
    >
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent-500 text-accent-400'
                  : 'border-transparent text-text-muted hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-dark-800 rounded-lg p-5 border border-border">
                <h3 className="text-xl font-semibold text-white mb-4">{listing.title || 'Untitled Property'}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Home className="text-accent-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Property Type</p>
                      <p className="text-white">{listing.type || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <DollarSign className="text-success mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Rent / Price</p>
                      <p className="text-white font-medium">₹{listing.rent || listing.price || 0} / month</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="text-text-secondary mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Owner</p>
                      <p className="text-white">{listing.ownerName || 'Unknown'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="text-error mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Address</p>
                      <p className="text-white text-sm">{listing.address || 'Address not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800 rounded-lg p-5 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="text-text-secondary" size={18} />
                  <h4 className="text-lg font-medium text-white">Description</h4>
                </div>
                <p className="text-text-secondary whitespace-pre-line text-sm leading-relaxed">
                  {listing.description || 'No description provided.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <ListingMediaAudit images={listing.images || []} />
          )}

          {activeTab === 'moderation' && (
            <ListingActionPanel
              listing={listing}
              onApprove={(id) => handleAction('approve', id)}
              onReject={(id, reason) => handleAction('reject', id, reason)}
              onFlag={(id, reason) => handleAction('flag', id, reason)}
            />
          )}
        </div>
      </div>
    </DrawerPanel>
  );
};

export default ListingModerationDrawer;
