import React from 'react';
import { 
  Wifi, Snowflake, Flame, Tv, WashingMachine, Zap, 
  Dumbbell, Waves, Users, Car, LayoutTemplate, 
  Camera, Shield, BellRing, Check, ShieldCheck
} from 'lucide-react';

const AMENITY_CATEGORIES = [
  {
    title: 'Basic Needs',
    icon: LayoutTemplate,
    items: [
      { id: 'wifi', label: 'High-speed WiFi', icon: Wifi },
      { id: 'ac', label: 'Air Conditioning', icon: Snowflake },
      { id: 'geyser', label: 'Geyser', icon: Flame },
      { id: 'tv', label: 'Television', icon: Tv },
      { id: 'washing_machine', label: 'Washing Machine', icon: WashingMachine },
      { id: 'power_backup', label: 'Power Backup', icon: Zap },
    ]
  },
  {
    title: 'Premium Amenities',
    icon: Dumbbell,
    items: [
      { id: 'gym', label: 'Fitness Center', icon: Dumbbell },
      { id: 'pool', label: 'Swimming Pool', icon: Waves },
      { id: 'club_house', label: 'Club House', icon: Users },
      { id: 'parking', label: 'Reserved Parking', icon: Car },
      { id: 'balcony', label: 'Private Balcony', icon: LayoutTemplate },
    ]
  },
  {
    title: 'Safety & Security',
    icon: ShieldCheck,
    items: [
      { id: 'cctv', label: 'CCTV Surveillance', icon: Camera },
      { id: 'security', label: '24/7 Security Guard', icon: Shield },
      { id: 'fire_alarm', label: 'Fire Alarm System', icon: BellRing },
    ]
  }
];

export default function StepAmenities({ form, updateForm }) {
  const facilities = form.facilities || [];

  const toggleFacility = (facilityId) => {
    const newFacilities = facilities.includes(facilityId)
      ? facilities.filter(id => id !== facilityId)
      : [...facilities, facilityId];
    updateForm({ facilities: newFacilities });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white">Amenities & Facilities</h2>
        <p className="text-text-muted mt-1">Select the amenities available at your property to attract more tenants.</p>
      </div>

      <div className="space-y-8">
        {AMENITY_CATEGORIES.map((category) => (
          <div key={category.title} className="bg-dark-800 border border-border rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-border pb-3">
              <category.icon className="w-5 h-5 text-accent-500" />
              {category.title}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.items.map((item) => {
                const isSelected = facilities.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFacility(item.id)}
                    className={`
                      relative p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-200 group
                      ${isSelected 
                        ? 'bg-accent-500/10 border-accent-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.15)]' 
                        : 'bg-dark-900 border-border text-text-secondary hover:border-accent-500/50 hover:bg-dark-800'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <item.icon className={`w-8 h-8 ${isSelected ? 'text-accent-400' : 'text-text-muted group-hover:text-text-secondary transition-colors'}`} />
                    <span className="text-sm font-medium text-center">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
