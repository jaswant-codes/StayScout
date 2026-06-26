import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '../useDebounce';
import { Shield, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const mockVerificationData = [
  { id: 'v101', userName: 'Ravi Kumar', userEmail: 'ravi@example.com', documentType: 'Aadhaar', submittedAt: '2024-02-14T10:00:00Z', status: 'pending', riskScore: 'Low', documentUrl: 'https://images.unsplash.com/photo-1633265486064-086b219458ce?auto=format&fit=crop&q=80&w=400' },
  { id: 'v102', userName: 'Amit Shah', userEmail: 'amit@example.com', documentType: 'PAN', submittedAt: '2024-02-14T09:15:00Z', status: 'pending', riskScore: 'High', documentUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400' },
  { id: 'v103', userName: 'Priya Desai', userEmail: 'priya@example.com', documentType: 'GST', submittedAt: '2024-02-13T14:30:00Z', status: 'approved', riskScore: 'Low', documentUrl: 'https://images.unsplash.com/photo-1568227451052-19e4871e4cc5?auto=format&fit=crop&q=80&w=400' },
  { id: 'v104', userName: 'Vikram Singh', userEmail: 'vikram@example.com', documentType: 'Aadhaar', submittedAt: '2024-02-12T11:20:00Z', status: 'rejected', rejectionReason: 'Document illegible/blurry', riskScore: 'Medium', documentUrl: 'https://images.unsplash.com/photo-1633265486064-086b219458ce?auto=format&fit=crop&q=80&w=400' },
  { id: 'v105', userName: 'Sneha Reddy', userEmail: 'sneha@example.com', documentType: 'PAN', submittedAt: '2024-02-11T16:10:00Z', status: 'approved', riskScore: 'Low', documentUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400' },
  { id: 'v106', userName: 'Karan Patel', userEmail: 'karan@example.com', documentType: 'GST', submittedAt: '2024-02-14T08:00:00Z', status: 'pending', riskScore: 'Medium', documentUrl: 'https://images.unsplash.com/photo-1568227451052-19e4871e4cc5?auto=format&fit=crop&q=80&w=400' }
];

export function useAdminVerification() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: 'All', status: 'All' });

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setRequests(mockVerificationData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return [
      { id: 'total', label: 'Total Requests', value: requests.length, icon: FileText },
      { id: 'pending', label: 'Needs Review', value: requests.filter(r => r.status === 'pending').length, icon: Shield },
      { id: 'approved', label: 'Approved', value: requests.filter(r => r.status === 'approved').length, icon: CheckCircle },
      { id: 'rejected', label: 'Rejected', value: requests.filter(r => r.status === 'rejected').length, icon: AlertTriangle }
    ];
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchSearch = req.userName.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          req.userEmail.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                          req.id.includes(debouncedSearch);
      const matchType = filters.type === 'All' || req.documentType === filters.type;
      const matchStatus = filters.status === 'All' || req.status === filters.status.toLowerCase();
      return matchSearch && matchType && matchStatus;
    });
  }, [requests, debouncedSearch, filters]);

  const updateRequestStatus = (id, newStatus, reason = '') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, rejectionReason: reason } : r));
  };

  return {
    requests: filteredRequests,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateRequestStatus
  };
}
