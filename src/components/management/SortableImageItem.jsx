import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Star, GripVertical } from 'lucide-react';

export default function SortableImageItem({ id, url, onDelete, onSetCover, isCover }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-xl overflow-hidden glass ${isCover ? 'ring-2 ring-accent-500' : 'ring-1 ring-border'}`}
    >
      {/* Drag handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 left-2 z-10 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing backdrop-blur-sm"
      >
        <GripVertical size={16} />
      </div>

      <img src={url} alt="Property media" className="w-full h-48 object-cover" />
      
      {/* Cover badge */}
      {isCover && (
        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-accent-500/90 text-white text-xs font-medium backdrop-blur-sm shadow-lg flex items-center gap-1.5">
          <Star size={12} className="fill-white" />
          Cover Photo
        </div>
      )}

      {/* Action buttons on hover */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
        {!isCover && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetCover(id);
            }}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
            title="Set as Cover"
          >
            <Star size={16} />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-sm transition-colors"
          title="Delete Image"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
