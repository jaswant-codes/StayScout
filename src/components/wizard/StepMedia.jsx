import React from 'react';
import ImageUploader from './ImageUploader';
import { Camera } from 'lucide-react';

const StepMedia = ({ form, updateForm }) => {
  const handleImagesChange = (newImages) => {
    updateForm({ images: newImages });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Camera className="w-6 h-6 text-accent-500" />
          Property Media
        </h2>
        <p className="text-text-muted">
          Upload photos of your property. The first photo will be used as the cover image.
        </p>
      </div>

      <div className="card p-6 bg-dark-800 border-border">
        <ImageUploader 
          images={form.images || []} 
          onChange={handleImagesChange} 
        />
      </div>
    </div>
  );
};

export default StepMedia;
