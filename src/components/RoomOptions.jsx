import React from 'react';
import { Bed, Check, X } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function RoomOptions({ rooms }) {
  if (!rooms || rooms.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <div key={room.id} className="card p-5 bg-dark-800 border-border hover:border-accent-500/30 transition-all duration-300">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Bed size={20} className="text-accent-500" />
                {room.type} Room
              </h4>
              <div className="text-xl font-bold text-white mt-1">
                {formatCurrency(room.price)}
                <span className="text-sm font-normal text-text-muted">/mo</span>
              </div>
            </div>
            {room.available ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-success/20 text-success border border-success/30 flex items-center gap-1">
                <Check size={14} /> Available
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-error/20 text-error border border-error/30 flex items-center gap-1">
                <X size={14} /> Sold Out
              </span>
            )}
          </div>
          
          {room.features && room.features.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <h5 className="text-sm font-semibold text-text-secondary mb-2">Room Features</h5>
              <ul className="grid grid-cols-2 gap-2">
                {room.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-text-muted flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            className={`w-full mt-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              room.available 
                ? 'bg-accent-600 hover:bg-accent-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]' 
                : 'bg-dark-700 text-text-muted cursor-not-allowed'
            }`}
            disabled={!room.available}
          >
            {room.available ? 'Select Room' : 'Waitlist'}
          </button>
        </div>
      ))}
    </div>
  );
}
