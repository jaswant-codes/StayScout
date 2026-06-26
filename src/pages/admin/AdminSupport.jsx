import React, { useState } from 'react';
import { useAdminTickets } from '../../hooks/admin/useAdminTickets';
import TicketStatsBar from '../../components/admin/support/TicketStatsBar';
import TicketFilters from '../../components/admin/support/TicketFilters';
import TicketTable from '../../components/admin/support/TicketTable';
import TicketDrawer from '../../components/admin/support/TicketDrawer';

export default function AdminSupport() {
  const {
    tickets,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateTicketStatus,
    addMessage
  } = useAdminTickets();

  const [activeTicketId, setActiveTicketId] = useState(null);

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Resolution Center</h1>
          <p className="text-text-secondary text-sm">Manage student and owner support tickets.</p>
        </div>
      </div>

      <TicketStatsBar stats={stats} loading={loading} />

      <div className="bg-dark-800 border border-border rounded-2xl overflow-hidden shadow-2xl">
        <TicketFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onChange={setFilters}
        />
        
        <TicketTable 
          tickets={tickets}
          loading={loading}
          onRowClick={(ticket) => setActiveTicketId(ticket.id)}
        />
      </div>

      <TicketDrawer 
        ticket={activeTicket}
        isOpen={!!activeTicketId}
        onClose={() => setActiveTicketId(null)}
        onAction={updateTicketStatus}
        onSendMessage={addMessage}
      />
    </div>
  );
}
