import { 
  Wifi, Shield, Tv, Wind, Coffee, Dumbbell, 
  Car, Train, WashingMachine, Utensils, 
  ThermometerSun, Droplets, Check,
  Book, Zap, Building, BookOpen, Trash2, Home
} from 'lucide-react';

// The master list of all potential amenities in the system
const MASTER_AMENITIES = [
  'WiFi',
  'AC',
  'Laundry',
  'Parking',
  'Lift',
  'Power Backup',
  'Gym',
  'Kitchen',
  'Mess',
  'Housekeeping',
  'Study Table',
  'RO Water',
  'Washing Machine',
  'Refrigerator',
  'Attached Bathroom',
  'Balcony'
];

const iconMap = {
  'WiFi': Wifi,
  'Security': Shield,
  'TV': Tv,
  'AC': Wind,
  'Cafe': Coffee,
  'Gym': Dumbbell,
  'Parking': Car,
  'Metro': Train,
  'Laundry': WashingMachine,
  'Kitchen': Utensils,
  'Heater': ThermometerSun,
  'RO Water': Droplets,
  'Lift': Building,
  'Power Backup': Zap,
  'Mess': Utensils,
  'Housekeeping': Trash2,
  'Study Table': BookOpen,
  'Washing Machine': WashingMachine,
  'Refrigerator': Home,
  'Attached Bathroom': Droplets,
  'Balcony': Home
};

export default function AmenitiesSection({ facilities = [] }) {
  return (
    <div className="bg-dark-800 rounded-3xl p-6 sm:p-8 border border-border">
      <h3 className="text-xl font-bold text-text-primary mb-6">What this place offers</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
        {MASTER_AMENITIES.map((facility, index) => {
          const Icon = iconMap[facility] || Check;
          const isAvailable = facilities.includes(facility);
          
          return (
            <div 
              key={index} 
              className={`flex items-center gap-3 group relative ${
                isAvailable ? 'text-text-primary' : 'text-text-muted opacity-50'
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all ${
                isAvailable 
                  ? 'bg-dark-700 text-accent-500 group-hover:bg-accent-500/10 group-hover:scale-110' 
                  : 'bg-dark-700/50 text-text-muted'
              }`}>
                <Icon size={20} />
              </div>
              <span className={`font-medium ${
                isAvailable ? 'group-hover:text-white transition-colors' : ''
              }`}>
                {facility}
              </span>

              {/* Tooltip for unavailable */}
              {!isAvailable && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark-600 text-xs text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                  Not Available
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
