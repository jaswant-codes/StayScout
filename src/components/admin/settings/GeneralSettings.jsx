import React, { useState, useEffect } from 'react';
import { Save, Globe, Mail, Phone, FileText } from 'lucide-react';

const GeneralSettings = ({ settings, onChange }) => {
  const [formData, setFormData] = useState({
    platformName: settings?.platformName || '',
    supportEmail: settings?.supportEmail || '',
    supportPhone: settings?.supportPhone || '',
    platformDescription: settings?.platformDescription || ''
  });

  // Update local state if settings prop changes
  useEffect(() => {
    if (settings) {
      setFormData({
        platformName: settings.platformName || '',
        supportEmail: settings.supportEmail || '',
        supportPhone: settings.supportPhone || '',
        platformDescription: settings.platformDescription || ''
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
    <div className="glass rounded-2xl p-6 border-border animate-fade-in">
      <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="platformName" className="block text-sm font-medium text-text-secondary mb-2">
            Platform Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-text-muted" />
            </div>
            <input
              type="text"
              id="platformName"
              name="platformName"
              value={formData.platformName}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="e.g. StayScout"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="supportEmail" className="block text-sm font-medium text-text-secondary mb-2">
              Support Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-text-muted" />
              </div>
              <input
                type="email"
                id="supportEmail"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="support@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="supportPhone" className="block text-sm font-medium text-text-secondary mb-2">
              Support Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-text-muted" />
              </div>
              <input
                type="text"
                id="supportPhone"
                name="supportPhone"
                value={formData.supportPhone}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="platformDescription" className="block text-sm font-medium text-text-secondary mb-2">
            Platform Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FileText className="h-5 w-5 text-text-muted" />
            </div>
            <textarea
              id="platformDescription"
              name="platformDescription"
              value={formData.platformDescription}
              onChange={handleChange}
              rows={4}
              className="input-field pl-10 py-3"
              placeholder="Brief description of the platform..."
            />
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button type="submit" className="btn-primary">
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
