export default function StatusBadge({ status, type }) {
  const getStyles = () => {
    const s = status?.toLowerCase() || '';
    
    if (type === 'user') {
      if (s === 'active') return 'text-success bg-success/10 border-success/20';
      if (s === 'suspended') return 'text-warning bg-warning/10 border-warning/20';
      if (s === 'banned') return 'text-error bg-error/10 border-error/20';
    }
    
    if (type === 'listing') {
      if (s === 'active' || s === 'published') return 'text-success bg-success/10 border-success/20';
      if (s === 'pending') return 'text-warning bg-warning/10 border-warning/20';
      if (s === 'rejected') return 'text-error bg-error/10 border-error/20';
      if (s === 'draft') return 'text-text-muted bg-dark-500 border-border';
    }
    
    if (type === 'ticket' || type === 'report') {
      if (s === 'open') return 'text-error bg-error/10 border-error/20';
      if (s === 'in progress' || s === 'investigating') return 'text-warning bg-warning/10 border-warning/20';
      if (s === 'resolved' || s === 'closed' || s === 'dismissed') return 'text-success bg-success/10 border-success/20';
    }
    
    if (type === 'verification') {
      if (s === 'approved' || s === 'verified') return 'text-success bg-success/10 border-success/20';
      if (s === 'pending') return 'text-warning bg-warning/10 border-warning/20';
      if (s === 'rejected') return 'text-error bg-error/10 border-error/20';
    }
    
    return 'text-text-secondary bg-dark-500 border-border';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
      {status || 'Unknown'}
    </span>
  );
}
