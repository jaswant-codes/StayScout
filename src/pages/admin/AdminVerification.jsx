import React, { useState } from 'react';
import { useAdminVerification } from '../../hooks/admin/useAdminVerification';
import VerificationStatsBar from '../../components/admin/verification/VerificationStatsBar';
import VerificationFilters from '../../components/admin/verification/VerificationFilters';
import VerificationTable from '../../components/admin/verification/VerificationTable';
import VerificationDrawer from '../../components/admin/verification/VerificationDrawer';

export default function AdminVerification() {
  const {
    requests,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateRequestStatus
  } = useAdminVerification();

  const [activeRequestId, setActiveRequestId] = useState(null);

  const activeRequest = requests.find(r => r.id === activeRequestId);

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Trust & Safety Center</h1>
          <p className="text-text-secondary text-sm">Review identity documents and verify property owners.</p>
        </div>
      </div>

      <VerificationStatsBar stats={stats} loading={loading} />

      <div className="bg-dark-800 border border-border rounded-2xl overflow-hidden shadow-2xl">
        <VerificationFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onChange={setFilters}
        />
        
        <VerificationTable 
          requests={requests}
          loading={loading}
          onRowClick={(request) => setActiveRequestId(request.id)}
        />
      </div>

      <VerificationDrawer 
        request={activeRequest}
        isOpen={!!activeRequestId}
        onClose={() => setActiveRequestId(null)}
        onAction={updateRequestStatus}
      />
    </div>
  );
}
