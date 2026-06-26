import React from 'react';
import { useAdminSettings } from '../../hooks/admin/useAdminSettings';
import GeneralSettings from '../../components/admin/settings/GeneralSettings';
import FeatureToggles from '../../components/admin/settings/FeatureToggles';
import FinancialSettings from '../../components/admin/settings/FinancialSettings';
import DangerZone from '../../components/admin/settings/DangerZone';
import { Settings } from 'lucide-react';

export default function AdminSettings() {
  const {
    settings,
    loading,
    updateGeneralSettings,
    updateFinancialSettings,
    toggleFeature,
    executeDangerAction
  } = useAdminSettings();

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12 relative max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-dark-800 rounded-xl border border-border">
            <Settings className="text-accent-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
            <p className="text-text-secondary text-sm">Configure global variables, toggles, and financial logic.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GeneralSettings settings={settings.general} onChange={updateGeneralSettings} />
          <FinancialSettings financials={settings.financials} onChange={updateFinancialSettings} />
        </div>
        
        <div className="space-y-8">
          <FeatureToggles features={settings.features} onToggle={toggleFeature} />
          <DangerZone onAction={executeDangerAction} />
        </div>
      </div>
    </div>
  );
}
