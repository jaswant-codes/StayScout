import React from 'react';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

export default function ProfileCompletionTracker({ completionPercentage }) {
  const { percentage = 0, tasks = [] } = completionPercentage || {};
  
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-500" />
            Profile Completion
          </h2>
          <p className="text-text-muted mt-1 text-sm">
            Complete your profile to build trust and get more bookings.
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-accent-500">{percentage}%</span>
        </div>
      </div>
      
      <div className="w-full bg-dark-700 rounded-full h-2.5 mb-8 overflow-hidden">
        <div 
          className="bg-accent-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
              task.completed 
                ? 'bg-dark-800/50 border-dark-600' 
                : 'glass border-border hover:border-accent-500/30'
            }`}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-text-muted flex-shrink-0" />
            )}
            
            <div className="flex-1">
              <p className={`font-medium ${task.completed ? 'text-text-muted line-through' : 'text-white'}`}>
                {task.title}
              </p>
              {task.description && !task.completed && (
                <p className="text-sm text-text-muted mt-1">{task.description}</p>
              )}
            </div>
            
            {!task.completed && task.actionLabel && (
              <button className="btn-secondary text-sm py-1.5 px-4 rounded-lg">
                {task.actionLabel}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
