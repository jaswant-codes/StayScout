import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const TicketActionPanel = ({ ticket, onStatusChange }) => {
  if (!ticket) return null;

  return (
    <div className="bg-dark-800 border border-border rounded-xl p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white">Actions</h3>
      
      <div className="space-y-3">
        <label className="text-sm text-text-muted">Change Status</label>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onStatusChange?.('In Progress')}
            className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
              ticket.status === 'In Progress' 
                ? 'bg-accent-500/20 border-accent-500 text-accent-400' 
                : 'bg-dark-700 border-border text-text-secondary hover:bg-dark-600'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">In Progress</span>
          </button>
          
          <button
            onClick={() => onStatusChange?.('Resolved')}
            className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
              ticket.status === 'Resolved' 
                ? 'bg-success/20 border-success text-success' 
                : 'bg-dark-700 border-border text-text-secondary hover:bg-dark-600'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Resolved</span>
          </button>
          
          <button
            onClick={() => onStatusChange?.('Closed')}
            className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
              ticket.status === 'Closed' 
                ? 'bg-dark-600 border-dark-500 text-white' 
                : 'bg-dark-700 border-border text-text-secondary hover:bg-dark-600'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Closed</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketActionPanel;
