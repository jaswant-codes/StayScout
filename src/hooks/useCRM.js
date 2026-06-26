import { useState, useCallback, useMemo } from 'react';

const MOCK_LEADS = [
  {
    id: 'L001',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.s@example.com',
    propertyId: 'demo-prop-1',
    propertyName: 'Galaxy PG',
    budget: '₹8,000',
    preferredRoom: 'Double Sharing',
    moveInDate: '2023-11-01',
    status: 'new', // new, contacted, interested, visit, negotiating, converted, lost
    source: 'Website',
    lastContact: '10 mins ago',
    score: 85,
    unread: true,
    priority: 'high',
    notes: 'Parents will visit tomorrow.',
    timeline: [
      { id: 1, type: 'status_change', text: 'Lead created', time: '10 mins ago' }
    ]
  },
  {
    id: 'L002',
    name: 'Priya Patel',
    phone: '+91 91234 56789',
    email: 'priya.p@example.com',
    propertyId: 'demo-prop-2',
    propertyName: 'Sunrise Hostel',
    budget: '₹12,000',
    preferredRoom: 'Single',
    moveInDate: '2023-11-15',
    status: 'contacted',
    source: 'WhatsApp',
    lastContact: '2 hours ago',
    score: 65,
    unread: false,
    priority: 'medium',
    notes: '',
    timeline: [
      { id: 1, type: 'status_change', text: 'Lead created', time: '1 day ago' },
      { id: 2, type: 'contact', text: 'Sent WhatsApp message', time: '2 hours ago' }
    ]
  },
  {
    id: 'L003',
    name: 'Amit Singh',
    phone: '+91 99887 76655',
    email: 'amit.s@example.com',
    propertyId: 'demo-prop-1',
    propertyName: 'Galaxy PG',
    budget: '₹7,500',
    preferredRoom: 'Triple Sharing',
    moveInDate: '2023-10-30',
    status: 'visit',
    source: 'MagicBricks',
    lastContact: '1 day ago',
    score: 95,
    unread: false,
    priority: 'high',
    notes: 'Very interested, wants AC room.',
    timeline: [
      { id: 1, type: 'visit', text: 'Visit scheduled for tomorrow 5 PM', time: '1 day ago' }
    ]
  },
  {
    id: 'L004',
    name: 'Neha Gupta',
    phone: '+91 98765 12345',
    email: 'neha.g@example.com',
    propertyId: 'demo-prop-2',
    propertyName: 'Sunrise Hostel',
    budget: '₹10,000',
    preferredRoom: 'Double Sharing',
    moveInDate: '2023-11-05',
    status: 'interested',
    source: 'Website',
    lastContact: '3 days ago',
    score: 75,
    unread: false,
    priority: 'medium',
    notes: 'Checking other options.',
    timeline: []
  },
  {
    id: 'L005',
    name: 'Vikram Verma',
    phone: '+91 99999 88888',
    email: 'vikram.v@example.com',
    propertyId: 'demo-prop-1',
    propertyName: 'Galaxy PG',
    budget: '₹15,000',
    preferredRoom: 'Private Room',
    moveInDate: '2023-10-28',
    status: 'new',
    source: 'Call',
    lastContact: '1 min ago',
    score: 90,
    unread: true,
    priority: 'high',
    notes: '',
    timeline: []
  }
];

export const PIPELINE_COLUMNS = [
  { id: 'new', title: 'New Leads' },
  { id: 'contacted', title: 'Contacted' },
  { id: 'interested', title: 'Interested' },
  { id: 'visit', title: 'Visit Scheduled' },
  { id: 'negotiating', title: 'Negotiating' },
  { id: 'converted', title: 'Converted' },
  { id: 'lost', title: 'Lost' }
];

export function useCRM() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLeadId, setActiveLeadId] = useState(null);

  const filteredLeads = useMemo(() => {
    if (!searchQuery) return leads;
    const lowerQuery = searchQuery.toLowerCase();
    return leads.filter(l => 
      l.name.toLowerCase().includes(lowerQuery) || 
      l.propertyName.toLowerCase().includes(lowerQuery) ||
      l.phone.includes(lowerQuery)
    );
  }, [leads, searchQuery]);

  const activeLead = useMemo(() => {
    return leads.find(l => l.id === activeLeadId) || null;
  }, [leads, activeLeadId]);

  const updateLeadStatus = useCallback((leadId, newStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status: newStatus,
            timeline: [...lead.timeline, { id: Date.now(), type: 'status_change', text: `Moved to ${newStatus}`, time: 'Just now' }]
          } 
        : lead
    ));
  }, []);

  const addNoteToLead = useCallback((leadId, noteText) => {
    setLeads(prev => prev.map(lead =>
      lead.id === leadId
        ? {
            ...lead,
            notes: lead.notes ? `${lead.notes}\n${noteText}` : noteText,
            timeline: [...lead.timeline, { id: Date.now(), type: 'note', text: `Note added: ${noteText}`, time: 'Just now' }]
          }
        : lead
    ));
  }, []);

  // Compute stats
  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      visits: leads.filter(l => l.status === 'visit').length,
      converted: leads.filter(l => l.status === 'converted').length,
      conversionRate: leads.length ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0,
      unread: leads.filter(l => l.unread).length
    };
  }, [leads]);

  return {
    leads: filteredLeads,
    allLeads: leads,
    columns: PIPELINE_COLUMNS,
    searchQuery,
    setSearchQuery,
    activeLeadId,
    setActiveLeadId,
    activeLead,
    updateLeadStatus,
    addNoteToLead,
    stats
  };
}
