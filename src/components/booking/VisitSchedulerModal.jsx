import React, { useState } from 'react';
import { Calendar, Clock, X, MapPin } from 'lucide-react';

export default function VisitSchedulerModal({ isOpen, onClose, property, onSubmit }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  // Generate next 14 days
  const today = new Date();
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const timeSlots = [
    'Morning (10-12)',
    'Afternoon (1-4)',
    'Evening (4-7)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    onSubmit({
      propertyId: property.id,
      propertyName: property.title,
      ownerId: property.ownerId,
      date: selectedDate.toISOString(),
      timeSlot: selectedTime,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-dark-800 rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 border border-border flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-white">Schedule a Visit</h2>
            <p className="text-sm text-text-secondary flex items-center gap-1 mt-1">
              <MapPin size={14} /> {property?.title || 'Selected Property'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-white rounded-full hover:bg-dark-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="visitForm" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Date */}
            <div>
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Calendar className="text-accent-400" size={18} /> Select Date
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-text-muted mb-2">{day}</div>
                ))}
                
                {/* Empty slots for padding first row based on day of week */}
                {Array.from({ length: dates[0].getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {dates.map((d, i) => {
                  const isSelected = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`aspect-square flex items-center justify-center rounded-xl text-sm transition-all ${
                        isSelected 
                          ? 'bg-accent-500 text-white font-bold shadow-lg shadow-accent-500/25' 
                          : 'bg-dark-700 text-text-primary hover:bg-dark-600'
                      }`}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time */}
            <div>
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Clock className="text-accent-400" size={18} /> Select Time
              </h3>
              <div className="flex flex-wrap gap-3">
                {timeSlots.map(slot => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      selectedTime === slot
                        ? 'bg-accent-500 text-white border-accent-500'
                        : 'bg-dark-900 border-border text-text-secondary hover:border-accent-500/50 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Notes */}
            <div>
              <h3 className="text-white font-medium mb-4">Message to Owner (Optional)</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., I'll be coming with my parents."
                className="input-field w-full h-24 resize-none"
              />
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-border bg-dark-900 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-secondary px-6">Cancel</button>
          <button 
            type="submit" 
            form="visitForm"
            disabled={!selectedDate || !selectedTime}
            className="btn-primary px-8 disabled:opacity-50"
          >
            Request Visit
          </button>
        </div>
      </div>
    </div>
  );
}
