import React from 'react';
import { ShieldCheck, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

const PropertyRules = ({ rules = [], safety = [] }) => {
  if ((!rules || !rules.length) && (!safety || !safety.length)) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* House Rules */}
      {rules && rules.length > 0 && (
        <div className="bg-dark-800 rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-dark-700 rounded-lg text-accent-400">
              <Clock size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">House Rules</h3>
          </div>
          <ul className="space-y-3.5">
            {rules.map((rule, idx) => {
              const text = typeof rule === 'object' ? `${rule.label}: ${rule.value}` : rule;
              return (
                <li key={idx} className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-text-muted mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary leading-relaxed">{text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Safety & Security */}
      {safety && safety.length > 0 && (
        <div className="bg-dark-800 rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-dark-700 rounded-lg text-success">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">Safety & Security</h3>
          </div>
          <ul className="space-y-3.5">
            {safety.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertyRules;
