import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '../useDebounce';
import { Flag, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const mockReportsData = [
  { id: 'REP-101', targetName: 'Amit Shah', targetType: 'User', reportedBy: 'Rahul Sharma', reason: 'Abusive language in chat', status: 'pending', date: '2024-02-14T10:00:00Z', details: 'User Amit Shah has been using offensive language in the booking chat.' },
  { id: 'REP-102', targetName: 'Luxury 2BHK Apartment', targetType: 'Listing', reportedBy: 'Sneha Reddy', reason: 'Fake photos', status: 'pending', date: '2024-02-14T09:15:00Z', details: 'The photos uploaded are stock images from the internet, not the actual property.' },
  { id: 'REP-103', targetName: 'Review by Vikram Singh', targetType: 'Review', reportedBy: 'Priya Desai', reason: 'Spam/Irrelevant', status: 'resolved', resolution: 'Deleted review', date: '2024-02-13T14:30:00Z', details: 'The review is just promoting another website.' },
  { id: 'REP-104', targetName: 'Sunrise PG for Boys', targetType: 'Listing', reportedBy: 'Karan Patel', reason: 'Incorrect pricing', status: 'dismissed', date: '2024-02-12T11:20:00Z', details: 'Rent shown is 8500 but owner asked for 10000.' }
];

export function useAdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: 'All', status: 'All' });

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setReports(mockReportsData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return [
      { id: 'total', label: 'Total Reports', value: reports.length, icon: Flag },
      { id: 'pending', label: 'Pending Review', value: reports.filter(r => r.status === 'pending').length, icon: AlertTriangle },
      { id: 'resolved', label: 'Resolved', value: reports.filter(r => r.status === 'resolved').length, icon: CheckCircle },
      { id: 'dismissed', label: 'Dismissed', value: reports.filter(r => r.status === 'dismissed').length, icon: XCircle }
    ];
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchSearch = report.targetName.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          report.reportedBy.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                          report.id.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchType = filters.type === 'All' || report.targetType === filters.type;
      const matchStatus = filters.status === 'All' || report.status === filters.status.toLowerCase();
      return matchSearch && matchType && matchStatus;
    });
  }, [reports, debouncedSearch, filters]);

  const updateReportStatus = (id, newStatus, resolution = '') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, resolution } : r));
  };

  return {
    reports: filteredReports,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateReportStatus
  };
}
