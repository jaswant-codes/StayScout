import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWizard } from '../hooks/useWizard';
import { useDraft } from '../hooks/useDraft';
import { addProperty, uploadPropertyImages } from '../hooks/useProperties';

// Layout
import WizardSidebar from '../components/wizard/WizardSidebar';
import WizardHeader from '../components/wizard/WizardHeader';
import WizardFooter from '../components/wizard/WizardFooter';

// Steps
import StepBasics from '../components/wizard/StepBasics';
import StepLocation from '../components/wizard/StepLocation';
import StepPricing from '../components/wizard/StepPricing';
import StepRooms from '../components/wizard/StepRooms';
import StepAmenities from '../components/wizard/StepAmenities';
import StepRules from '../components/wizard/StepRules';
import StepMedia from '../components/wizard/StepMedia';
import StepReview from '../components/wizard/StepReview';

export default function AddProperty() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  
  const { 
    currentStepIndex, currentStep, isFirstStep, isLastStep, 
    nextStep, prevStep, setStep, progress, steps 
  } = useWizard();

  const { form, updateForm, saveDraft, clearDraft, lastSaved, isSaving } = useDraft();
  
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');

  // Validate if current step is complete to allow moving next
  const isNextDisabled = useMemo(() => {
    switch (currentStep.id) {
      case 'basics':
        return !form.name || !form.propertyType || !form.summary;
      case 'location':
        return !form.city || !form.address;
      case 'pricing':
        return !form.rent;
      case 'rooms':
        return form.rooms.length === 0;
      case 'media':
        return form.images.length === 0;
      default:
        return false;
    }
  }, [currentStep.id, form]);

  const handleNext = () => {
    if (!isLastStep) {
      nextStep();
    } else {
      handlePublish();
    }
  };

  const handlePublish = async () => {
    if (isNextDisabled) {
      setError('Please complete all required fields.');
      return;
    }

    setPublishing(true);
    setError('');

    try {
      let imageUrls = form.images; // Default assuming already uploaded URLs if mocked
      
      // If we have raw File objects (base64 or actual files from the ImageUploader)
      // We would upload them here via uploadPropertyImages
      // For this implementation, we assume StepMedia handles the payload appropriately
      
      await addProperty({
        ...form,
        rent: Number(form.rent),
        ownerId: user.uid,
        ownerName: userProfile.name,
      });

      clearDraft();
      navigate('/owner/dashboard');
    } catch (err) {
      console.error('Error publishing property:', err);
      setError(err.message || 'Failed to publish property.');
      setPublishing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case 'basics': return <StepBasics form={form} updateForm={updateForm} />;
      case 'location': return <StepLocation form={form} updateForm={updateForm} />;
      case 'pricing': return <StepPricing form={form} updateForm={updateForm} />;
      case 'rooms': return <StepRooms form={form} updateForm={updateForm} />;
      case 'amenities': return <StepAmenities form={form} updateForm={updateForm} />;
      case 'rules': return <StepRules form={form} updateForm={updateForm} />;
      case 'media': return <StepMedia form={form} updateForm={updateForm} />;
      case 'review': return <StepReview form={form} setStep={setStep} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col md:flex-row pb-24 md:pb-0">
      
      {/* Desktop Sidebar */}
      <WizardSidebar 
        steps={steps} 
        currentStepIndex={currentStepIndex} 
        progress={progress} 
      />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <WizardHeader 
          steps={steps} 
          currentStepIndex={currentStepIndex} 
          progress={progress} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error text-error text-sm font-medium">
                {error}
              </div>
            )}
            {renderStep()}
          </div>
        </main>

        {/* Sticky Footer */}
        <WizardFooter 
          onNext={handleNext}
          onBack={prevStep}
          onSaveDraft={saveDraft}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isNextDisabled={isNextDisabled || publishing}
          lastSaved={lastSaved}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
