import StatCard from '../StatCard';

export default function ReportStatsBar({ stats = [], loading = false }) {
  const displayStats = loading && stats.length === 0 ? Array(4).fill({}) : stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayStats.map((stat, index) => (
        <StatCard 
          key={stat.id || index} 
          {...stat} 
          loading={loading} 
        />
      ))}
    </div>
  );
}
