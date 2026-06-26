import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

export default function ImageGallery({ images = [], propertyName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-dark-800 rounded-2xl flex items-center justify-center text-text-muted border border-border">
        No Images Available
      </div>
    );
  }

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[450px] lg:h-[500px] rounded-3xl overflow-hidden group">
        <div 
          className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden"
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={images[0]} 
            alt={propertyName} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {images.slice(1, 5).map((img, idx) => (
          <div 
            key={idx} 
            className="relative cursor-pointer overflow-hidden"
            onClick={() => {
              setCurrentIndex(idx + 1);
              setIsModalOpen(true);
            }}
          >
            <img 
              src={img} 
              alt={`${propertyName} ${idx + 2}`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
            />
            {idx === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-dark-900/60 flex items-center justify-center backdrop-blur-[2px]">
                <span className="text-white font-bold text-xl">+{images.length - 5} More</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Slider Layout */}
      <div className="md:hidden relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden group">
        <img 
          src={images[currentIndex]} 
          alt={propertyName} 
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-dark-900/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-dark-900/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-dark-900/70 text-white text-xs font-medium backdrop-blur-md tracking-wider">
              {currentIndex + 1} / {images.length}
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 p-2 rounded-full bg-dark-900/60 text-white backdrop-blur-md"
            >
              <Maximize2 size={18} />
            </button>
          </>
        )}
      </div>

      {/* Fullscreen Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-dark-900/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in">
          <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center z-10">
            <div className="text-white font-medium bg-dark-800/80 px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} of {images.length}
            </div>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="p-3 bg-dark-800/80 rounded-full text-white hover:bg-dark-700 transition-colors border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative w-full max-w-6xl h-full max-h-[80vh] flex items-center justify-center p-4">
            <img 
              src={images[currentIndex]} 
              alt={`${propertyName} fullscreen`} 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-xl"
            />

            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 p-4 rounded-full bg-dark-800/80 text-white hover:bg-dark-700 hover:scale-110 transition-all border border-white/10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 p-4 rounded-full bg-dark-800/80 text-white hover:bg-dark-700 hover:scale-110 transition-all border border-white/10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 flex gap-2 overflow-x-auto max-w-full px-4 pb-2 snap-x hide-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden snap-center transition-all ${idx === currentIndex ? 'border-2 border-accent-500 scale-110 shadow-lg' : 'opacity-50 hover:opacity-100 border border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
