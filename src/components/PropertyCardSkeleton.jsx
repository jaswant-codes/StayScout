import React from 'react';

export default function PropertyCardSkeleton() {
  return (
    <div className="card animate-pulse group h-full border border-border">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden h-[240px] bg-dark-700/50">
        <div className="absolute top-4 left-4 w-20 h-7 bg-dark-600 rounded-full" />
        <div className="absolute top-4 right-4 w-24 h-7 bg-dark-600 rounded-full" />
        <div className="absolute bottom-4 left-4 w-28 h-8 bg-dark-600 rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="w-3/4 h-6 bg-dark-600 rounded-md" />
          <div className="w-10 h-10 bg-dark-600 rounded-full shrink-0" />
        </div>

        <div className="space-y-3 mb-5">
          <div className="w-1/2 h-4 bg-dark-600 rounded" />
          <div className="w-2/3 h-4 bg-dark-600 rounded" />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="w-20 h-7 bg-dark-600 rounded-lg" />
          <div className="w-24 h-7 bg-dark-600 rounded-lg" />
          <div className="w-28 h-7 bg-dark-600 rounded-lg" />
        </div>

        <div className="pt-5 border-t border-border grid grid-cols-2 gap-3">
          <div className="h-11 bg-dark-600 rounded-xl" />
          <div className="h-11 bg-dark-600 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
