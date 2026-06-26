import { CheckCircle2, Circle } from 'lucide-react';

export default function WizardSidebar({ steps, currentStepIndex, progress }) {
  return (
    <div className="hidden md:flex flex-col w-64 bg-dark-800 border-r border-border h-full p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">Add Property</h2>
        <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-dark-600 rounded-full h-2">
          <div className="bg-accent-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          
          return (
            <div key={index} className={`flex items-center gap-3 ${isActive ? 'text-accent-400' : isCompleted ? 'text-white' : 'text-gray-500'}`}>
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-accent-500" />
              ) : isActive ? (
                <Circle className="w-5 h-5 fill-accent-500/20 text-accent-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
              <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
