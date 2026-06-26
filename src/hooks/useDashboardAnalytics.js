import { useState, useEffect } from 'react';

export function useDashboardAnalytics(ownerId) {
  const [data, setData] = useState({
    stats: null,
    viewsChart: [],
    leadsChart: [],
    recentActivity: [],
    leads: [],
    reviews: [],
    notifications: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setData({
        stats: {
          activeListings: 4,
          draftListings: 1,
          totalViews: 2845,
          wishlistSaves: 186,
          leads: 43,
          messages: 12,
          totalReviews: 31,
          averageRating: 4.8,
          scheduledVisits: 5,
        },
        viewsChart: [
          { name: 'Mon', views: 340 },
          { name: 'Tue', views: 420 },
          { name: 'Wed', views: 280 },
          { name: 'Thu', views: 510 },
          { name: 'Fri', views: 650 },
          { name: 'Sat', views: 890 },
          { name: 'Sun', views: 780 },
        ],
        leadsChart: [
          { name: 'Week 1', leads: 5 },
          { name: 'Week 2', leads: 8 },
          { name: 'Week 3', leads: 12 },
          { name: 'Week 4', leads: 18 },
        ],
        recentActivity: [
          { id: 1, type: 'view', message: 'Student viewed Galaxy PG', time: '10 mins ago', icon: 'Eye' },
          { id: 2, type: 'review', message: 'Galaxy PG received a 5-star review', time: '2 hours ago', icon: 'Star' },
          { id: 3, type: 'save', message: 'Sunrise Hostel added to wishlist by 3 students', time: '5 hours ago', icon: 'Heart' },
          { id: 4, type: 'visit', message: 'Visit scheduled for Starlight Boys Hostel', time: '1 day ago', icon: 'Calendar' },
        ],
        leads: [
          { id: 'L1', student: 'Rahul Sharma', property: 'Galaxy PG', date: '2023-10-25', method: 'WhatsApp', status: 'New' },
          { id: 'L2', student: 'Priya Patel', property: 'Sunrise Hostel', date: '2023-10-24', method: 'Call', status: 'Contacted' },
          { id: 'L3', student: 'Amit Singh', property: 'Galaxy PG', date: '2023-10-23', method: 'Chat', status: 'Interested' },
          { id: 'L4', student: 'Neha Gupta', property: 'Starlight Boys Hostel', date: '2023-10-22', method: 'WhatsApp', status: 'Visit Scheduled' },
        ],
        reviews: [
          { id: 'R1', property: 'Galaxy PG', rating: 5, text: 'Amazing food and very clean.', author: 'Rahul S.', date: '2 days ago' },
          { id: 'R2', property: 'Sunrise Hostel', rating: 4, text: 'Good location but WiFi can be slow sometimes.', author: 'Priya P.', date: '1 week ago' },
        ],
        notifications: [
          { id: 1, title: 'New Lead', message: 'Rahul Sharma sent an enquiry for Galaxy PG.', time: '10 mins ago', unread: true },
          { id: 2, title: 'Property Approved', message: 'Your listing "Galaxy PG" is now live.', time: '2 days ago', unread: false },
          { id: 3, title: 'Verification Complete', message: 'Your host identity has been verified.', time: '1 week ago', unread: false },
        ]
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [ownerId]);

  return { ...data, loading };
}
