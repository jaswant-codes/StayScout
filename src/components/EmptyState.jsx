import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionLink }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
        {Icon && (
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-500/15 mb-5">
            <Icon size={28} className="text-accent-400" />
          </div>
        )}

        {title && (
          <p className="text-text-primary font-semibold text-lg mb-2">{title}</p>
        )}

        {description && (
          <p className="text-text-muted text-sm mb-6">{description}</p>
        )}

        {actionLabel && actionLink && (
          <Link to={actionLink} className="btn-primary">
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
