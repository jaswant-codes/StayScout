import React from 'react';
import { useVisits } from '../hooks/useVisits';
import VisitRequestsPanel from '../components/booking/VisitRequestsPanel';
import OwnerCalendarView from '../components/booking/OwnerCalendarView';
import Loader from '../components/Loader';
import { CalendarDays } from 'lucide-react';

export default function OwnerVisits() {
  const { visits, loading, updateVisitStatus } = useVisits();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Loader text="Loading tours..." />
      </div>
    );
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateVisitStatus(id, status);
    } catch (error) {
      console.error('Failed to update status', error);
      // In a real app we might show a toast notification here
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-accent-500" />
          Tour Management
        </h1>
        <p className="text-text-muted mt-2">
          Manage your upcoming property tours and pending requests.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-4 lg:overflow-hidden h-full">
          <VisitRequestsPanel 
            visits={visits} 
            onUpdateStatus={handleUpdateStatus} 
          />
        </div>
        
        <div className="lg:col-span-8 lg:overflow-hidden h-full">
          <OwnerCalendarView visits={visits} />
        </div>
      </div>
    </div>
  );
}
