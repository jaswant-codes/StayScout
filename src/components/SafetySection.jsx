import React from 'react';
import { Shield, Eye, Lock, Camera, Bell, ShieldCheck, UserCheck } from 'lucide-react';

const getSafetyIcon = (feature) => {
  const lowerFeature = feature.toLowerCase();
  if (lowerFeature.includes('cctv') || lowerFeature.includes('camera')) return Camera;
  if (lowerFeature.includes('guard') || lowerFeature.includes('security')) return ShieldCheck;
  if (lowerFeature.includes('lock') || lowerFeature.includes('biometric')) return Lock;
  if (lowerFeature.includes('warden')) return UserCheck;
  if (lowerFeature.includes('alarm')) return Bell;
  if (lowerFeature.includes('visitor')) return Eye;
  return Shield;
};

const SafetySection = ({ safety }) => {
  if (!safety || safety.length === 0) return null;

  return (
    <div className="bg-dark-800 rounded-xl p-6 border border-border">
      <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 text-accent-500" />
        Safety & Security
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {safety.map((feature, index) => {
          const Icon = getSafetyIcon(feature);
          const isGirlsWarden = feature.toLowerCase().includes('girls warden') || feature.toLowerCase().includes('female warden');

          return (
            <div 
              key={index} 
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                isGirlsWarden 
                  ? 'bg-accent-500/10 border-accent-500/30' 
                  : 'bg-dark-700 border-border'
              }`}
            >
              <div className={`p-2 rounded-full ${
                isGirlsWarden ? 'bg-accent-500/20 text-accent-500' : 'bg-dark-800 text-text-muted'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`font-medium ${isGirlsWarden ? 'text-accent-500' : 'text-text-secondary'}`}>
                {feature}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SafetySection;
