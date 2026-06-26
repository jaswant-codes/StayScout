import React, { useState } from 'react';
import { ZoomIn, ZoomOut, CheckCircle } from 'lucide-react';

export default function DocumentViewer({ documentUrl, documentType }) {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col h-full bg-dark-900 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border bg-dark-800">
        <span className="text-sm font-medium text-white capitalize">{documentType || 'Document'}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoom(z => Math.max(50, z - 25))}
            className="p-1.5 hover:bg-dark-700 rounded text-text-muted hover:text-white transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs text-text-muted w-12 text-center">{zoom}%</span>
          <button 
            onClick={() => setZoom(z => Math.min(200, z + 25))}
            className="p-1.5 hover:bg-dark-700 rounded text-text-muted hover:text-white transition-colors"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>
      
      <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center bg-dark-950 min-h-[300px]">
        {/* Fake OCR overlay */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full border border-success/20 shadow-lg backdrop-blur-sm animate-fade-in">
          <CheckCircle size={14} />
          <span className="text-xs font-medium">Analyzing text... Verified</span>
        </div>
        
        <div 
          className="transition-transform duration-200 origin-center flex items-center justify-center"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {documentUrl ? (
            <img 
              src={documentUrl} 
              alt="Verification Document" 
              className="max-w-full h-auto rounded shadow-lg border border-border"
            />
          ) : (
            <div className="w-64 h-80 bg-dark-800 border border-border border-dashed rounded flex flex-col items-center justify-center text-text-muted">
              <span className="text-sm">No Document</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
