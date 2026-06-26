export default function SkeletonCard() {
  return (
    <div className="bg-dark-800 border border-border rounded-[1.25rem] overflow-hidden">
      {/* Image placeholder */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <div className="w-full h-full bg-dark-600 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 bg-dark-600 rounded-lg animate-pulse" />

        {/* Location */}
        <div className="h-4 w-1/2 bg-dark-600 rounded-lg animate-pulse" />

        {/* Rating area */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 bg-dark-600 rounded-lg animate-pulse" />
            <div className="h-4 w-8 bg-dark-600 rounded-lg animate-pulse" />
          </div>
          <div className="h-3 w-16 bg-dark-600 rounded-lg animate-pulse" />
        </div>

        {/* Facility tags */}
        <div className="flex gap-1.5 mt-1">
          <div className="h-5 w-14 bg-dark-600 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-dark-600 rounded-full animate-pulse" />
          <div className="h-5 w-12 bg-dark-600 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
