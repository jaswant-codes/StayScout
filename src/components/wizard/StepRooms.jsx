import React from 'react';
import { Bed, Plus, Trash2 } from 'lucide-react';

export default function StepRooms({ form, updateForm }) {
  const rooms = form.rooms || [];

  const addRoom = () => {
    updateForm({
      rooms: [...rooms, { type: 'Single', price: '', sharing: '1', area: '' }]
    });
  };

  const updateRoom = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], [field]: value };
    updateForm({ rooms: newRooms });
  };

  const removeRoom = (index) => {
    updateForm({ rooms: rooms.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bed className="w-6 h-6 text-accent-500" />
            Room Configurations
          </h2>
          <p className="text-text-muted mt-1">Add available rooms, sharing options, and specific prices.</p>
        </div>
        <button
          type="button"
          onClick={addRoom}
          className="btn-primary flex items-center gap-2 px-4 py-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Room</span>
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="bg-dark-800 border border-border border-dashed rounded-xl p-12 text-center text-text-muted">
          <Bed className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No rooms added yet.</p>
          <p className="text-sm">Click the button above to add your first room configuration.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map((room, index) => (
            <div key={index} className="bg-dark-800 border border-border rounded-xl p-5 shadow-lg relative group">
              <button
                type="button"
                onClick={() => removeRoom(index)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                title="Remove Room"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <h3 className="text-lg font-medium text-white mb-4 pr-10 border-b border-border pb-2">
                Room #{index + 1}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-text-secondary font-medium">Room Type</label>
                  <select
                    value={room.type}
                    onChange={(e) => updateRoom(index, 'type', e.target.value)}
                    className="w-full bg-dark-900 border border-border rounded-lg py-2 px-3 text-sm text-white focus:border-accent-500 focus:outline-none"
                  >
                    <option value="Single">Single Room</option>
                    <option value="Double">Double Room</option>
                    <option value="Shared">Shared Room</option>
                    <option value="Master">Master Bedroom</option>
                    <option value="Studio">Studio Apartment</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-text-secondary font-medium">Sharing</label>
                  <select
                    value={room.sharing}
                    onChange={(e) => updateRoom(index, 'sharing', e.target.value)}
                    className="w-full bg-dark-900 border border-border rounded-lg py-2 px-3 text-sm text-white focus:border-accent-500 focus:outline-none"
                  >
                    <option value="1">Private (1 Person)</option>
                    <option value="2">2 Sharing</option>
                    <option value="3">3 Sharing</option>
                    <option value="4">4 Sharing</option>
                    <option value="4+">4+ Sharing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-text-secondary font-medium">Price / Month</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted text-xs">₹</span>
                    <input
                      type="number"
                      value={room.price}
                      onChange={(e) => updateRoom(index, 'price', e.target.value)}
                      placeholder="0"
                      className="w-full bg-dark-900 border border-border rounded-lg py-2 pl-6 pr-3 text-sm text-white focus:border-accent-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-text-secondary font-medium">Area (sq ft)</label>
                  <input
                    type="number"
                    value={room.area}
                    onChange={(e) => updateRoom(index, 'area', e.target.value)}
                    placeholder="e.g. 120"
                    className="w-full bg-dark-900 border border-border rounded-lg py-2 px-3 text-sm text-white focus:border-accent-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
