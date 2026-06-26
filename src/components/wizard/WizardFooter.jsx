import { ArrowLeft, ArrowRight, Save, Check } from 'lucide-react';

export default function WizardFooter({ onNext, onBack, onSaveDraft, isFirstStep, isLastStep, isNextDisabled, lastSaved }) {
  return (
    <div className="sticky bottom-0 z-20 bg-dark-800/95 backdrop-blur-md border-t border-border p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="w-1/3">
          {!isFirstStep && (
            <button 
              onClick={onBack}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
        </div>
        
        <div className="w-1/3 flex justify-center">
          {lastSaved && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Check className="w-3 h-3 text-success" />
              Saved {lastSaved}
            </span>
          )}
        </div>
        
        <div className="w-1/3 flex justify-end items-center gap-3">
          <button 
            onClick={onSaveDraft}
            className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
          
          <button 
            onClick={onNext}
            disabled={isNextDisabled}
            className="btn-primary flex items-center gap-2"
          >
            {isLastStep ? (
              <>Publish</>
            ) : (
              <>
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
