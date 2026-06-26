import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOwnerProperties } from '../hooks/useProperties';
import { useDashboardAnalytics } from '../hooks/useDashboardAnalytics';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsGrid from '../components/dashboard/StatsGrid';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import RecentActivity from '../components/dashboard/RecentActivity';
import ListingsTable from '../components/dashboard/ListingsTable';
import LeadOverview from '../components/dashboard/LeadOverview';
import ReviewSummary from '../components/dashboard/ReviewSummary';
import ProfileCompletion from '../components/dashboard/ProfileCompletion';
import QuickActions from '../components/dashboard/QuickActions';
import NotificationPanel from '../components/dashboard/NotificationPanel';

export default function OwnerDashboard() {
  const { user, userProfile } = useAuth();
  const { properties, loading: propertiesLoading } = useOwnerProperties(user?.uid);
  const { 
    stats, viewsChart, leadsChart, recentActivity, leads, reviews, notifications, loading: analyticsLoading 
  } = useDashboardAnalytics(user?.uid);

  const loading = propertiesLoading || analyticsLoading;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-8 animate-fade-in bg-dark-900 min-h-screen">
      
      {/* 1. Welcome Header */}
      <DashboardHeader userProfile={userProfile} />

      {/* 2. Quick Statistics */}
      <div className="mt-8">
        <StatsGrid stats={stats} loading={loading} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 mt-8">
        {/* Main Content Column */}
        <div className="space-y-8">
          
          {/* 3. Performance Analytics */}
          <AnalyticsCharts viewsData={viewsChart} leadsData={leadsChart} />

          {/* 5. Active Listings */}
          <ListingsTable properties={properties} loading={loading} />

          {/* 6. Lead Overview */}
          <LeadOverview leads={leads} />

          {/* 7. Reviews Summary */}
          <ReviewSummary reviews={reviews} />

        </div>

        {/* Sidebar / Right Column */}
        <div className="space-y-8">
          
          {/* 9. Quick Actions */}
          <QuickActions />

          {/* 8. Profile Completion */}
          <ProfileCompletion completion={78} />

          {/* 4. Recent Activity */}
          <RecentActivity activity={recentActivity} />

          {/* 10. Notifications */}
          <NotificationPanel notifications={notifications} />

        </div>
      </div>
      
    </div>
  );
}
