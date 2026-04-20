export default function Loader({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-dark-600" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-500 animate-spin" />
      </div>
      {text && (
        <p className="text-sm text-text-secondary animate-pulse">{text}</p>
      )}
    </div>
  );
}
