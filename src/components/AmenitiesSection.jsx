import { 
  Wifi, Shield, Tv, Wind, Coffee, Dumbbell, 
  Car, Train, WashingMachine, Utensils, 
  ThermometerSun, Droplets, Check
} from 'lucide-react';

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
  'Water Purifier': Droplets
};

export default function AmenitiesSection({ facilities = [] }) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <div className="bg-dark-800 rounded-3xl p-6 sm:p-8 border border-border">
      <h3 className="text-xl font-bold text-text-primary mb-6">What this place offers</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
        {facilities.map((facility, index) => {
          const Icon = iconMap[facility] || Check;
          
          return (
            <div key={index} className="flex items-center gap-3 text-text-secondary group">
              <div className="p-2.5 rounded-xl bg-dark-700 text-accent-500 group-hover:bg-accent-500/10 group-hover:scale-110 transition-all">
                <Icon size={20} />
              </div>
              <span className="font-medium group-hover:text-text-primary transition-colors">{facility}</span>
            </div>
          );
        })}
      </div>

      {facilities.length > 6 && (
        <button className="mt-8 btn-secondary w-full sm:w-auto px-6">
          Show all {facilities.length} amenities
        </button>
      )}
    </div>
  );
}
