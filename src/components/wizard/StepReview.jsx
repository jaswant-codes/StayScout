import React from 'react';
import { Edit2, CheckCircle, MapPin, DollarSign, Home, Image as ImageIcon, Check } from 'lucide-react';

const StepReview = ({ form, setStep }) => {
  
  const SectionHeader = ({ title, stepIndex, icon: Icon }) => (
    <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Icon className="w-5 h-5 text-accent-500" />
        {title}
      </h3>
      <button 
        type="button"
        onClick={() => setStep(stepIndex)}
        className="text-sm flex items-center gap-1 text-accent-400 hover:text-accent-300 transition-colors"
      >
        <Edit2 className="w-3 h-3" />
        Edit
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-success" />
          Review Details
        </h2>
        <p className="text-text-muted">
          Please review all the information before submitting your property.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basics Section */}
        <div className="card p-5 bg-dark-800 border border-border rounded-xl">
          <SectionHeader title="Basic Information" stepIndex={0} icon={Home} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted block mb-1">Property Title</span>
              <span className="text-white font-medium">{form.title || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">Property Type</span>
              <span className="text-white font-medium capitalize">{form.type || 'Not provided'}</span>
            </div>
            <div className="col-span-1 md:col-span-2">
              <span className="text-text-muted block mb-1">Description</span>
              <span className="text-white line-clamp-3">{form.description || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="card p-5 bg-dark-800 border border-border rounded-xl">
          <SectionHeader title="Location" stepIndex={1} icon={MapPin} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="col-span-1 md:col-span-2">
              <span className="text-text-muted block mb-1">Address Line 1</span>
              <span className="text-white font-medium">{form.address || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">City</span>
              <span className="text-white font-medium">{form.city || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">State / Region</span>
              <span className="text-white font-medium">{form.state || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">Zip / Postal Code</span>
              <span className="text-white font-medium">{form.zip || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">Country</span>
              <span className="text-white font-medium">{form.country || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="card p-5 bg-dark-800 border border-border rounded-xl">
          <SectionHeader title="Pricing" stepIndex={2} icon={DollarSign} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted block mb-1">Price per Night</span>
              <span className="text-white font-medium text-lg text-accent-400">
                ${form.price || '0'}
              </span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">Security Deposit</span>
              <span className="text-white font-medium">
                {form.securityDeposit ? `$${form.securityDeposit}` : 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Rooms & Amenities Section */}
        <div className="card p-5 bg-dark-800 border border-border rounded-xl">
          <SectionHeader title="Rooms & Amenities" stepIndex={3} icon={Check} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-5">
            <div>
              <span className="text-text-muted block mb-1">Bedrooms</span>
              <span className="text-white font-medium">{form.bedrooms || '0'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">Bathrooms</span>
              <span className="text-white font-medium">{form.bathrooms || '0'}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">Max Guests</span>
              <span className="text-white font-medium">{form.guests || '0'}</span>
            </div>
          </div>
          <div>
            <span className="text-text-muted block mb-2 text-sm">Amenities</span>
            {form.amenities && form.amenities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {form.amenities.map((amenity, idx) => (
                  <span key={idx} className="tag tag-active text-xs">
                    {amenity}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-white text-sm">No amenities selected</span>
            )}
          </div>
        </div>

        {/* Media Section */}
        <div className="card p-5 bg-dark-800 border border-border rounded-xl">
          <SectionHeader title="Media" stepIndex={4} icon={ImageIcon} />
          {form.images && form.images.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {form.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border bg-dark-700"
                >
                  <img 
                    src={img} 
                    alt={`Upload ${idx}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">No images uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepReview;
