import React, { useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';

export default function OwnerCalendarView({ visits = [] }) {
  // Filter for approved visits
  const approvedVisits = visits.filter(v => v.status === 'approved');

  // Generate timeline for next 14 days
  const timelineDays = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Find visits for this day
      const dayVisits = approvedVisits.filter(v => {
        const visitDate = new Date(v.date);
        visitDate.setHours(0, 0, 0, 0);
        return visitDate.getTime() === date.getTime();
      });

      days.push({
        date,
        visits: dayVisits
      });
    }
    return days;
  }, [approvedVisits]);

  return (
    <div className="card h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-accent-500" />
          Upcoming Schedule
        </h2>
        <span className="text-sm text-text-muted bg-dark-700/50 px-3 py-1 rounded-full border border-border">
          Next 14 Days
        </span>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
        <div className="flex gap-4 min-w-max h-full">
          {timelineDays.map((day, idx) => (
            <div 
              key={idx} 
              className="w-72 flex flex-col gap-3 bg-dark-800/50 border border-border rounded-xl p-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider font-medium">
                    {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                {day.visits.length > 0 ? (
                  <span className="w-6 h-6 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-xs font-bold border border-accent-500/30">
                    {day.visits.length}
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-dark-600"></span>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1">
                {day.visits.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-text-muted text-sm italic">
                    No tours scheduled
                  </div>
                ) : (
                  day.visits.map(visit => (
                    <div 
                      key={visit.id} 
                      className="glass-strong rounded-lg p-3 border border-success/20 relative overflow-hidden group hover:border-success/40 transition-colors"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-success/60"></div>
                      
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium text-white text-sm flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-success" />
                          {visit.timeSlot || 'Any time'}
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-success opacity-50" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="text-sm text-text-secondary flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <span className="truncate">{visit.studentName || visit.studentId}</span>
                        </div>
                        <div className="text-xs text-text-muted flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{visit.propertyName || 'Property'}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
