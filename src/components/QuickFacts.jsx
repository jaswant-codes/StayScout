import { IndianRupee, Shield, Wrench, Coins, Bed, Bath, Utensils, Car, Calendar, CalendarCheck } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function QuickFacts({ property }) {
  if (!property) return null;

  const facts = [
    {
      label: 'Monthly Rent',
      value: property.rent ? formatCurrency(property.rent) : 'Contact Owner',
      icon: IndianRupee,
      highlight: true
    },
    {
      label: 'Security Deposit',
      value: property.deposit ? formatCurrency(property.deposit) : '1 Month Rent',
      icon: Shield,
    },
    {
      label: 'Maintenance',
      value: property.maintenance ? formatCurrency(property.maintenance) : 'Included',
      icon: Wrench,
    },
    {
      label: 'Brokerage',
      value: property.brokerage ? formatCurrency(property.brokerage) : 'No Brokerage',
      icon: Coins,
      highlight: !property.brokerage
    },
    {
      label: 'Room Type',
      value: property.roomType || 'Private/Shared',
      icon: Bed,
    },
    {
      label: 'Bathrooms',
      value: property.bathrooms || 'Attached',
      icon: Bath,
    },
    {
      label: 'Food Included',
      value: property.foodIncluded ? 'Yes (3 Meals)' : 'No',
      icon: Utensils,
    },
    {
      label: 'Parking',
      value: property.parking ? 'Two/Four Wheeler' : 'None',
      icon: Car,
    },
    {
      label: 'Availability',
      value: property.availability || 'Available Now',
      icon: Calendar,
      highlight: property.availability?.toLowerCase() === 'available now'
    },
    {
      label: 'Move-in Date',
      value: property.moveInDate ? formatDate(property.moveInDate) : 'Immediately',
      icon: CalendarCheck,
    }
  ];

  return (
    <div className="bg-dark-800 rounded-2xl p-6 border border-border glass-strong shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        Quick Facts
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {facts.map((fact, idx) => {
          const Icon = fact.icon;
          return (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex flex-col justify-center items-start gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                fact.highlight 
                  ? 'bg-accent-500/10 border-accent-500/30' 
                  : 'bg-dark-900/50 border-white/5 hover:border-white/10'
              }`}
            >
              <div className={`p-2 rounded-lg ${fact.highlight ? 'bg-accent-500/20 text-accent-400' : 'bg-dark-800 text-text-muted'}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted mb-1">{fact.label}</p>
                <p className={`text-sm font-bold ${fact.highlight ? 'text-white' : 'text-text-primary'}`}>
                  {fact.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
