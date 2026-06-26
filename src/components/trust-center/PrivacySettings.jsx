import React from 'react';
import { Eye, ShieldAlert } from 'lucide-react';

export default function PrivacySettings({ profile, updateProfile, isSaving }) {
  const privacy = profile?.privacy || {
    showPhone: true,
    showWhatsapp: true,
    showEmail: false,
    showAddress: true
  };

  const handleToggle = (key) => {
    if (isSaving) return;
    
    updateProfile({
      privacy: {
        ...privacy,
        [key]: !privacy[key]
      }
    });
  };

  const renderToggle = (label, description, checked, onChange) => (
    <div className="flex items-start justify-between py-4 border-b border-border/50 last:border-0">
      <div className="pr-4">
        <h3 className="text-white font-medium mb-1">{label}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        disabled={isSaving}
        className={`w-11 h-6 rounded-full transition-colors relative flex items-center shrink-0 mt-1 ${
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
          <Eye className="text-accent-400" size={24} />
          Privacy Settings
        </h2>
        <p className="text-gray-400 text-sm">Control what information is visible to others.</p>
      </div>

      <div className="bg-dark-800/50 p-4 rounded-xl border border-border flex gap-3 text-sm text-gray-300">
        <ShieldAlert className="text-accent-400 shrink-0 mt-0.5" size={18} />
        <p>These settings control what contact information is visible to students viewing your properties. If disabled, they must message you through the platform.</p>
      </div>

      <div className="space-y-1">
        {renderToggle(
          'Show Phone Number',
          'Display your primary phone number on your public profile and property listings.',
          privacy.showPhone,
          () => handleToggle('showPhone')
        )}
        {renderToggle(
          'Show WhatsApp',
          'Allow students to contact you directly via WhatsApp.',
          privacy.showWhatsapp,
          () => handleToggle('showWhatsapp')
        )}
        {renderToggle(
          'Show Email Address',
          'Display your email address for direct inquiries.',
          privacy.showEmail,
          () => handleToggle('showEmail')
        )}
        {renderToggle(
          'Show Property Address',
          'Show the exact address of your properties on maps. If disabled, only the general area is shown.',
          privacy.showAddress,
          () => handleToggle('showAddress')
        )}
      </div>
    </div>
  );
}
