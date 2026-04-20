import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import Loader from '../components/Loader';
import { Search, TrendingUp, Shield, MessageCircle, ArrowRight, GraduationCap, Building2 } from 'lucide-react';

export default function Home() {
  const { user, userProfile, loading: authLoading } = useAuth();

  const [filters, setFilters] = useState({
    location: '',
    minBudget: '',
    maxBudget: '',
    facilities: [],
  });

  const { properties, loading } = useProperties(filters);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  // If NOT logged in → show landing page (no search bar, no properties)
  if (!user) {
    return (
      <div>
        {/* Hero Section for unauthenticated users */}
        <section className="relative overflow-hidden py-24 sm:py-36">
          {/* Background decorations */}
          <div className="glow-orb w-[800px] h-[800px] bg-accent-500/80 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[120px]" />
          <div className="glow-orb w-96 h-96 bg-accent-600/60 bottom-0 right-0 blur-[100px]" />
          <div className="glow-orb w-80 h-80 bg-accent-400/60 bottom-20 left-10 blur-[100px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6 animate-fade-in">
                <Shield size={14} />
                Trust-first accommodation platform
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-none tracking-tight animate-fade-in">
                Find your perfect
                <br />
                <span className="gradient-text">student stay</span>
              </h1>

              <p className="text-lg md:text-xl text-text-primary/80 mb-10 max-w-xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.1s' }}>
                Discover PGs and hostels backed by honest student reviews.
                No fake listings. No surprises. Just trust.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Link to="/signup" className="btn-primary text-base px-8 py-3.5 shadow-lg shadow-accent-500/25">
                  Get Started Free
                  <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
                  Sign in
                </Link>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-strong shadow-lg focus-within:scale-105 transition-transform cursor-default">
                  <Search size={16} className="text-accent-400" />
                  <span className="font-medium text-text-primary/90">Smart search</span>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-strong shadow-lg focus-within:scale-105 transition-transform cursor-default">
                  <TrendingUp size={16} className="text-success" />
                  <span className="font-medium text-text-primary/90">Verified reviews</span>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-strong shadow-lg focus-within:scale-105 transition-transform cursor-default">
                  <MessageCircle size={16} className="text-warning" />
                  <span className="font-medium text-text-primary/90">Community chat</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-text-primary mb-4">
              How it works
            </h2>
            <p className="text-center text-text-secondary mb-12 max-w-lg mx-auto">
              Whether you're a student looking for a stay or an owner listing a property — StayScout makes it simple.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto stagger-children">
              {/* Student Card */}
              <div className="glass rounded-2xl p-8 text-center hover:border-accent-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-accent-500/15 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={28} className="text-accent-400" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">I'm a Student</h3>
                <p className="text-sm text-text-secondary mb-6">
                  Browse properties, read real reviews from students, chat with the community, and find your perfect stay.
                </p>
                <Link to="/signup" className="btn-primary text-sm">
                  Sign up as Student <ArrowRight size={14} />
                </Link>
              </div>

              {/* Owner Card */}
              <div className="glass rounded-2xl p-8 text-center hover:border-accent-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-success/15 flex items-center justify-center mx-auto mb-4">
                  <Building2 size={28} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">I'm an Owner</h3>
                <p className="text-sm text-text-secondary mb-6">
                  List your PG or hostel, upload photos, manage availability, and connect with students looking for rooms.
                </p>
                <Link to="/signup" className="btn-secondary text-sm">
                  Sign up as Owner <ArrowRight size={14} />
                </Link>
              </div>
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
    <div>
      {/* Header */}
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

      {/* Properties Section */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Explore Properties
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
          </div>

          {/* Filters */}
          <FilterPanel filters={filters} onFilterChange={setFilters} />

          {/* Grid */}
          {loading ? (
            <Loader text="Loading properties..." />
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
