import React, { useState } from 'react';
import { Plus, Clock, User, ShieldAlert } from 'lucide-react';

const AdminNotes = ({ notes = [], onAdd }) => {
  const [newNote, setNewNote] = useState('');

  const handleAdd = () => {
    if (newNote.trim() && onAdd) {
      onAdd(newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <h4 className="text-yellow-500 font-medium text-sm flex items-center gap-2 mb-2">
          <ShieldAlert className="w-4 h-4" />
          Internal Admin Notes
        </h4>
        <p className="text-xs text-yellow-500/80 mb-4">
          These notes are only visible to administrators and staff members.
        </p>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a private note about this user..."
          className="input-field w-full h-24 resize-none mb-3 bg-dark-900 border-yellow-500/20 focus:border-yellow-500/50 text-sm"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            disabled={!newNote.trim()}
            className="btn-primary py-1.5 px-4 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {!notes || notes.length === 0 ? (
          <div className="text-center text-sm text-muted py-6 border border-dashed border-border rounded-xl">
            No notes have been added yet.
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-dark-700 border border-border rounded-xl p-4">
              <p className="text-sm text-white whitespace-pre-wrap">{note.content}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {note.author}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(note.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotes;
