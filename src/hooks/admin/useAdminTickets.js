import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '../useDebounce';
import { MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const mockTicketsData = [
  { id: 'TKT-1029', subject: 'Refund not processed', userName: 'Rahul Sharma', userType: 'Student', priority: 'High', category: 'Payment', status: 'open', createdAt: '2024-02-14T10:00:00Z', messages: [{ sender: 'user', text: 'I cancelled my booking 3 days ago but havent received the refund yet.', time: '10:00 AM' }] },
  { id: 'TKT-1030', subject: 'Listing stuck in pending', userName: 'Amit Shah', userType: 'Owner', priority: 'Medium', category: 'Listing', status: 'in_progress', createdAt: '2024-02-14T09:15:00Z', messages: [{ sender: 'user', text: 'My flat listing is pending for 48 hours.', time: '09:15 AM' }, { sender: 'admin', text: 'We are reviewing your photos. They seem a bit blurry.', time: '09:30 AM' }] },
  { id: 'TKT-1031', subject: 'Unable to login to owner app', userName: 'Priya Desai', userType: 'Owner', priority: 'High', category: 'Technical', status: 'resolved', createdAt: '2024-02-13T14:30:00Z', messages: [{ sender: 'user', text: 'App crashes on launch', time: '14:30 PM' }, { sender: 'admin', text: 'Please update to version 2.1 in the App Store.', time: '15:00 PM' }] },
  { id: 'TKT-1032', subject: 'Property details are wrong', userName: 'Vikram Singh', userType: 'Student', priority: 'Low', category: 'Listing', status: 'open', createdAt: '2024-02-12T11:20:00Z', messages: [{ sender: 'user', text: 'The PG claims to have AC but they do not.', time: '11:20 AM' }] },
  { id: 'TKT-1033', subject: 'Payout delayed', userName: 'Sneha Reddy', userType: 'Owner', priority: 'High', category: 'Payment', status: 'open', createdAt: '2024-02-11T16:10:00Z', messages: [{ sender: 'user', text: 'When will I receive the monthly rent transfer?', time: '16:10 PM' }] },
];

export function useAdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setTickets(mockTicketsData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return [
      { id: 'total', label: 'Total Tickets', value: tickets.length, icon: MessageSquare },
      { id: 'open', label: 'Open', value: tickets.filter(t => t.status === 'open').length, icon: AlertCircle },
      { id: 'in_progress', label: 'In Progress', value: tickets.filter(t => t.status === 'in_progress').length, icon: Clock },
      { id: 'resolved', label: 'Resolved', value: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length, icon: CheckCircle }
    ];
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchSearch = ticket.subject.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          ticket.userName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = filters.status === 'All' || ticket.status === filters.status.toLowerCase().replace(' ', '_');
      const matchPriority = filters.priority === 'All' || ticket.priority === filters.priority;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [tickets, debouncedSearch, filters]);

  const updateTicketStatus = (id, newStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };
  
  const addMessage = (id, text, sender = 'admin') => {
    setTickets(prev => prev.map(t => {
      if(t.id === id) {
        return {
          ...t,
          messages: [...t.messages, { sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        }
      }
      return t;
    }));
  };

  return {
    tickets: filteredTickets,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateTicketStatus,
    addMessage
  };
}
