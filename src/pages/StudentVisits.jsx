import React, { useState } from 'react';
import { useVisits } from '../hooks/useVisits';
import StudentVisitCard from '../components/booking/StudentVisitCard';
import Loader from '../components/Loader';
import { Calendar } from 'lucide-react';

export default function StudentVisits() {
  const { visits, loading, updateVisitStatus } = useVisits();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingVisits = visits.filter(v => ['pending', 'approved'].includes(v.status));
  const pastVisits = visits.filter(v => ['completed', 'rejected', 'cancelled'].includes(v.status));

  const displayVisits = activeTab === 'upcoming' ? upcomingVisits : pastVisits;

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this visit?")) {
      await updateVisitStatus(id, 'cancelled');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading visits..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center">
          <Calendar className="text-accent-400" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">My Property Visits</h1>
          <p className="text-text-secondary mt-1">Manage your scheduled property tours</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 bg-dark-800 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
            activeTab === 'upcoming' ? 'bg-dark-700 text-white shadow-sm' : 'text-text-secondary hover:text-white'
          }`}
        >
          Upcoming ({upcomingVisits.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-6 py-2.5 rounded-lg font-bold transition-all ${
            activeTab === 'past' ? 'bg-dark-700 text-white shadow-sm' : 'text-text-secondary hover:text-white'
          }`}
        >
          Past & Cancelled
        </button>
      </div>

      {displayVisits.length === 0 ? (
        <div className="text-center py-20 bg-dark-800 rounded-3xl border border-border">
          <Calendar size={48} className="text-text-muted mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No visits found</h2>
          <p className="text-text-secondary">You don't have any {activeTab} property tours.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVisits.map(visit => (
            <StudentVisitCard 
              key={visit.id} 
              visit={visit} 
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
