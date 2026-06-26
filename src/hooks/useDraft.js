import { useState, useEffect, useCallback, useRef } from 'react';

const DRAFT_KEY = 'stayscout_property_draft';

const DEFAULT_FORM_STATE = {
  // Basics
  name: '',
  propertyType: 'PG',
  accommodationType: 'Any',
  summary: '',
  description: '',
  // Location
  country: 'India',
  state: '',
  city: '',
  locality: '',
  address: '',
  pinCode: '',
  lat: null,
  lng: null,
  // Pricing
  rent: '',
  deposit: '',
  maintenance: '',
  electricity: 'As per usage',
  water: 'Included',
  brokerage: '',
  // Rooms
  rooms: [],
  // Amenities
  facilities: [],
  // Rules
  rules: {
    visitors: 'Allowed',
    smoking: 'Strictly Prohibited',
    alcohol: 'Strictly Prohibited',
    pets: 'Not Allowed',
    curfew: '10:00 PM',
  },
  // Media
  images: [],
};

export function useDraft() {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        return { ...DEFAULT_FORM_STATE, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
    return DEFAULT_FORM_STATE;
  });

  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // We use a ref to track the latest form state inside the autosave interval
  const formRef = useRef(form);
  formRef.current = form;

  const saveDraft = useCallback(() => {
    setIsSaving(true);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formRef.current));
    setLastSaved(new Date());
    setTimeout(() => setIsSaving(false), 500); // UI feedback
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
    setForm(DEFAULT_FORM_STATE);
  }, []);

  // Autosave every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 5000);
    return () => clearInterval(interval);
  }, [saveDraft]);

  const updateForm = useCallback((updates) => {
    setForm(prev => ({ ...prev, ...updates }));
  }, []);

  return { form, updateForm, saveDraft, clearDraft, lastSaved, isSaving };
}
