import React from 'react';

export default function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-36 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* Trust badge skeleton */}
          <div className="skeleton w-64 h-8 rounded-full mb-6" />
          
          {/* Title skeleton */}
          <div className="skeleton w-3/4 h-16 sm:h-20 rounded-2xl mb-4" />
          <div className="skeleton w-1/2 h-16 sm:h-20 rounded-2xl mb-6" />
          
          {/* Subtitle skeleton */}
          <div className="skeleton w-2/3 h-6 rounded-lg mb-2" />
          <div className="skeleton w-1/2 h-6 rounded-lg mb-10" />

          {/* Search bar skeleton */}
          <div className="w-full max-w-4xl bg-dark-800/80 border border-border rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row gap-2">
            <div className="skeleton h-12 flex-1 rounded-xl" />
            <div className="hidden sm:block w-px h-10 bg-border self-center" />
            <div className="skeleton h-12 flex-1 rounded-xl" />
            <div className="hidden sm:block w-px h-10 bg-border self-center" />
            <div className="skeleton h-12 flex-1 rounded-xl" />
            <div className="hidden sm:block w-px h-10 bg-border self-center" />
            <div className="skeleton h-12 flex-1 rounded-xl" />
            <div className="skeleton h-12 w-full sm:w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
