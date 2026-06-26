import React from 'react';
import { Calendar, Clock, MapPin, XCircle } from 'lucide-react';

export default function StudentVisitCard({ visit, onCancel }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved': return { color: 'text-success', bg: 'bg-success/10', label: 'Approved' };
      case 'rejected': return { color: 'text-error', bg: 'bg-error/10', label: 'Rejected' };
      case 'cancelled': return { color: 'text-text-muted', bg: 'bg-dark-700', label: 'Cancelled' };
      case 'completed': return { color: 'text-accent-400', bg: 'bg-accent-500/10', label: 'Completed' };
      default: return { color: 'text-warning', bg: 'bg-warning/10', label: 'Pending Approval' };
    }
  };

  const config = getStatusConfig(visit.status);
  const date = new Date(visit.date);
  const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="bg-dark-800 border border-border p-4 rounded-xl glass-strong flex flex-col relative overflow-hidden group hover:border-dark-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{visit.propertyName}</h3>
          <p className="text-sm text-text-secondary flex items-center gap-1">
            <MapPin size={14} /> Owner ID: {visit.ownerId}
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="space-y-3 mb-6 bg-dark-900 rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3 text-text-primary">
          <Calendar size={18} className="text-accent-400" />
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-3 text-text-primary">
          <Clock size={18} className="text-accent-400" />
          <span className="font-medium">{visit.timeSlot}</span>
        </div>
      </div>

      <div className="mt-auto">
        {(visit.status === 'pending' || visit.status === 'approved') && (
          <button 
            onClick={() => onCancel(visit.id)}
            className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-error bg-error/5 hover:bg-error/15 rounded-xl transition-colors"
          >
            <XCircle size={16} /> Cancel Visit
          </button>
        )}
      </div>
    </div>
  );
}
