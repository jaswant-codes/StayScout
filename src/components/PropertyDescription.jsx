import React from 'react';
import { FileText, MapPin, Bus, GraduationCap, Coffee, CheckCircle } from 'lucide-react';

const PropertyDescription = ({ description }) => {
  if (!description) return null;

  return (
    <div className="bg-dark-800 rounded-xl p-6 border border-border">
      <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-accent-500" />
        About the Property
      </h3>

      <div className="space-y-8">
        {description.overview && (
          <div>
            <p className="text-text-secondary leading-relaxed">
              {description.overview}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {description.bestFor && (
            <div>
              <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Best For
              </h4>
              <p className="text-text-secondary bg-dark-700 p-4 rounded-lg border border-border">
                {description.bestFor}
              </p>
            </div>
          )}

          {description.nearbyColleges && (
            <div>
              <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Nearby Colleges
              </h4>
              <p className="text-text-secondary bg-dark-700 p-4 rounded-lg border border-border">
                {description.nearbyColleges}
              </p>
            </div>
          )}

          {description.transportation && (
            <div>
              <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <Bus className="w-4 h-4" /> Transportation
              </h4>
              <p className="text-text-secondary bg-dark-700 p-4 rounded-lg border border-border">
                {description.transportation}
              </p>
            </div>
          )}

          {description.lifestyle && (
            <div>
              <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <Coffee className="w-4 h-4" /> Lifestyle & Vibe
              </h4>
              <p className="text-text-secondary bg-dark-700 p-4 rounded-lg border border-border">
                {description.lifestyle}
              </p>
            </div>
          )}
        </div>

        {description.whyChoose && description.whyChoose.length > 0 && (
          <div className="bg-accent-500/5 border border-accent-500/20 rounded-xl p-5">
            <h4 className="text-lg font-medium text-text-primary mb-4">
              Why Students Choose This Property
            </h4>
            <ul className="space-y-3">
              {description.whyChoose.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDescription;
