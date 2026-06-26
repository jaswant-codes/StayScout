import React from 'react';
import { Bell, Mail, Smartphone } from 'lucide-react';

export default function NotificationSettings({ profile, updateProfile, isSaving }) {
  const notifications = profile?.notifications || {
    email: {
      newLeads: true,
      messages: true,
      reviews: false,
      promotions: false
    },
    inApp: {
      newLeads: true,
      messages: true,
      reviews: true,
      promotions: true
    }
  };

  const handleToggle = (type, key) => {
    if (isSaving) return;
    
    const newNotifications = {
      ...notifications,
      [type]: {
        ...notifications[type],
        [key]: !notifications[type][key]
      }
    };
    
    updateProfile({ notifications: newNotifications });
  };

  const renderToggle = (label, checked, onChange) => (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <span className="text-gray-300 text-sm">{label}</span>
      <button
        type="button"
        onClick={onChange}
        disabled={isSaving}
        className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
          checked ? 'bg-accent-500' : 'bg-dark-600'
        } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="card glass p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <Bell className="text-accent-400" size={24} />
          Notification Settings
        </h2>
        <p className="text-gray-400 text-sm">Manage how you receive alerts and updates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="text-white font-medium flex items-center gap-2 border-b border-border pb-2">
            <Mail size={18} className="text-gray-400" /> Email Notifications
          </h3>
          <div className="space-y-1">
            {renderToggle('New Leads', notifications.email?.newLeads, () => handleToggle('email', 'newLeads'))}
            {renderToggle('Messages', notifications.email?.messages, () => handleToggle('email', 'messages'))}
            {renderToggle('Reviews', notifications.email?.reviews, () => handleToggle('email', 'reviews'))}
            {renderToggle('Promotions', notifications.email?.promotions, () => handleToggle('email', 'promotions'))}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="space-y-4">
          <h3 className="text-white font-medium flex items-center gap-2 border-b border-border pb-2">
            <Smartphone size={18} className="text-gray-400" /> In-App Notifications
          </h3>
          <div className="space-y-1">
            {renderToggle('New Leads', notifications.inApp?.newLeads, () => handleToggle('inApp', 'newLeads'))}
            {renderToggle('Messages', notifications.inApp?.messages, () => handleToggle('inApp', 'messages'))}
            {renderToggle('Reviews', notifications.inApp?.reviews, () => handleToggle('inApp', 'reviews'))}
            {renderToggle('Promotions', notifications.inApp?.promotions, () => handleToggle('inApp', 'promotions'))}
          </div>
        </div>
      </div>
    </div>
  );
}
