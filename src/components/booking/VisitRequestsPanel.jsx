import React from 'react';
import { Calendar, Clock, MapPin, User, FileText, Check, X } from 'lucide-react';

export default function VisitRequestsPanel({ visits = [], onUpdateStatus }) {
  const pendingVisits = visits.filter((v) => v.status === 'pending');

  return (
    <div className="card h-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
        <Calendar className="w-5 h-5 text-accent-500" />
        Pending Requests
      </h2>

      {pendingVisits.length === 0 ? (
        <div className="text-center py-8 text-text-muted">
          <p>No pending tour requests.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {pendingVisits.map((visit) => (
            <div
              key={visit.id}
              className="glass-strong rounded-xl p-4 border border-border hover:border-border-hover transition-all animate-fade-in"
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <h3 className="font-medium text-white flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-text-muted" />
                    {visit.studentName || visit.studentId}
                  </h3>
                  <p className="text-sm text-text-muted flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {visit.propertyName || 'Property'}
                  </p>
                </div>
                <span className="tag text-xs bg-warning/10 text-warning border-warning/20">
                  Pending
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary mb-3">
                <div className="flex items-center gap-2 bg-dark-700/50 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-accent-500" />
                  <span>{new Date(visit.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 bg-dark-700/50 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-accent-500" />
                  <span>{visit.timeSlot || 'Any time'}</span>
                </div>
              </div>

              {visit.notes && (
                <div className="text-sm text-text-secondary bg-dark-700/30 p-3 rounded-lg mb-4 flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 text-text-muted flex-shrink-0" />
                  <p className="italic">{visit.notes}</p>
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => onUpdateStatus(visit.id, 'approved')}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-success/10 hover:bg-success/20 text-success border border-success/20 rounded-lg transition-colors text-sm font-medium"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => onUpdateStatus(visit.id, 'rejected')}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-error/10 hover:bg-error/20 text-error border border-error/20 rounded-lg transition-colors text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
