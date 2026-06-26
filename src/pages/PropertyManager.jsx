import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePropertyEditor } from '../hooks/usePropertyEditor';

import PropertyHeader from '../components/management/PropertyHeader';
import QuickActions from '../components/management/QuickActions';
import PerformanceSnapshot from '../components/management/PerformanceSnapshot';
import VersionHistory from '../components/management/VersionHistory';
import ActivityTimeline from '../components/management/ActivityTimeline';
import MediaManager from '../components/management/MediaManager';
import EditableSection from '../components/management/EditableSection';
import PreviewPanel from '../components/management/PreviewPanel';

import Loader from '../components/Loader';
import { LayoutDashboard, Image as ImageIcon, Settings, DollarSign, Activity, FileText } from 'lucide-react';

// Reuse forms from wizard
import StepBasics from '../components/wizard/StepBasics';
import StepPricing from '../components/wizard/StepPricing';
import StepRooms from '../components/wizard/StepRooms';
import StepAmenities from '../components/wizard/StepAmenities';
import StepLocation from '../components/wizard/StepLocation';
import StepRules from '../components/wizard/StepRules';

export default function PropertyManager() {
  const { id } = useParams();
  const {
    property, loading, isPreviewMode, togglePreview,
    activeTab, setActiveTab, dirtySections, markSectionDirty, saveSection, isSaving
  } = usePropertyEditor(id);

  const [localForm, setLocalForm] = useState(null);

  // Sync local form state when property loads
  if (property && !localForm) {
    setLocalForm(property);
  }

  const updateForm = (updates) => {
    setLocalForm(prev => ({ ...prev, ...updates }));
    markSectionDirty(activeTab); // Use tab as section id
  };

  const handleSaveSection = () => {
    saveSection(activeTab, localForm);
  };

  if (loading || !localForm) {
    return <div className="min-h-screen flex items-center justify-center"><Loader text="Loading property suite..." /></div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview & Activity', icon: LayoutDashboard },
    { id: 'media', label: 'Media & Gallery', icon: ImageIcon },
    { id: 'basics', label: 'Basic Info', icon: FileText },
    { id: 'location', label: 'Location', icon: FileText },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'rooms', label: 'Rooms & Availability', icon: Settings },
    { id: 'amenities', label: 'Amenities', icon: Settings },
    { id: 'rules', label: 'House Rules', icon: Settings },
    { id: 'analytics', label: 'Performance', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <PropertyHeader property={property} />
            <QuickActions togglePreview={togglePreview} status={property.availability} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityTimeline propertyId={id} />
              <VersionHistory propertyId={id} />
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Property Performance</h2>
            <PerformanceSnapshot property={property} />
          </div>
        );
      case 'media':
        return (
          <MediaManager 
            property={property} 
            saveSection={saveSection} 
            markSectionDirty={markSectionDirty} 
          />
        );
      case 'basics':
        return (
          <EditableSection title="Basic Information" id="basics" dirtySections={dirtySections} isSaving={isSaving} onSave={handleSaveSection}>
            <StepBasics form={localForm} updateForm={updateForm} />
          </EditableSection>
        );
      case 'location':
        return (
          <EditableSection title="Location" id="location" dirtySections={dirtySections} isSaving={isSaving} onSave={handleSaveSection}>
            <StepLocation form={localForm} updateForm={updateForm} />
          </EditableSection>
        );
      case 'pricing':
        return (
          <EditableSection title="Pricing" id="pricing" dirtySections={dirtySections} isSaving={isSaving} onSave={handleSaveSection}>
            <StepPricing form={localForm} updateForm={updateForm} />
          </EditableSection>
        );
      case 'rooms':
        return (
          <EditableSection title="Rooms & Availability" id="rooms" dirtySections={dirtySections} isSaving={isSaving} onSave={handleSaveSection}>
            <StepRooms form={localForm} updateForm={updateForm} />
          </EditableSection>
        );
      case 'amenities':
        return (
          <EditableSection title="Amenities" id="amenities" dirtySections={dirtySections} isSaving={isSaving} onSave={handleSaveSection}>
            <StepAmenities form={localForm} updateForm={updateForm} />
          </EditableSection>
        );
      case 'rules':
        return (
          <EditableSection title="House Rules" id="rules" dirtySections={dirtySections} isSaving={isSaving} onSave={handleSaveSection}>
            <StepRules form={localForm} updateForm={updateForm} />
          </EditableSection>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-dark-900 min-h-screen text-white">
      {isPreviewMode && (
        <PreviewPanel property={localForm} onClose={togglePreview} />
      )}

      {/* Top Navigation */}
      <div className="sticky top-0 z-40 bg-dark-800 border-b border-border px-4 py-4 sm:px-6 flex items-center gap-4">
        <Link to="/owner/dashboard" className="text-text-muted hover:text-white transition-colors text-sm font-medium">
          Dashboard
        </Link>
        <span className="text-text-muted">/</span>
        <span className="font-semibold text-text-primary truncate max-w-[200px] sm:max-w-xs">{property.name}</span>
        
        {dirtySections.size > 0 && (
          <div className="ml-auto flex items-center gap-2 text-warning text-sm font-medium animate-pulse">
            <div className="w-2 h-2 rounded-full bg-warning"></div>
            Unsaved Changes
          </div>
        )}
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row">
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 border-r border-border md:min-h-[calc(100vh-65px)] bg-dark-800 p-4 shrink-0 overflow-x-auto md:overflow-y-auto">
          <nav className="flex md:flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-left ${
                  activeTab === tab.id 
                    ? 'bg-accent-500/10 text-accent-400 font-medium' 
                    : 'text-text-secondary hover:bg-dark-700 hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
                {dirtySections.has(tab.id) && (
                  <span className="w-2 h-2 rounded-full bg-warning ml-auto"></span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-65px)] bg-dark-900">
          <div className="max-w-4xl mx-auto animate-fade-in pb-20">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
