import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message, onRetry, icon: Icon = AlertTriangle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-error/15 mb-5">
          <Icon size={28} className="text-error" />
        </div>

        <p className="text-text-primary font-medium mb-2">Something went wrong</p>
        <p className="text-text-muted text-sm mb-6">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>

        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
