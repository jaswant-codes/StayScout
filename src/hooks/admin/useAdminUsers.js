import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '../useDebounce';
import { Users, GraduationCap, Building, AlertTriangle, Ban } from 'lucide-react';

const mockUsersData = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210', role: 'student', status: 'active', joinedAt: '2023-01-15T10:00:00Z', lastActive: '2024-02-10T14:30:00Z', properties: 0, reviews: 3 },
  { id: '2', name: 'Jaswant Singh', email: 'owner@test.com', phone: '+91 9123456789', role: 'owner', status: 'active', joinedAt: '2022-11-20T09:15:00Z', lastActive: '2024-02-11T08:45:00Z', properties: 4, reviews: 0 },
  { id: '3', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9988776655', role: 'student', status: 'suspended', statusReason: 'Spam reviews', joinedAt: '2023-05-12T11:20:00Z', lastActive: '2023-12-01T16:10:00Z', properties: 0, reviews: 12 },
  { id: '4', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 9876512345', role: 'owner', status: 'banned', statusReason: 'Fake listings', joinedAt: '2023-08-05T14:00:00Z', lastActive: '2023-11-15T09:00:00Z', properties: 1, reviews: 0 },
  { id: '5', name: 'Admin User', email: 'admin@stayscout.com', phone: '', role: 'admin', status: 'active', joinedAt: '2021-01-01T00:00:00Z', lastActive: '2024-02-11T10:00:00Z', properties: 0, reviews: 0 },
  { id: '6', name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 9111122222', role: 'student', status: 'active', joinedAt: '2024-01-10T12:00:00Z', lastActive: '2024-02-09T18:20:00Z', properties: 0, reviews: 1 },
  { id: '7', name: 'Vikram Verma', email: 'vikram@example.com', phone: '+91 9333344444', role: 'owner', status: 'active', joinedAt: '2023-03-22T08:30:00Z', lastActive: '2024-02-08T11:15:00Z', properties: 2, reviews: 0 },
  { id: '8', name: 'Anjali Desai', email: 'anjali@example.com', phone: '+91 9555566666', role: 'student', status: 'active', joinedAt: '2023-09-18T15:45:00Z', lastActive: '2024-02-11T09:30:00Z', properties: 0, reviews: 5 },
  { id: '9', name: 'Rohan Mehta', email: 'rohan@example.com', phone: '+91 9777788888', role: 'student', status: 'suspended', statusReason: 'Payment dispute', joinedAt: '2023-07-02T10:10:00Z', lastActive: '2024-01-20T14:00:00Z', properties: 0, reviews: 2 },
  { id: '10', name: 'Neha Reddy', email: 'neha@example.com', phone: '+91 9999900000', role: 'owner', status: 'active', joinedAt: '2022-05-14T09:50:00Z', lastActive: '2024-02-10T16:40:00Z', properties: 1, reviews: 0 },
  { id: '11', name: 'Karan Singh', email: 'karan@example.com', phone: '+91 9222233333', role: 'student', status: 'active', joinedAt: '2024-02-01T11:30:00Z', lastActive: '2024-02-11T07:20:00Z', properties: 0, reviews: 0 },
  { id: '12', name: 'Pooja Joshi', email: 'pooja@example.com', phone: '+91 9444455555', role: 'owner', status: 'active', joinedAt: '2023-11-30T13:15:00Z', lastActive: '2024-02-05T10:05:00Z', properties: 3, reviews: 0 }
];

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ role: 'All', status: 'All' });
  const [selectedIds, setSelectedIds] = useState([]);

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setUsers(mockUsersData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return [
      { id: 'total', label: 'Total Users', value: users.length, icon: Users },
      { id: 'students', label: 'Students', value: users.filter(u => u.role === 'student').length, icon: GraduationCap },
      { id: 'owners', label: 'Owners', value: users.filter(u => u.role === 'owner').length, icon: Building },
      { id: 'suspended', label: 'Suspended', value: users.filter(u => u.status === 'suspended').length, icon: AlertTriangle },
      { id: 'banned', label: 'Banned', value: users.filter(u => u.status === 'banned').length, icon: Ban }
    ];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          user.email.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchRole = filters.role === 'All' || user.role.toLowerCase() === filters.role.toLowerCase();
      const matchStatus = filters.status === 'All' || user.status.toLowerCase() === filters.status.toLowerCase();
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, debouncedSearch, filters]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectAll = (ids) => {
    if (selectedIds.length === ids.length) {
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(ids); // Select all
    }
  };

  const updateUserRole = (id, newRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const updateUserStatus = (id, newStatus, reason) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus, statusReason: reason } : u));
    setSelectedIds([]); // Clear selection after action
  };
  
  const bulkUpdateStatus = (newStatus, reason) => {
    setUsers(prev => prev.map(u => selectedIds.includes(u.id) ? { ...u, status: newStatus, statusReason: reason } : u));
    setSelectedIds([]);
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  return {
    users: filteredUsers,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    selectedIds,
    toggleSelect,
    selectAll,
    updateUserRole,
    updateUserStatus,
    bulkUpdateStatus,
    deleteUser,
    stats
  };
}
