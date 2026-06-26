import React, { useState } from 'react';
import { useAdminReports } from '../../hooks/admin/useAdminReports';
// Trigger HMR
import ReportStatsBar from '../../components/admin/reports/ReportStatsBar';
import ReportFilters from '../../components/admin/reports/ReportFilters';
import ReportTable from '../../components/admin/reports/ReportTable';
import ReportDrawer from '../../components/admin/reports/ReportDrawer';

export default function AdminReports() {
  const {
    reports,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateReportStatus
  } = useAdminReports();

  const [activeReportId, setActiveReportId] = useState(null);

  const activeReport = reports.find(r => r.id === activeReportId);

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports & Moderation</h1>
          <p className="text-text-secondary text-sm">Review flagged users, properties, and reviews.</p>
        </div>
      </div>

      <ReportStatsBar stats={stats} loading={loading} />

      <div className="bg-dark-800 border border-border rounded-2xl overflow-hidden shadow-2xl">
        <ReportFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onChange={setFilters}
        />
        
        <ReportTable 
          reports={reports}
          loading={loading}
          onRowClick={(report) => setActiveReportId(report.id)}
        />
      </div>

      <ReportDrawer 
        report={activeReport}
        isOpen={!!activeReportId}
        onClose={() => setActiveReportId(null)}
        onAction={updateReportStatus}
      />
    </div>
  );
}
