import React from 'react';
import { X } from 'lucide-react';
import PropertySummary from '../PropertySummary';
import QuickFacts from '../QuickFacts';
import PricingBreakdown from '../PricingBreakdown';
import AmenitiesSection from '../AmenitiesSection';

const PreviewPanel = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl bg-dark-900 h-full shadow-2xl flex flex-col animate-slide-in border-l border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-dark-800 border-b border-border sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Student Preview</h2>
            <span className="tag-active bg-accent-500/20 text-accent-400 border-accent-500/30 text-xs">
              Live Preview
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-white hover:bg-dark-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="text-sm font-medium">Close Preview</span>
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          <PropertySummary property={property} />
          <QuickFacts property={property} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AmenitiesSection facilities={property.facilities || []} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <PricingBreakdown property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
