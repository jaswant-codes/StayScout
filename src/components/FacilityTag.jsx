import { FACILITY_ICONS } from '../utils/helpers';

export default function FacilityTag({ facility, selected, onClick, small }) {
  const icon = FACILITY_ICONS[facility] || '✨';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 rounded-full transition-all duration-200
        ${small ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
        ${
          selected
            ? 'bg-accent-500 text-white border border-accent-500 shadow-lg shadow-accent-500/20'
            : 'bg-dark-700 text-text-secondary border border-border hover:border-border-hover hover:text-text-primary'
        }
      `}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <span>{icon}</span>
      <span className="font-medium">{facility}</span>
    </button>
  );
}
