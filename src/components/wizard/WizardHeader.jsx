export default function WizardHeader({ steps, currentStepIndex, progress }) {
  const currentStep = steps[currentStepIndex] || {};

  return (
    <div className="md:hidden sticky top-0 z-20 bg-dark-800 border-b border-border p-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
          <h2 className="text-lg font-semibold text-white">{currentStep.title}</h2>
        </div>
        <div className="text-sm font-medium text-accent-400">
          {progress}%
        </div>
      </div>
      <div className="w-full bg-dark-600 rounded-full h-1.5">
        <div 
          className="bg-accent-500 h-1.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
