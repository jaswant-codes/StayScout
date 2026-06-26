import React from 'react';
import DrawerPanel from '../DrawerPanel';
import TicketChatBox from './TicketChatBox';
import TicketActionPanel from './TicketActionPanel';
import { AlertCircle, User, Calendar, Tag } from 'lucide-react';

const TicketDrawer = ({ ticket, isOpen, onClose, onAction }) => {
  if (!ticket) return null;

  const handleStatusChange = (newStatus) => {
    onAction?.('status_change', { ticketId: ticket.id, status: newStatus });
  };

  const handleSendMessage = (content) => {
    onAction?.('send_message', { ticketId: ticket.id, content });
  };

  const priorityColor = {
    high: 'text-error bg-error/10 border-error/20',
    medium: 'text-warning bg-warning/10 border-warning/20',
    low: 'text-success bg-success/10 border-success/20',
  }[ticket.priority?.toLowerCase()] || 'text-text-secondary bg-dark-700 border-border';

  return (
    <DrawerPanel isOpen={isOpen} onClose={onClose} title="Ticket Details">
      <div className="p-6 h-full overflow-y-auto flex flex-col gap-6">
        
        {/* Ticket Header Info */}
        <div className="bg-dark-800 border border-border rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{ticket.subject || 'Untitled Ticket'}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {ticket.userName || 'Unknown User'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {ticket.createdAt || 'Unknown Date'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  Ticket #{ticket.id}
                </span>
              </div>
            </div>
            
            <div className={`px-3 py-1 rounded-full border text-xs font-medium uppercase tracking-wider ${priorityColor}`}>
              {ticket.priority || 'Normal'} Priority
            </div>
          </div>
          
          {ticket.description && (
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-text-muted mb-2">Description</h4>
              <p className="text-text-primary text-sm whitespace-pre-wrap leading-relaxed">
                {ticket.description}
              </p>
            </div>
          )}
        </div>

        {/* Main Content Layout - Stacked on small screens, Two columns on large screens */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <TicketChatBox 
              messages={ticket.messages || []} 
              onSendMessage={handleSendMessage} 
            />
          </div>
          <div className="w-full lg:w-72 shrink-0">
            <TicketActionPanel 
              ticket={ticket} 
              onStatusChange={handleStatusChange} 
            />
          </div>
        </div>
        
      </div>
    </DrawerPanel>
  );
};

export default TicketDrawer;
