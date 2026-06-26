import React, { useMemo } from 'react';
import PropertyCard from './PropertyCard';
import { mockProperties } from '../hooks/useProperties';

export default function SimilarProperties({ currentPropertyId, propertyType, city }) {
  const similarProperties = useMemo(() => {
    return mockProperties
      .filter((prop) => prop.id !== currentPropertyId)
      .filter((prop) => prop.city === city || prop.propertyType === propertyType)
      .sort((a, b) => {
        // Boost score if both match
        let scoreA = 0;
        let scoreB = 0;
        if (a.city === city) scoreA++;
        if (a.propertyType === propertyType) scoreA++;
        if (b.city === city) scoreB++;
        if (b.propertyType === propertyType) scoreB++;
        
        return scoreB - scoreA;
      })
      .slice(0, 4);
  }, [currentPropertyId, propertyType, city]);

  if (!similarProperties || similarProperties.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
