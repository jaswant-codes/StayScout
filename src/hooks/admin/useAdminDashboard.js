import { useState, useEffect } from 'react';

const mockKPIs = [
  { label: 'Total Users', value: '1,420' },
  { label: 'Total Listings', value: '512' },
  { label: 'Pending Actions', value: '14' },
  { label: 'Health Score', value: '92/100' },
  { label: 'Avg Response Time', value: '1.4h' },
  { label: 'Revenue Potential', value: '₹14.2M' }
];

const mockHealthMetrics = [
  { id: 'users', label: 'Total Users', value: '1,420', trend: '+12%', trendDirection: 'up' },
  { id: 'owners', label: 'Active Owners', value: '312', trend: '+5%', trendDirection: 'up' },
  { id: 'listings', label: 'Total Listings', value: '512', trend: '+8%', trendDirection: 'up' },
  { id: 'active', label: 'Active Listings', value: '428', trend: '+2%', trendDirection: 'up' },
  { id: 'pending', label: 'Pending Review', value: '18', trend: '-4%', trendDirection: 'down' },
  { id: 'reviews', label: 'Total Reviews', value: '3,840', trend: '+15%', trendDirection: 'up' }
];

const mockUserGrowth = [
  { date: 'Mon', students: 120, owners: 40 },
  { date: 'Tue', students: 132, owners: 45 },
  { date: 'Wed', students: 101, owners: 30 },
  { date: 'Thu', students: 145, owners: 50 },
  { date: 'Fri', students: 160, owners: 65 },
  { date: 'Sat', students: 190, owners: 80 },
  { date: 'Sun', students: 210, owners: 95 }
];

const mockListingGrowth = [
  { date: 'Mon', published: 15, removed: 2 },
  { date: 'Tue', published: 18, removed: 1 },
  { date: 'Wed', published: 12, removed: 4 },
  { date: 'Thu', published: 22, removed: 0 },
  { date: 'Fri', published: 25, removed: 1 },
  { date: 'Sat', published: 30, removed: 3 },
  { date: 'Sun', published: 35, removed: 2 }
];

const mockDailyActivity = [
  { day: 'Mon', reviews: 45, messages: 120, visits: 30, signups: 160 },
  { day: 'Tue', reviews: 52, messages: 132, visits: 35, signups: 177 },
  { day: 'Wed', reviews: 38, messages: 101, visits: 25, signups: 131 },
  { day: 'Thu', reviews: 65, messages: 145, visits: 40, signups: 195 },
  { day: 'Fri', reviews: 70, messages: 160, visits: 45, signups: 225 },
  { day: 'Sat', reviews: 95, messages: 210, visits: 60, signups: 270 },
  { day: 'Sun', reviews: 110, messages: 240, visits: 75, signups: 305 }
];

const mockActionItems = [
  { id: 1, label: 'Pending Verifications', count: 5, severity: 'high', link: '/admin/verify' },
  { id: 2, label: 'Pending Moderation', count: 18, severity: 'medium', link: '/admin/listings' },
  { id: 3, label: 'Open Reports', count: 3, severity: 'high', link: '/admin/reports' },
  { id: 4, label: 'Open Tickets', count: 12, severity: 'medium', link: '/admin/support' },
  { id: 5, label: 'Overdue Follow-ups', count: 0, severity: 'low', link: '/admin/dashboard' }
];

const mockActivityFeed = [
  { id: 1, type: 'signup', text: 'Rahul Sharma signed up as a student', timestamp: '2 mins ago', entityLink: '/admin/users' },
  { id: 2, type: 'report', text: 'Galaxy PG was flagged for review', timestamp: '15 mins ago', entityLink: '/admin/reports' },
  { id: 3, type: 'verify', text: 'Owner Jaswant verified phone number', timestamp: '1 hour ago', entityLink: '/admin/verify' },
  { id: 4, type: 'listing', text: 'New listing "Sunrise Hostel" published', timestamp: '2 hours ago', entityLink: '/admin/listings' },
  { id: 5, type: 'ticket', text: 'Ticket #428 resolved by Admin1', timestamp: '3 hours ago', entityLink: '/admin/support' },
  { id: 6, type: 'signup', text: 'Priya Singh signed up as an owner', timestamp: '4 hours ago', entityLink: '/admin/users' },
];

export function useAdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return {
    kpis: mockKPIs,
    healthMetrics: mockHealthMetrics,
    userGrowthChart: mockUserGrowth,
    listingGrowthChart: mockListingGrowth,
    dailyActivityChart: mockDailyActivity,
    actionItems: mockActionItems,
    activityFeed: mockActivityFeed,
    loading
  };
}
