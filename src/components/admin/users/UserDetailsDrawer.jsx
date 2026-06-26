import React, { useState } from 'react';
import { User, Activity, FileText, Settings, Mail, Phone, Calendar, Shield } from 'lucide-react';
import DrawerPanel from '../DrawerPanel';
import UserTimeline from './UserTimeline';
import AdminNotes from './AdminNotes';
import UserActionPanel from './UserActionPanel';

const UserDetailsDrawer = ({ user, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'timeline', label: 'Timeline', icon: Activity },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'actions', label: 'Actions', icon: Settings },
  ];

  return (
    <DrawerPanel isOpen={!!user} onClose={onClose} title="User Details">
      <div className="flex flex-col h-full bg-dark-800 text-white">
        {/* Tabs */}
        <div className="flex items-center px-6 border-b border-border overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent-500 text-accent-500'
                    : 'border-transparent text-muted hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-border" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-dark-700 border-2 border-border flex items-center justify-center">
                    <User className="w-8 h-8 text-muted" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="tag text-xs capitalize">{user.role || 'user'}</span>
                    <span className={`tag text-xs capitalize ${
                      user.status === 'active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      {user.status || 'active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="card p-4">
                  <h4 className="text-sm font-medium text-white mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted" />
                      <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted" />
                      <span className="text-white">{user.phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="text-sm font-medium text-white mb-4">Account Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-muted">
                        <Calendar className="w-4 h-4" />
                        <span>Joined Date</span>
                      </div>
                      <span className="text-white">
                        {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-muted">
                        <Shield className="w-4 h-4" />
                        <span>Role</span>
                      </div>
                      <span className="text-white capitalize">{user.role || 'user'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="animate-fade-in">
              <UserTimeline events={user.timelineEvents} />
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="animate-fade-in">
              <AdminNotes notes={user.notes} onAdd={(note) => onAction('add_note', note)} />
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="animate-fade-in">
              <UserActionPanel user={user} onAction={onAction} />
            </div>
          )}
        </div>
      </div>
    </DrawerPanel>
  );
};

export default UserDetailsDrawer;
