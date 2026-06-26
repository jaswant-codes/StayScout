import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  rectSortingStrategy, 
  arrayMove 
} from '@dnd-kit/sortable';
import { Upload, Save, Image as ImageIcon } from 'lucide-react';
import SortableImageItem from './SortableImageItem';

export default function MediaManager({ property, saveSection, markSectionDirty }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (property?.images) {
      // Map property images to include id if they are just strings or objects
      const formattedImages = property.images.map((img, index) => {
        if (typeof img === 'string') {
          return { id: img, url: img, isCover: index === 0 }; // Assume first is cover if not explicit
        }
        return { ...img, id: img.id || img.url };
      });
      setImages(formattedImages);
    }
  }, [property?.images]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newImages = arrayMove(items, oldIndex, newIndex);
        markSectionDirty('media');
        return newImages;
      });
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Use local blob URLs for newly uploaded files before saving
    const newImages = files.map(file => {
      const url = URL.createObjectURL(file);
      return {
        id: url,
        url,
        file
      };
    });

    setImages(prev => {
      const updated = [...prev, ...newImages];
      markSectionDirty('media');
      return updated;
    });
  };

  const handleDelete = (id) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      markSectionDirty('media');
      return updated;
    });
  };

  const handleSetCover = (id) => {
    setImages(prev => {
      const updated = prev.map(img => ({
        ...img,
        isCover: img.id === id
      }));
      markSectionDirty('media');
      return updated;
    });
  };

  const handleSave = () => {
    saveSection('media', { images });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <ImageIcon size={20} className="text-accent-400" />
            Property Media
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Drag and drop to reorder. First image will be used as cover if none is selected.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="btn-secondary cursor-pointer">
            <Upload size={18} />
            <span>Upload Photos</span>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
          <button onClick={handleSave} className="btn-primary">
            <Save size={18} />
            <span>Save Media</span>
          </button>
        </div>
      </div>

      {images.length > 0 ? (
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SortableContext 
              items={images.map(img => img.id)}
              strategy={rectSortingStrategy}
            >
              {images.map((img) => (
                <SortableImageItem 
                  key={img.id}
                  id={img.id}
                  url={img.url}
                  isCover={img.isCover}
                  onDelete={handleDelete}
                  onSetCover={handleSetCover}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      ) : (
        <div className="glass-strong rounded-xl p-12 text-center border border-dashed border-gray-700">
          <div className="mx-auto w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mb-4">
            <ImageIcon size={24} className="text-gray-400" />
          </div>
          <h4 className="text-white font-medium mb-2">No photos uploaded yet</h4>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Upload high-quality photos of your property to attract more students.
          </p>
          <label className="btn-primary inline-flex cursor-pointer">
            <Upload size={18} />
            <span>Select Files</span>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}
    </div>
  );
}
