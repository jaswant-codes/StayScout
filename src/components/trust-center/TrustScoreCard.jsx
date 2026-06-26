import React from 'react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

const TrustScoreCard = ({ score = 0 }) => {
  let label = 'Needs Improvement';
  let colorClass = 'text-error';
  let Icon = ShieldAlert;

  if (score >= 80) {
    label = 'Excellent';
    colorClass = 'text-success';
    Icon = ShieldCheck;
  } else if (score >= 60) {
    label = 'Good';
    colorClass = 'text-warning';
    Icon = Shield;
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card glass-strong p-6 flex flex-col items-center text-center">
      <h3 className="text-lg font-semibold text-white mb-4">Trust Score</h3>
      
      <div className="relative flex items-center justify-center mb-4">
        {/* SVG Gauge */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-dark-600"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <Icon className={`w-8 h-8 mb-1 ${colorClass}`} />
          <span className="text-2xl font-bold text-white">{score}</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className={`text-xl font-medium ${colorClass}`}>{label}</p>
        <p className="text-sm text-text-muted">Based on reviews and verifications</p>
      </div>
    </div>
  );
};

export default TrustScoreCard;
