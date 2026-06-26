import React from 'react';
import { IndianRupee, Zap, Droplets, Info } from 'lucide-react';

export default function StepPricing({ form, updateForm }) {
  const calculateTotalCost = () => {
    const rent = Number(form.rent) || 0;
    const deposit = Number(form.deposit) || 0;
    const maintenance = Number(form.maintenance) || 0;
    const brokerage = Number(form.brokerage) || 0;
    return rent + deposit + maintenance + brokerage;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-dark-800 border border-border rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-accent-500" />
          Pricing Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Monthly Rent</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">₹</span>
              <input
                type="number"
                value={form.rent || ''}
                onChange={(e) => updateForm({ rent: e.target.value })}
                className="w-full bg-dark-900 border border-border rounded-lg py-2.5 pl-8 pr-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Security Deposit</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">₹</span>
              <input
                type="number"
                value={form.deposit || ''}
                onChange={(e) => updateForm({ deposit: e.target.value })}
                className="w-full bg-dark-900 border border-border rounded-lg py-2.5 pl-8 pr-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Maintenance (Monthly)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">₹</span>
              <input
                type="number"
                value={form.maintenance || ''}
                onChange={(e) => updateForm({ maintenance: e.target.value })}
                className="w-full bg-dark-900 border border-border rounded-lg py-2.5 pl-8 pr-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Brokerage / One-time Fee</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">₹</span>
              <input
                type="number"
                value={form.brokerage || ''}
                onChange={(e) => updateForm({ brokerage: e.target.value })}
                className="w-full bg-dark-900 border border-border rounded-lg py-2.5 pl-8 pr-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800 border border-border rounded-xl p-6 shadow-lg space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-warning" />
            Electricity Bill
          </h3>
          <select
            value={form.electricity || ''}
            onChange={(e) => updateForm({ electricity: e.target.value })}
            className="w-full bg-dark-900 border border-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
          >
            <option value="">Select an option</option>
            <option value="Included">Included in Rent</option>
            <option value="As per meter">As per meter (sub-meter)</option>
            <option value="Fixed monthly">Fixed monthly charge</option>
            <option value="Shared">Shared equally</option>
          </select>
        </div>

        <div className="bg-dark-800 border border-border rounded-xl p-6 shadow-lg space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Droplets className="w-5 h-5 text-accent-400" />
            Water Bill
          </h3>
          <select
            value={form.water || ''}
            onChange={(e) => updateForm({ water: e.target.value })}
            className="w-full bg-dark-900 border border-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
          >
            <option value="">Select an option</option>
            <option value="Included">Included in Rent</option>
            <option value="Fixed monthly">Fixed monthly charge</option>
            <option value="As per meter">As per meter</option>
            <option value="Shared">Shared equally</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent-600/20 to-accent-500/20 border border-accent-500/30 rounded-xl p-6 shadow-lg text-center animate-pulse-glow">
        <div className="flex items-center justify-center gap-2 text-accent-400 mb-2">
          <Info className="w-5 h-5" />
          <span className="font-medium">Estimated Total Move-in Cost</span>
        </div>
        <div className="text-4xl font-bold text-white tracking-tight">
          ₹{calculateTotalCost().toLocaleString()}
        </div>
        <p className="text-text-muted text-sm mt-2">
          (First month rent + Deposit + Maintenance + Brokerage)
        </p>
      </div>
    </div>
  );
}
