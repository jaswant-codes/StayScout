import React, { useState } from 'react';

export default function FollowUpPanel({ lead, addNoteToLead }) {
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (note.trim()) {
      addNoteToLead(lead.id, note);
      setNote('');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">Add Note / Log Call</h3>
      <textarea
        className="input-field min-h-[120px] resize-y p-3"
        placeholder="Type a private note or log an interaction..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="flex justify-end">
        <button 
          className="btn-primary" 
          onClick={handleSave} 
          disabled={!note.trim()}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
