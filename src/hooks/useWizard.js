import { useState, useCallback } from 'react';

export const WIZARD_STEPS = [
  { id: 'basics', title: 'Property Basics' },
  { id: 'location', title: 'Location' },
  { id: 'pricing', title: 'Pricing' },
  { id: 'rooms', title: 'Room Details' },
  { id: 'amenities', title: 'Amenities' },
  { id: 'rules', title: 'House Rules' },
  { id: 'media', title: 'Media & Photos' },
  { id: 'review', title: 'Review & Publish' },
];

export function useWizard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, WIZARD_STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setStep = useCallback((index) => {
    if (index >= 0 && index < WIZARD_STEPS.length) {
      setCurrentStepIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const progress = Math.round(((currentStepIndex) / (WIZARD_STEPS.length - 1)) * 100);

  return {
    currentStepIndex,
    currentStep: WIZARD_STEPS[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === WIZARD_STEPS.length - 1,
    nextStep,
    prevStep,
    setStep,
    progress,
    totalSteps: WIZARD_STEPS.length,
    steps: WIZARD_STEPS
  };
}
