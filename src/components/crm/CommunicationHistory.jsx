import React from 'react';

export default function CommunicationHistory({ lead }) {
  const timeline = lead?.timeline || [];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">Communication History</h3>
      
      {timeline.length > 0 ? (
        <div className="relative border-l border-border ml-3 mt-2 flex flex-col gap-6">
          {timeline.map((event, index) => (
            <div key={index} className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-500 ring-4 ring-dark-800" />
              
              <div className="flex flex-col">
                <span className="text-xs text-muted mb-1">{event.date}</span>
                <div className="bg-dark-700/50 rounded-lg p-3 border border-border">
                  <span className="text-sm font-medium text-white block mb-1">
                    {event.type || 'Note'}
                  </span>
                  <p className="text-sm text-secondary">
                    {event.note || event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted italic bg-dark-700/30 p-4 rounded-lg border border-border text-center">
          No communication history yet.
        </p>
      )}
    </div>
  );
}
