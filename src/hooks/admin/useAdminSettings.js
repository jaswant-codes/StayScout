import { useState, useEffect } from 'react';

const mockSettingsData = {
  general: {
    platformName: 'StayScout',
    supportEmail: 'support@stayscout.com',
    supportPhone: '+91 1800 123 4567',
    description: 'The premier student housing marketplace in India.'
  },
  financials: {
    commissionRate: 5,
    defaultSecurityDeposit: 2,
    minimumWithdrawal: 1000
  },
  features: [
    { id: 'maintenanceMode', name: 'Maintenance Mode', enabled: false, description: 'Disables all user and owner access.' },
    { id: 'newSignups', name: 'New User Signups', enabled: true, description: 'Allow new students to register.' },
    { id: 'ownerCreation', name: 'Owner Property Creation', enabled: true, description: 'Allow owners to submit new listings.' },
    { id: 'aiModeration', name: 'AI Image Moderation', enabled: true, description: 'Automatically flag blurry/watermarked photos.' }
  ]
};

export function useAdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setSettings(mockSettingsData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const updateGeneralSettings = (newGeneral) => {
    setSettings(prev => ({ ...prev, general: newGeneral }));
  };

  const updateFinancialSettings = (newFinancials) => {
    setSettings(prev => ({ ...prev, financials: newFinancials }));
  };

  const toggleFeature = (id) => {
    setSettings(prev => ({
      ...prev,
      features: prev.features.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f)
    }));
  };

  const executeDangerAction = (actionType) => {
    setSaving(true);
    setTimeout(() => {
      console.log(`Executed destructive action: ${actionType}`);
      setSaving(false);
    }, 1000);
  };

  return {
    settings,
    loading,
    saving,
    updateGeneralSettings,
    updateFinancialSettings,
    toggleFeature,
    executeDangerAction
  };
}
