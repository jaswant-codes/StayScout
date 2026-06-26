import React from 'react';
import { useAdminDashboard } from '../../hooks/admin/useAdminDashboard';
import KPIBar from '../../components/admin/dashboard/KPIBar';
import HealthGrid from '../../components/admin/dashboard/HealthGrid';
import GrowthCharts from '../../components/admin/dashboard/GrowthCharts';
import ActionItemsPanel from '../../components/admin/dashboard/ActionItemsPanel';
import AdminActivityFeed from '../../components/admin/dashboard/AdminActivityFeed';
import AdminQuickActions from '../../components/admin/dashboard/AdminQuickActions';

export default function AdminDashboard() {
  const {
    kpis,
    healthMetrics,
    userGrowthChart,
    listingGrowthChart,
    dailyActivityChart,
    actionItems,
    activityFeed,
    loading
  } = useAdminDashboard();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace Overview</h1>
          <p className="text-text-secondary text-sm">Monitor the health and activity of StayScout.</p>
        </div>
      </div>

      {/* KPI Bar */}
      <KPIBar kpis={kpis} loading={loading} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Column (Health Grid + Charts) */}
        <div className="xl:col-span-3 space-y-6">
          <HealthGrid metrics={healthMetrics} loading={loading} />
          <GrowthCharts 
            userGrowth={userGrowthChart} 
            listingGrowth={listingGrowthChart} 
            dailyActivity={dailyActivityChart} 
            loading={loading} 
          />
          <AdminActivityFeed events={activityFeed} loading={loading} />
        </div>

        {/* Right Column (Action Items + Quick Actions) */}
        <div className="xl:col-span-1 space-y-6">
          <ActionItemsPanel items={actionItems} loading={loading} />
          <AdminQuickActions />
        </div>

      </div>
    </div>
  );
}
