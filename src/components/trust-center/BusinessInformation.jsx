import React, { useState } from 'react';
import { Building2, Loader2, Save } from 'lucide-react';

export default function BusinessInformation({ profile, updateProfile, isSaving }) {
  const [formData, setFormData] = useState({
    businessName: profile?.businessName || '',
    businessType: profile?.businessType || 'individual',
    description: profile?.description || '',
    yearsInBusiness: profile?.yearsInBusiness || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile(formData);
    }
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-accent-500" />
          Business Information
        </h2>
        <p className="text-text-muted mt-1 text-sm">
          Update your public profile and business details visible to guests.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-sm font-medium text-text-muted">
              Business Name (or Full Name)
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="e.g. Skyline Accommodations"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="businessType" className="block text-sm font-medium text-text-muted">
              Business Type
            </label>
            <div className="relative">
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="input-field w-full appearance-none pr-10"
              >
                <option value="individual" className="bg-dark-800 text-white">Individual / Sole Proprietor</option>
                <option value="company" className="bg-dark-800 text-white">Registered Company (LLC, Inc.)</option>
                <option value="property_manager" className="bg-dark-800 text-white">Property Management Firm</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-text-muted">
            Years in Business
          </label>
          <input
            type="number"
            id="yearsInBusiness"
            name="yearsInBusiness"
            value={formData.yearsInBusiness}
            onChange={handleChange}
            className="input-field w-full md:w-1/2"
            placeholder="e.g. 5"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-text-muted">
            Business Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field w-full resize-none"
            placeholder="Tell guests about your hosting experience, property standards, and what makes your stays unique..."
          ></textarea>
        </div>

        <div className="pt-5 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
