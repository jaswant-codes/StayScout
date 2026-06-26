import React from 'react';
import { ShieldAlert, Users, Cigarette, Wine, Dog, Clock, Settings } from 'lucide-react';

export default function StepRules({ form, updateForm }) {
  const rules = form.rules || {
    visitors: 'Allowed',
    smoking: 'Not Allowed',
    alcohol: 'Not Allowed',
    pets: 'Not Allowed',
    curfew: 'No Curfew'
  };

  const updateRule = (key, value) => {
    updateForm({
      rules: { ...rules, [key]: value }
    });
  };

  const ruleConfigs = [
    {
      id: 'visitors',
      label: 'Visitor Policy',
      icon: Users,
      options: ['Allowed', 'Allowed with Restrictions', 'Not Allowed', 'Family Only'],
      color: 'text-accent-400'
    },
    {
      id: 'smoking',
      label: 'Smoking Policy',
      icon: Cigarette,
      options: ['Allowed', 'Allowed outside only', 'Not Allowed'],
      color: 'text-error'
    },
    {
      id: 'alcohol',
      label: 'Alcohol Policy',
      icon: Wine,
      options: ['Allowed', 'Not Allowed', 'Discreetly Allowed'],
      color: 'text-warning'
    },
    {
      id: 'pets',
      label: 'Pet Policy',
      icon: Dog,
      options: ['Allowed', 'Cats Only', 'Dogs Only', 'Not Allowed'],
      color: 'text-success'
    },
    {
      id: 'curfew',
      label: 'Curfew Timing',
      icon: Clock,
      options: ['No Curfew', '10:00 PM', '11:00 PM', '12:00 AM'],
      color: 'text-accent-500'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-warning" />
          House Rules & Policies
        </h2>
        <p className="text-text-muted mt-1">Set clear expectations by defining the house rules for your property.</p>
      </div>

      <div className="bg-dark-800 border border-border rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-border bg-dark-900/50 flex items-center gap-2 text-white font-medium">
          <Settings className="w-5 h-5 text-accent-500" />
          Configuration
        </div>
        <div className="divide-y divide-border">
          {ruleConfigs.map((config) => (
            <div key={config.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-dark-800/80 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-dark-900 border border-border ${config.color}`}>
                  <config.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{config.label}</h3>
                  <p className="text-sm text-text-muted">Define the {config.label.toLowerCase()} for tenants.</p>
                </div>
              </div>
              
              <div className="w-full md:w-64">
                <select
                  value={rules[config.id] || config.options[0]}
                  onChange={(e) => updateRule(config.id, e.target.value)}
                  className="w-full bg-dark-900 border border-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-accent-500 transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.2em 1.2em'
                  }}
                >
                  {config.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-dark-800 border border-border rounded-xl p-6 shadow-lg">
        <label className="block text-sm font-medium text-white mb-2">Additional Rules (Optional)</label>
        <textarea
          value={rules.additional || ''}
          onChange={(e) => updateRule('additional', e.target.value)}
          placeholder="e.g. Keep common areas clean, Quiet hours after 10 PM..."
          className="w-full h-24 bg-dark-900 border border-border rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent-500 transition-colors resize-none"
        />
      </div>
    </div>
  );
}
