import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '../useDebounce';
import { Building, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const mockListingsData = [
  { id: '101', name: 'Sunrise PG for Boys', location: 'Koramangala, Bangalore', type: 'PG', rent: 8500, ownerName: 'Ravi Kumar', ownerEmail: 'ravi@example.com', status: 'active', addedAt: '2024-01-15T10:00:00Z', qualityScore: 85, images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=400'] },
  { id: '102', name: 'Galaxy Premium Hostel', location: 'HSR Layout, Bangalore', type: 'Hostel', rent: 12000, ownerName: 'Sneha Reddy', ownerEmail: 'sneha@example.com', status: 'pending', addedAt: '2024-02-12T09:15:00Z', qualityScore: 92, images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400'] },
  { id: '103', name: 'Cozy 1BHK Flat', location: 'BTM Layout, Bangalore', type: 'Flat', rent: 18000, ownerName: 'Amit Shah', ownerEmail: 'amit@example.com', status: 'flagged', statusReason: 'Misleading photos reported', addedAt: '2023-11-20T14:30:00Z', qualityScore: 45, images: ['https://images.unsplash.com/photo-1502672260266-1c1e52d1590d?auto=format&fit=crop&q=80&w=400'] },
  { id: '104', name: 'Elite Girls Hostel', location: 'Indiranagar, Bangalore', type: 'Hostel', rent: 15000, ownerName: 'Priya Desai', ownerEmail: 'priya@example.com', status: 'active', addedAt: '2023-09-05T11:20:00Z', qualityScore: 98, images: ['https://images.unsplash.com/photo-1595526114101-11b0f55fb504?auto=format&fit=crop&q=80&w=400'] },
  { id: '105', name: 'Budget Stay PG', location: 'Marathahalli, Bangalore', type: 'PG', rent: 6000, ownerName: 'Vikram Singh', ownerEmail: 'vikram@example.com', status: 'rejected', statusReason: 'Missing safety verification', addedAt: '2024-02-10T16:10:00Z', qualityScore: 30, images: ['https://images.unsplash.com/photo-1520277739336-7bf67edfa768?auto=format&fit=crop&q=80&w=400'] },
  { id: '106', name: 'Tech Park Co-living', location: 'Whitefield, Bangalore', type: 'PG', rent: 11000, ownerName: 'Karan Patel', ownerEmail: 'karan@example.com', status: 'pending', addedAt: '2024-02-13T08:00:00Z', qualityScore: 88, images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400'] },
  { id: '107', name: 'Luxury 2BHK Apartment', location: 'Jayanagar, Bangalore', type: 'Flat', rent: 32000, ownerName: 'Anita Rao', ownerEmail: 'anita@example.com', status: 'active', addedAt: '2023-12-01T10:45:00Z', qualityScore: 95, images: ['https://images.unsplash.com/photo-1502672260266-1c1e52d1590d?auto=format&fit=crop&q=80&w=400'] }
];

export function useAdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: 'All', status: 'All' });

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setListings(mockListingsData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return [
      { id: 'total', label: 'Total Listings', value: listings.length, icon: Building },
      { id: 'active', label: 'Active', value: listings.filter(l => l.status === 'active').length, icon: CheckCircle },
      { id: 'pending', label: 'Pending Review', value: listings.filter(l => l.status === 'pending').length, icon: Clock },
      { id: 'flagged', label: 'Flagged', value: listings.filter(l => l.status === 'flagged').length, icon: AlertTriangle }
    ];
  }, [listings]);

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const matchSearch = listing.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          listing.ownerName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                          listing.id.includes(debouncedSearch);
      const matchType = filters.type === 'All' || listing.type === filters.type;
      const matchStatus = filters.status === 'All' || listing.status === filters.status.toLowerCase();
      return matchSearch && matchType && matchStatus;
    });
  }, [listings, debouncedSearch, filters]);

  const updateListingStatus = (id, newStatus, reason = '') => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus, statusReason: reason } : l));
  };

  return {
    listings: filteredListings,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateListingStatus
  };
}
