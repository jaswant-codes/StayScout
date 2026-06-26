import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import LeadCard from './LeadCard';

const PipelineColumn = ({ column, leads, setActiveLeadId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-w-[300px] w-[300px] bg-dark-800 rounded-xl border border-border p-4 transition-colors ${
        isOver ? 'bg-dark-700/50 border-border-hover' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white">{column.title}</h3>
        <span className="bg-dark-700 text-text-muted px-2 py-0.5 rounded-full text-xs font-medium">
          {leads.length}
        </span>
      </div>
      <div className="flex flex-col gap-3 flex-grow min-h-[150px]">
        {leads.map(lead => (
          <LeadCard key={lead.id} lead={lead} onClick={() => setActiveLeadId(lead.id)} />
        ))}
      </div>
    </div>
  );
};

const LeadPipeline = ({ columns, leads, updateLeadStatus, setActiveLeadId }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && active.id) {
      updateLeadStatus(active.id, over.id);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex overflow-x-auto gap-6 pb-6 w-full snap-x snap-mandatory hide-scrollbar">
        {columns.map(column => {
          const columnLeads = leads.filter(lead => lead.status === column.id);
          return (
            <div key={column.id} className="snap-start">
              <PipelineColumn
                column={column}
                leads={columnLeads}
                setActiveLeadId={setActiveLeadId}
              />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
};

export default LeadPipeline;
