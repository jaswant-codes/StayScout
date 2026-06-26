import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendDirection, loading }) {
  return (
    <div className="glass p-6 rounded-xl flex flex-col justify-between">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="flex justify-between items-start">
            <div className="h-5 bg-dark-700 rounded w-1/3"></div>
            <div className="h-8 w-8 bg-dark-700 rounded-lg"></div>
          </div>
          <div className="h-10 bg-dark-700 rounded w-1/2 mt-4"></div>
          <div className="h-4 bg-dark-700 rounded w-1/4 mt-4"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-text-secondary font-medium">{title}</h3>
            {Icon && (
              <div className="p-2 bg-dark-800 rounded-lg border border-border">
                <Icon size={20} className="text-accent-400" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{value}</h2>
            {trend && (
              <div className={`flex items-center text-sm font-medium ${trendDirection === 'up' ? 'text-success' : 'text-error'}`}>
                {trendDirection === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {trend}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
