import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProperties, useFeaturedProperties } from '../hooks/useProperties';
import { useDebounce } from '../hooks/useDebounce';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import SkeletonCard from '../components/SkeletonCard';
import HeroSkeleton from '../components/HeroSkeleton';
import CityCard from '../components/CityCard';
import Loader from '../components/Loader';
import CustomDropdown from '../components/CustomDropdown';
import indianCities from '../data/indianCities.json';
import {
  Search,
  Shield,
  ArrowRight,
  GraduationCap,
  Building2,
  MapPin,
  Star,
  Users,
  CheckCircle,
  ChevronDown,
  Calendar,
  IndianRupee,
} from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'P.K.',
    college: 'Delhi University',
    text: 'Found a great PG near North Campus within 2 days. The reviews were spot on, and the owner is super helpful!',
    rating: 5,
    year: '2023'
  },
  {
    id: 2,
    name: 'R.M.',
    college: 'IIT Bombay',
    text: 'The community chat feature is a lifesaver. I connected with my future roommate before even moving in.',
    rating: 5,
    year: '2024'
  },
  {
    id: 3,
    name: 'S.P.',
    college: 'NIFT Bangalore',
    text: 'StayScout is the only platform I trust. No fake photos or hidden charges. Exactly what students need.',
    rating: 4,
    year: '2023'
  },
];

const FAQS = [
  {
    question: 'How do I know the properties and reviews are genuine?',
    answer: 'All our properties are verified, and reviews can only be posted by students who have actually lived there. We strictly monitor for fake listings.',
  },
  {
    question: 'Is StayScout free for students?',
    answer: 'Yes! StayScout is completely free for students to browse properties, read reviews, and connect with owners.',
  },
  {
    question: 'How do I contact the property owner?',
    answer: 'Once you sign up as a student, you can view the contact details of the owner on the property listing page or use the community chat.',
  },
  {
    question: 'Can owners list multiple properties?',
    answer: 'Yes, owners can list and manage multiple properties from their Owner Dashboard with ease. Best part? Your first property listing is completely free!',
  },
];

const TRUSTED_COLLEGES = [
  "IIT", "NIT", "Delhi University", "Galgotias", 
  "Amity", "BITS", "VIT", "SRM"
];

export default function Home() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    location: '',
    minBudget: '',
    maxBudget: '',
    facilities: [],
    propertyType: 'all',
  });

  const { properties, loading: propertiesLoading } = useProperties(filters);
  const { featured, recent, topRated, popularCities, stats, loading: featuredLoading } = useFeaturedProperties();

  const [faqOpen, setFaqOpen] = useState(null);
  
  const [heroLocation, setHeroLocation] = useState('');
  const [heroType, setHeroType] = useState('');
  const [heroBudget, setHeroBudget] = useState('');
  const [heroGender, setHeroGender] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchBarRef = useRef(null);
  
  const debouncedLocation = useDebounce(heroLocation, 300);
  
  // Extend mock locations with the user's requested examples
  const EXTENDED_LOCATIONS = [
    ...indianCities.map(c => c.name),
    "Greater Noida", "Ghaziabad", "Goa", "New Delhi", "South Delhi", "North Delhi",
    "Knowledge Park", "Sector 62", "Amity University", "IIT Delhi", "Botanical Garden Metro"
  ];
  
  const suggestions = EXTENDED_LOCATIONS
    .filter(name => name.toLowerCase().includes(debouncedLocation.toLowerCase()))
    .slice(0, 8);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === 'ArrowDown') setShowSuggestions(true);
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
          setHeroLocation(suggestions[focusedIndex]);
          setShowSuggestions(false);
          setFocusedIndex(-1);
        } else if (heroLocation) {
          handleHeroSearch(e);
        }
        break;
      case 'Escape':
      case 'Tab':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (!heroLocation.trim()) {
      alert("Please select a city or locality.");
      return;
    }
    
    const formData = new FormData(e.target);
    const loc = formData.get('location') || heroLocation;
    const type = formData.get('type') || heroType;
    const budget = formData.get('budget') || heroBudget;
    const preference = formData.get('gender') || heroGender;
    const moveIn = formData.get('moveIn') || '';
    
    const params = new URLSearchParams({
      location: loc,
      type: type,
      budget: budget,
      preference: preference,
      moveIn: moveIn
    });
    
    navigate(`/search?${params.toString()}`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  // ──────────────────────────────────────────
  // NOT LOGGED IN → Landing Page
  // ──────────────────────────────────────────
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-36 sm:pb-24">
          {/* Subtle Abstract Background */}
          <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none" 
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83-54.627 54.627-.83-.83L54.627 0zM29.627 0l.83.83-29.627 29.627-.83-.83L29.627 0zM59.627 30l.83.83-29.627 29.627-.83-.83L59.627 30z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}>
          </div>
          
          <div className="glow-orb w-[800px] h-[800px] bg-accent-500/80 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[120px] z-0 opacity-40" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {featuredLoading ? (
              <HeroSkeleton />
            ) : (
              <div className="text-center max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6 animate-fade-in">
                  <Shield size={14} />
                  India's Trusted Stay Marketplace
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-none tracking-tight animate-fade-in">
                  Find verified PGs, Hostels
                  <br />
                  <span className="gradient-text">& Co-living Spaces</span>
                </h1>

                <p className="text-lg md:text-xl text-text-primary/80 mb-10 max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.1s' }}>
                  Discover verified PGs, hostels, co-living spaces and rental accommodations with genuine reviews, transparent pricing and zero brokerage.
                </p>

                {/* Expanded Hero Search Box */}
                <form onSubmit={handleHeroSearch} ref={searchBarRef} className="w-full max-w-[1400px] mx-auto bg-[#1a1d27]/90 backdrop-blur-xl border border-border rounded-2xl p-2 sm:p-3 shadow-2xl animate-fade-in mb-6 relative" style={{ animationDelay: '0.2s' }}>
                  <div className="flex flex-col md:flex-row gap-3 w-full">
                    {/* Location with Autocomplete */}
                    <div className="md:w-[35%] relative flex items-center bg-[#0f1117]/50 rounded-xl h-14 focus-within:ring-2 focus-within:ring-accent-500 transition-shadow">
                      <MapPin size={20} className="absolute left-4 text-text-muted" />
                      <input
                        type="text"
                        name="location"
                        value={heroLocation}
                        onChange={(e) => {
                          setHeroLocation(e.target.value);
                          setShowSuggestions(true);
                          setFocusedIndex(-1);
                        }}
                        onKeyDown={handleLocationKeyDown}
                        onFocus={() => {
                          setShowSuggestions(true);
                          setFocusedIndex(-1);
                        }}
                        placeholder="Search city, locality or college"
                        className="w-full h-full bg-transparent border-none focus:ring-0 text-text-primary pl-12 pr-4 placeholder:text-text-secondary placeholder:font-normal font-medium"
                        autoComplete="off"
                      />
                      {/* Autocomplete Dropdown */}
                      {showSuggestions && debouncedLocation && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-border rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50 py-2">
                          {suggestions.length > 0 ? (
                            suggestions.map((city, idx) => (
                              <button
                                key={idx}
                                type="button"
                                className={`w-full text-left px-4 py-3 text-text-primary transition-colors flex items-center gap-2 font-medium ${focusedIndex === idx ? 'bg-dark-700 text-accent-400' : 'hover:bg-dark-700'}`}
                                onClick={() => {
                                  setHeroLocation(city);
                                  setShowSuggestions(false);
                                }}
                                onMouseEnter={() => setFocusedIndex(idx)}
                              >
                                <MapPin size={14} className="text-text-muted" /> {city}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-4 text-center text-text-secondary text-sm">
                              No locations found.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Property Type */}
                    <CustomDropdown 
                      name="type"
                      icon={Building2}
                      className="md:w-[15%] bg-[#0f1117]/50 rounded-xl h-14"
                      value={heroType}
                      onChange={setHeroType}
                      placeholder="Property Type"
                      options={[
                        { label: 'Select Property Type', value: '', disabled: true },
                        { divider: true },
                        { label: 'Any Property', value: 'all' },
                        { label: 'PG', value: 'pg' },
                        { label: 'Hostel', value: 'hostel' },
                        { label: 'Co-living', value: 'coliving' },
                        { label: 'Studio Apartment', value: 'studio' },
                        { label: '1 RK', value: '1rk' },
                        { label: '1 BHK', value: '1bhk' },
                        { label: '2 BHK', value: '2bhk' },
                        { label: 'Flat', value: 'flat' },
                        { label: 'Shared Flat', value: 'shared_flat' },
                        { label: 'Private Room', value: 'private_room' },
                        { label: 'Dormitory', value: 'dormitory' },
                      ]}
                    />

                    {/* Budget */}
                    <CustomDropdown 
                      name="budget"
                      icon={IndianRupee}
                      className="md:w-[15%] bg-[#0f1117]/50 rounded-xl h-14"
                      value={heroBudget}
                      onChange={setHeroBudget}
                      placeholder="Budget"
                      options={[
                        { label: 'Select Budget', value: '', disabled: true },
                        { divider: true },
                        { label: 'Any Budget', value: 'all' },
                        { label: 'Below ₹5,000', value: '5000' },
                        { label: '₹5,000 – ₹8,000', value: '8000' },
                        { label: '₹8,000 – ₹10,000', value: '10000' },
                        { label: '₹10,000 – ₹15,000', value: '15000' },
                        { label: '₹15,000 – ₹20,000', value: '20000' },
                        { label: '₹20,000 – ₹30,000', value: '30000' },
                        { label: '₹30,000 – ₹50,000', value: '50000' },
                        { label: 'Above ₹50,000', value: '50000_plus' },
                      ]}
                    />

                    {/* Preference */}
                    <CustomDropdown 
                      name="gender"
                      icon={Users}
                      className="md:w-[12%] bg-[#0f1117]/50 rounded-xl hidden lg:block h-14"
                      value={heroGender}
                      onChange={setHeroGender}
                      placeholder="Preference"
                      options={[
                        { label: 'Select Preference', value: '', disabled: true },
                        { divider: true },
                        { label: 'Any', value: 'all' },
                        { label: 'Boys', value: 'boys' },
                        { label: 'Girls', value: 'girls' },
                        { label: 'Co-ed', value: 'coed' },
                      ]}
                    />

                    {/* Move-in Date */}
                    <div className="md:w-[15%] relative flex items-center bg-[#0f1117]/50 rounded-xl hidden xl:flex h-14 focus-within:ring-2 focus-within:ring-accent-500 transition-shadow">
                      <Calendar size={20} className="absolute left-4 text-text-muted pointer-events-none" />
                      <input
                        type="date"
                        name="moveIn"
                        title="Move-in Date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-full bg-transparent border-none focus:ring-0 text-text-primary pl-12 pr-4 appearance-none cursor-pointer font-medium"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>

                    <button type="submit" className="btn-primary h-14 px-8 rounded-xl justify-center text-base w-full md:w-[8%] min-w-[140px] font-semibold">
                      <Search size={18} />
                      <span>Search</span>
                    </button>
                  </div>
                </form>

                {/* Trust Strip */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-text-secondary animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="fill-accent-400 text-accent-400" /> Highly Rated
                  </div>
                  <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Verified Listings</div>
                  <div className="flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Zero Brokerage</div>
                  <div className="flex items-center gap-2 hidden sm:flex"><CheckCircle size={18} className="text-green-400" /> Genuine Reviews</div>
                  <div className="flex items-center gap-2"><Shield size={18} className="text-green-400" /> Safe & Secure</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Statistics - Only render if totalProperties > 0 to avoid "0+" */}
        {stats && stats.totalProperties > 0 && (
          <section className="py-12 border-y border-border bg-dark-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border">
                <div>
                  <p className="text-3xl font-bold text-text-primary mb-1">{stats.totalStudents}</p>
                  <p className="text-sm text-text-muted font-medium uppercase tracking-wide">Happy Students</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-primary mb-1">{stats.totalProperties}</p>
                  <p className="text-sm text-text-muted font-medium uppercase tracking-wide">Verified Stays</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-primary mb-1">{stats.totalCities}</p>
                  <p className="text-sm text-text-muted font-medium uppercase tracking-wide">Cities Covered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-primary mb-1">{stats.avgRating}</p>
                  <p className="text-sm text-text-muted font-medium uppercase tracking-wide">Average Rating</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Properties */}
        <section className="py-20" id="featured">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-3">Featured Properties</h2>
                <p className="text-text-secondary max-w-2xl">Handpicked stays with the best reviews and top-notch facilities.</p>
              </div>
              <Link to="/login" className="btn-secondary whitespace-nowrap">
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {featuredLoading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              ) : featured.map((property) => (
                <div key={property.id} className="opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-20 bg-dark-800/20 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-3">Recently Added</h2>
                <p className="text-text-secondary max-w-2xl">Fresh properties just listed on StayScout.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {featuredLoading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              ) : recent.map((property) => (
                <div key={property.id} className="opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Rated */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-3">Top Rated Properties</h2>
                <p className="text-text-secondary max-w-2xl">The highest-rated accommodations loved by students.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {featuredLoading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              ) : topRated.map((property) => (
                <div key={property.id} className="opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-20 bg-dark-800/20 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-3">Popular Cities</h2>
            <p className="text-center text-text-secondary mb-12">Find the best student accommodations across India</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-48 md:h-64 skeleton rounded-2xl" />
                ))
              ) : popularCities.map((city, idx) => (
                <CityCard key={idx} city={city} />
              ))}
            </div>
          </div>
        </section>

        {/* Trusted by Students (Marquee) */}
        <section className="py-16 border-b border-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-widest">
              Used by students from
            </p>
          </div>
          <div className="marquee-container">
            <div className="marquee-content animate-marquee">
              {TRUSTED_COLLEGES.concat(TRUSTED_COLLEGES).map((college, idx) => (
                <div key={idx} className="flex items-center gap-2 px-6 py-3 glass rounded-full opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
                  <GraduationCap size={16} className="text-text-secondary" />
                  <span className="font-medium text-text-secondary">{college}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose StayScout */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Why Choose StayScout?</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">We're changing how students find their home away from home.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer hover:border-success/30 hover:shadow-lg hover:shadow-success/5">
                <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-success/20 transition-all duration-300">
                  <CheckCircle size={28} className="text-success" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Verified Listings</h3>
                <p className="text-text-secondary leading-relaxed">Every property is physically verified. No fake photos or misleading amenities.</p>
              </div>
              <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer hover:border-warning/30 hover:shadow-lg hover:shadow-warning/5">
                <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-warning/20 transition-all duration-300">
                  <Star size={28} className="text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Honest Reviews</h3>
                <p className="text-text-secondary leading-relaxed">Read authentic reviews from actual students who have lived there.</p>
              </div>
              <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/5">
                <div className="w-14 h-14 rounded-xl bg-accent-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-500/20 transition-all duration-300">
                  <Users size={28} className="text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Community Chat</h3>
                <p className="text-text-secondary leading-relaxed">Connect with future roommates and alumni before making a decision.</p>
              </div>
              <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group cursor-pointer hover:border-error/30 hover:shadow-lg hover:shadow-error/5">
                <div className="w-14 h-14 rounded-xl bg-error/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-error/20 transition-all duration-300">
                  <Building2 size={28} className="text-error" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Zero Brokerage</h3>
                <p className="text-text-secondary leading-relaxed">Connect directly with owners. No middlemen, no hidden fees.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-dark-800/30 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Join StayScout Today</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Choose your path and get started in minutes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-10 text-center hover:border-accent-500/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap size={32} className="text-accent-400" />
                </div>
                <h3 className="text-2xl font-semibold text-text-primary mb-3">I'm a Student</h3>
                <ul className="text-text-secondary mb-8 leading-relaxed text-left max-w-xs mx-auto space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Search verified stays</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Read genuine reviews</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Save favorites</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Chat with the community</li>
                </ul>
                <Link to="/signup" className="btn-primary w-full justify-center py-3">
                  Create Student Account <ArrowRight size={18} />
                </Link>
              </div>

              <div className="glass rounded-2xl p-10 text-center hover:border-accent-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-success/20 text-success text-xs font-bold px-3 py-1 rounded-full border border-success/30">
                  List your first property FREE
                </div>
                <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform mt-4">
                  <Building2 size={32} className="text-success" />
                </div>
                <h3 className="text-2xl font-semibold text-text-primary mb-3">I'm an Owner</h3>
                <ul className="text-text-secondary mb-8 leading-relaxed text-left max-w-xs mx-auto space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> List Property easily</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Get verified leads</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Manage bookings</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success" /> Build reputation</li>
                </ul>
                <Link to="/signup" className="btn-secondary w-full justify-center py-3">
                  Become a Partner <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Loved by Students</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="glass rounded-2xl p-8 relative">
                  <div className="absolute top-6 right-6 flex items-center gap-1 bg-success/10 text-success text-xs font-medium px-2 py-1 rounded-full">
                    <CheckCircle size={12} /> Verified
                  </div>
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < t.rating ? "text-warning fill-warning" : "text-dark-600"} />
                    ))}
                  </div>
                  <p className="text-text-primary text-lg mb-8 italic">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center font-bold text-lg border-2 border-border">
                      {t.name}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">Student</h4>
                      <p className="text-xs text-text-muted">{t.college} • Class of {t.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-dark-800/20 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = faqOpen === index;
                return (
                  <div key={index} className="faq-item">
                    <button
                      className="faq-toggle"
                      onClick={() => setFaqOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      {faq.question}
                      <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="faq-content-wrapper" aria-hidden={!isOpen}>
                      <div className="faq-content">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Action-Oriented Final CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-600/20 to-dark-900 z-0" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Stop wasting time visiting dozens of PGs.</h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Compare verified accommodations in minutes. Read genuine reviews. Move in with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="btn-primary px-8 py-4 text-base w-full sm:w-auto shadow-xl shadow-accent-500/20">
                Browse Properties
              </Link>
              <Link to="/signup" className="btn-secondary px-8 py-4 text-base w-full sm:w-auto">
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ──────────────────────────────────────────
  // LOGGED IN → Show property search & listing
  // ──────────────────────────────────────────
  return (
    <div id="properties-section">
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="glow-orb w-[600px] h-[600px] bg-accent-500/50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 animate-fade-in">
              Welcome back, <span className="gradient-text">{userProfile?.name || 'Student'}</span>
            </h1>
            <p className="text-text-secondary animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Explore properties and find your perfect student stay
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Explore Properties
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                {propertiesLoading ? 'Searching...' : `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} found`}
              </p>
            </div>
          </div>

          <FilterPanel filters={filters} onFilterChange={setFilters} />

          {propertiesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No properties found
              </h3>
              <p className="text-sm text-text-secondary">
                Try adjusting your filters or search for a different location.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
