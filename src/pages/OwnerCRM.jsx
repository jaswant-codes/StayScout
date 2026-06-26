import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCRM } from '../hooks/useCRM';

import CRMHeader from '../components/crm/CRMHeader';
import LeadStatsGrid from '../components/crm/LeadStatsGrid';
import LeadPipeline from '../components/crm/LeadPipeline';
import LeadTable from '../components/crm/LeadTable';
import LeadDetailsDrawer from '../components/crm/LeadDetailsDrawer';

import { ArrowLeft } from 'lucide-react';

export default function OwnerCRM() {
  const [view, setView] = useState('kanban'); // 'kanban' | 'table'
  const {
    leads,
    columns,
    searchQuery,
    setSearchQuery,
    activeLead,
    setActiveLeadId,
    updateLeadStatus,
    addNoteToLead,
    stats
  } = useCRM();

  return (
    <div className="bg-dark-900 min-h-screen flex flex-col font-sans">
      
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-border bg-dark-800 px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link to="/owner/dashboard" className="text-text-muted hover:text-white flex items-center gap-1 transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        {/* Header & Search */}
        <CRMHeader 
          stats={stats} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          view={view} 
          setView={setView} 
        />

        {/* Global Statistics */}
        <div className="mt-6 mb-8">
          <LeadStatsGrid stats={stats} />
        </div>

        {/* Main Workspace (Kanban or Table) */}
        <main className="flex-1 overflow-hidden relative border border-border bg-dark-800 rounded-xl shadow-lg">
          {view === 'kanban' ? (
            <LeadPipeline 
              columns={columns} 
              leads={leads} 
              updateLeadStatus={updateLeadStatus} 
              setActiveLeadId={setActiveLeadId} 
            />
          ) : (
            <div className="overflow-auto h-full">
              <LeadTable 
                leads={leads} 
                setActiveLeadId={setActiveLeadId} 
              />
            </div>
          )}
        </main>
      </div>

      {/* Slide-out Panel for Active Lead */}
      {activeLead && (
        <LeadDetailsDrawer 
          lead={activeLead} 
          onClose={() => setActiveLeadId(null)} 
          addNoteToLead={addNoteToLead} 
        />
      )}
    </div>
  );
}
