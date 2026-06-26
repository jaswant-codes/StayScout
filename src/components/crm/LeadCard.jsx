import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const LeadCard = ({ lead, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: lead
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : undefined,
  } : undefined;

  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'bg-error/20 text-error';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'low': return 'bg-success/20 text-success';
      default: return 'bg-dark-600 text-text-muted';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`card bg-dark-800 border border-border rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-border-hover transition-colors shadow-sm hover:shadow-md ${isDragging ? 'opacity-50 ring-2 ring-accent-500' : ''}`}
      onClick={(e) => {
        if (!isDragging && onClick) {
          onClick(e);
        }
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-white text-sm truncate pr-2">{lead.name}</h4>
        {lead.priority && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getPriorityColor(lead.priority)}`}>
            {lead.priority}
          </span>
        )}
      </div>
      <div className="text-xs text-text-muted mb-2 line-clamp-1">
        {lead.propertyName || 'No property specified'}
      </div>
      <div className="flex justify-between items-end mt-3">
        <div className="text-xs font-medium text-text-primary">
          {lead.budget ? `$${lead.budget.toLocaleString()}` : 'No budget'}
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
