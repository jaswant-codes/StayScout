import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOwnerProfile } from '../hooks/useOwnerProfile';

import OwnerProfileHeader from '../components/trust-center/OwnerProfileHeader';
import ProfileCompletionTracker from '../components/trust-center/ProfileCompletionTracker';
import TrustScoreCard from '../components/trust-center/TrustScoreCard';
import VerificationCenter from '../components/trust-center/VerificationCenter';
import BusinessInformation from '../components/trust-center/BusinessInformation';
import ContactInformation from '../components/trust-center/ContactInformation';
import NotificationSettings from '../components/trust-center/NotificationSettings';
import SecurityCenter from '../components/trust-center/SecurityCenter';
import PrivacySettings from '../components/trust-center/PrivacySettings';
import AccountSettings from '../components/trust-center/AccountSettings';
import ActivityLog from '../components/trust-center/ActivityLog';
import PublicProfilePreview from '../components/trust-center/PublicProfilePreview';

import { ArrowLeft, User, ShieldCheck, Briefcase, Bell, Lock, Eye, Settings, Clock } from 'lucide-react';

export default function OwnerTrustCenter() {
  const { 
    profile, updateProfile, isSaving, 
    completionPercentage, trustScore, activityLog 
  } = useOwnerProfile();

  const [activeTab, setActiveTab] = useState('overview');
  const [showPreview, setShowPreview] = useState(false);

  const TABS = [
    { id: 'overview', label: 'Trust Overview', icon: User },
    { id: 'verifications', label: 'Verifications', icon: ShieldCheck },
    { id: 'business', label: 'Business Profile', icon: Briefcase },
    { id: 'privacy', label: 'Privacy & Visibility', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security Center', icon: Lock },
    { id: 'activity', label: 'Activity Log', icon: Clock },
    { id: 'account', label: 'Account Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <ProfileCompletionTracker completionPercentage={completionPercentage} />
              <ContactInformation profile={profile} updateProfile={updateProfile} isSaving={isSaving} />
            </div>
            <div className="space-y-6">
              <TrustScoreCard score={trustScore} />
              <button 
                onClick={() => setShowPreview(true)}
                className="w-full btn-primary glass py-4 flex items-center justify-center gap-2"
              >
                <Eye size={18} />
                View Public Profile
              </button>
            </div>
          </div>
        );
      case 'verifications':
        return <VerificationCenter verifications={profile.verifications} />;
      case 'business':
        return <BusinessInformation profile={profile} updateProfile={updateProfile} isSaving={isSaving} />;
      case 'privacy':
        return <PrivacySettings profile={profile} updateProfile={updateProfile} isSaving={isSaving} />;
      case 'notifications':
        return <NotificationSettings profile={profile} updateProfile={updateProfile} isSaving={isSaving} />;
      case 'security':
        return <SecurityCenter profile={profile} />;
      case 'activity':
        return <ActivityLog activityLog={activityLog} />;
      case 'account':
        return <AccountSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-dark-900 min-h-screen font-sans text-white">
      
      {showPreview && (
        <PublicProfilePreview profile={profile} onClose={() => setShowPreview(false)} />
      )}

      {/* Top Header */}
      <div className="border-b border-border bg-dark-800 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/owner/dashboard" className="text-text-muted hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft size={18} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            {isSaving && (
              <span className="text-text-muted text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                Saving changes...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row min-h-[calc(100vh-65px)]">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-72 bg-dark-800 border-r border-border shrink-0 p-4 md:p-6 overflow-x-auto md:overflow-y-auto">
          <div className="mb-8 hidden md:block">
            <h1 className="text-xl font-bold text-white tracking-tight">Trust Center</h1>
            <p className="text-text-muted text-sm mt-1">Manage your identity and security</p>
          </div>
          <nav className="flex md:flex-col gap-2">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-left ${
                    isActive 
                      ? 'bg-accent-500/10 text-accent-400 font-medium' 
                      : 'text-text-secondary hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto bg-dark-900 pb-24">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {activeTab === 'overview' && <OwnerProfileHeader profile={profile} />}
            {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
}
