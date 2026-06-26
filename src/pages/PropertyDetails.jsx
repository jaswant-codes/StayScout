import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, firebaseInitialized } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../hooks/useReviews';
import { mockProperties } from '../hooks/useProperties';
import { formatCurrency } from '../utils/helpers';
import { useAnalytics } from '../hooks/useAnalytics';

import ImageGallery from '../components/ImageGallery';
import PropertySummary from '../components/PropertySummary';
import QuickFacts from '../components/QuickFacts';
import PricingBreakdown from '../components/PricingBreakdown';
import RoomOptions from '../components/RoomOptions';
import AmenitiesSection from '../components/AmenitiesSection';
import PropertyDescription from '../components/PropertyDescription';
import FoodSection from '../components/FoodSection';
import SafetySection from '../components/SafetySection';
import PropertyRules from '../components/PropertyRules';
import LocationSection from '../components/LocationSection';
import ReviewCards from '../components/ReviewCards';
import OwnerProfile from '../components/OwnerProfile';
import SimilarProperties from '../components/SimilarProperties';
import RecentlyViewedProperties from '../components/RecentlyViewedProperties';
import ContactOwnerCard from '../components/ContactOwnerCard';

import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import SkeletonCard from '../components/SkeletonCard';

import { ArrowLeft, SearchX, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { trackPropertyView } = useAnalytics();
  
  const { reviews, loading: reviewsLoading, avgRating } = useReviews(id);
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        // Find in mock data first
        const demoProp = mockProperties.find(p => p.id === id);
        if (demoProp) {
          setProperty(demoProp);
          trackPropertyView(demoProp.id, demoProp.name);
          
          let history = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          history = [demoProp.id, ...history.filter(h => h !== demoProp.id)].slice(0, 10);
          localStorage.setItem('recentlyViewed', JSON.stringify(history));
          setLoading(false);
          return;
        }

        if (!firebaseInitialized || !db) {
          setError('Property not found.');
          setLoading(false);
          return;
        }

        const docSnap = await getDoc(doc(db, 'properties', id));
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProperty(data);
          trackPropertyView(data.id, data.name);
        } else {
          setError('Property not found.');
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProperty();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, trackPropertyView]);

  const handleContactOwner = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (mockProperties.some(p => p.id === id)) {
      setShowDemoAlert(true);
      setTimeout(() => setShowDemoAlert(false), 3000);
      return;
    }
    
    navigate('/chat', { state: { propertyId: id, ownerId: property.ownerId } });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Loader text="Loading property..." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="hidden lg:block">
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState 
          icon={SearchX}
          title="Property Not Found"
          description="The property you are looking for might have been removed or is temporarily unavailable."
          actionLabel="Back to Search"
          actionLink="/search"
        />
      </div>
    );
  }

  const finalAvgRating = avgRating || property.avgRating;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-16 animate-fade-in">
      
      {/* 1. Impression & Viability */}
      <div className="mb-6">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Search
        </Link>
        
        <ImageGallery images={property.images} title={property.name} />
      </div>

      <PropertySummary property={{...property, avgRating: finalAvgRating}} />
      <div className="mt-8">
        <QuickFacts property={property} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 mt-12">
        {/* Left Column: The Deep Dive */}
        <div className="space-y-12">
          
          {/* 2. Affordability & Configurations */}
          <PricingBreakdown property={property} />
          
          {property.roomTypes && property.roomTypes.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Room Options</h2>
              <RoomOptions rooms={property.roomTypes} />
            </section>
          )}

          <hr className="border-border" />

          {/* 3. Deep Dive */}
          <AmenitiesSection facilities={property.facilities || []} />
          
          {property.food && (
            <>
              <hr className="border-border" />
              <FoodSection food={property.food} />
            </>
          )}

          {property.safety && (
            <>
              <hr className="border-border" />
              <SafetySection safety={property.safety} />
            </>
          )}

          {property.rules && (
            <>
              <hr className="border-border" />
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">House Rules</h2>
                <PropertyRules rules={property.rules} />
              </section>
            </>
          )}

          {property.description && (
            <>
              <hr className="border-border" />
              <PropertyDescription description={property.description} />
            </>
          )}

          <hr className="border-border" />

          {/* Location & Commute */}
          <LocationSection 
            location={property.location || `${property.area}, ${property.city}`}
            commute={property.commute || []}
            nearby={property.nearby || []}
          />

          <hr className="border-border" />

          {/* 4. Trust & Social Proof */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Guest Reviews</h2>
            </div>
            {/* Reviews Component updated by Subagent */}
            <ReviewCards 
              reviews={reviews || []} 
              loading={reviewsLoading} 
              propertyId={id} 
              user={user} 
              userProfile={userProfile}
              categoryRatings={property.categoryRatings}
              overallRating={finalAvgRating}
            />
          </section>

        </div>

        {/* Right Column: Decision & Conversion */}
        <div className="relative">
          <div className="sticky top-24 space-y-6">
            
            <ContactOwnerCard 
              property={property} 
              onContact={handleContactOwner} 
            />

            {/* About Owner Snippet */}
            {property.ownerDetails ? (
              <OwnerProfile owner={property.ownerDetails} />
            ) : (
              <div className="glass p-6 rounded-2xl border border-border">
                <h3 className="text-lg font-semibold text-white mb-4">Meet your host</h3>
                <div className="text-white font-medium">Owner ID: {property.ownerId.slice(0, 8)}</div>
                <div className="text-sm text-text-secondary flex items-center gap-1 mt-2">
                  <CheckCircle size={14} className="text-success" /> Verified Identity
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 p-4 bg-dark-700/50 rounded-xl text-sm text-text-secondary border border-border">
              <Info size={18} className="text-accent-500 flex-shrink-0 mt-0.5" />
              <p>StayScout secures your payment and protects your booking. Never transfer money directly outside the platform.</p>
            </div>

            {showDemoAlert && (
              <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 flex items-start gap-3 animate-fade-in">
                <AlertTriangle className="text-warning flex-shrink-0" size={20} />
                <p className="text-sm text-warning/90">
                  This is a functional demo property. Real messaging is disabled. Create your own property from the Owner Dashboard to test chat!
                </p>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Cross-Sell */}
      <div className="mt-20 pt-16 border-t border-border space-y-20">
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">More properties in {property.city}</h2>
          <SimilarProperties 
            currentPropertyId={id} 
            propertyType={property.propertyType} 
            city={property.city} 
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Recently viewed</h2>
          <RecentlyViewedProperties />
        </section>
      </div>

      {/* Mobile Fixed Contact Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-dark-800 border-t border-border z-40 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom,16px)]">
        <div>
          <div className="text-white font-bold text-lg">
            {formatCurrency(property.rent)} <span className="text-sm font-normal text-text-secondary">/ month</span>
          </div>
          <div className="text-xs text-text-muted mt-0.5">Move-in ready</div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleContactOwner}
            className="btn-primary px-6"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
