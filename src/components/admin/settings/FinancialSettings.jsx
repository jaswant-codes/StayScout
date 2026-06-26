import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Shield, IndianRupee, Save } from 'lucide-react';

const FinancialSettings = ({ financials = {}, onChange }) => {
  const [formData, setFormData] = useState({
    commissionRate: financials.commissionRate || '',
    securityDeposit: financials.securityDeposit || '',
    minWithdrawal: financials.minWithdrawal || ''
  });

  useEffect(() => {
    if (financials) {
      setFormData({
        commissionRate: financials.commissionRate || '',
        securityDeposit: financials.securityDeposit || '',
        minWithdrawal: financials.minWithdrawal || ''
      });
    }
  }, [financials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChange) {
      onChange(formData);
    }
  };

  return (
    <div className="card bg-dark-800 border border-border p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-success" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Financial Settings</h2>
          <p className="text-sm text-text-muted">Manage platform commissions and limits</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Platform Commission Rate (%)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Percent className="w-4 h-4 text-text-muted" />
            </div>
            <input
              type="number"
              name="commissionRate"
              value={formData.commissionRate}
              onChange={handleChange}
              className="input-field pl-10 w-full"
              placeholder="e.g., 10"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Default Security Deposit (Months)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Shield className="w-4 h-4 text-text-muted" />
            </div>
            <input
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              className="input-field pl-10 w-full"
              placeholder="e.g., 2"
              min="0"
              step="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Minimum Withdrawal Amount (₹)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="w-4 h-4 text-text-muted" />
            </div>
            <input
              type="number"
              name="minWithdrawal"
              value={formData.minWithdrawal}
              onChange={handleChange}
              className="input-field pl-10 w-full"
              placeholder="e.g., 1000"
              min="0"
              step="100"
            />
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialSettings;
