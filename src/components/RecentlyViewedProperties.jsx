import React, { useMemo } from 'react';
import PropertyCard from './PropertyCard';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { mockProperties } from '../hooks/useProperties';

export default function RecentlyViewedProperties() {
  const { recentlyViewed } = useRecentlyViewed();

  const recentlyViewedFull = useMemo(() => {
    if (!recentlyViewed || recentlyViewed.length === 0) return [];
    
    // Map recently viewed IDs to full property objects from mockProperties
    // Limit to 4 properties as requested
    return recentlyViewed
      .slice(0, 4)
      .map((viewedItem) => {
        const fullProperty = mockProperties.find(p => p.id === viewedItem.id);
        // Fallback to the partial object if the full one isn't in mock properties
        // but try to shape it so PropertyCard doesn't break
        if (!fullProperty) {
          return {
            id: viewedItem.id,
            name: viewedItem.name,
            rent: viewedItem.rent,
            city: viewedItem.city,
            images: viewedItem.image ? [viewedItem.image] : [],
            propertyType: 'unknown',
            createdAt: viewedItem.viewedAt,
            facilities: []
          };
        }
        return fullProperty;
      });
  }, [recentlyViewed]);

  if (!recentlyViewedFull || recentlyViewedFull.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewedFull.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
