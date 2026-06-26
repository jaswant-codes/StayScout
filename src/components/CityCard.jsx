import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function CityCard({ city }) {
  return (
    <Link
      to="/login"
      className="group relative h-48 md:h-64 rounded-[1.5rem] overflow-hidden shadow-xl shadow-black/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-500/20 transition-all duration-500 block ring-1 ring-white/5"
    >
      <div className="absolute inset-0 bg-dark-900">
        <img 
          src={city.image || 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&q=80'} 
          alt={city.city}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80'; }}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex flex-col justify-end transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center gap-2 mb-1.5">
          <MapPin size={18} className="text-accent-400 group-hover:text-accent-500 transition-colors" />
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">
            {city.city}
          </h3>
        </div>
        <p className="text-sm text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {city.count} {city.count === 1 ? 'Property' : 'Properties'}
        </p>
        <p className="text-xs text-accent-200 mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
          Avg. ₹{city.avgRent?.toLocaleString('en-IN') || '10,000'}/mo
        </p>
      </div>
    </Link>
  );
}
