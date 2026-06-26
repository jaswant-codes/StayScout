import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';

const ProfileCompletion = ({ completion = 0 }) => {
  const steps = [
    { id: 1, title: 'Verify Email', completed: true },
    { id: 2, title: 'Update Profile Info', completed: true },
    { id: 3, title: 'Add Bank Details', completed: completion >= 100 },
  ];

  return (
    <div className="card glass p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Profile Completion</h3>
        <span className="text-2xl font-bold gradient-text">{completion}%</span>
      </div>
      
      <div className="w-full bg-dark-700 h-2 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-accent-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${completion}%` }}
        />
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center justify-between p-3 rounded-lg bg-dark-800/50 border border-border">
            <div className="flex items-center gap-3">
              {step.completed ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-muted" />
              )}
              <span className={`font-medium ${step.completed ? 'text-white' : 'text-muted'}`}>
                {step.title}
              </span>
            </div>
            {!step.completed && (
              <button className="btn-secondary text-sm px-3 py-1.5 flex items-center gap-1">
                Complete
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCompletion;
