import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ images = [], onChange }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files) => {
    const newImages = [];
    let processed = 0;
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        processed++;
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        processed++;
        
        if (processed === files.length) {
          onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onChange(updatedImages);
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragging 
            ? 'border-accent-500 bg-accent-500/10' 
            : 'border-border hover:border-accent-500 hover:bg-dark-700/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center">
            <Upload className="w-6 h-6 text-accent-400" />
          </div>
          <div>
            <p className="text-white font-medium">Click or drag images to upload</p>
            <p className="text-sm text-text-muted mt-1">Supports JPG, PNG, GIF</p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-text-muted mb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Uploaded Images ({images.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div 
                key={index} 
                className="relative group rounded-lg overflow-hidden bg-dark-700 aspect-video border border-border"
              >
                <img 
                  src={img} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      removeImage(index); 
                    }}
                    className="p-2 bg-danger/90 hover:bg-danger text-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
