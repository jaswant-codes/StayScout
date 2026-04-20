import { Star } from 'lucide-react';

export default function StarRating({
  rating = 0,
  maxStars = 5,
  size = 18,
  interactive = false,
  onChange,
}) {
  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleClick(i)}
          disabled={!interactive}
          className={`transition-all duration-200 ${
            interactive
              ? 'cursor-pointer hover:scale-125'
              : 'cursor-default'
          }`}
          style={{ background: 'none', border: 'none', padding: '2px' }}
        >
          <Star
            size={size}
            className={`transition-colors duration-200 ${
              i < rating
                ? 'fill-warning text-warning'
                : 'fill-dark-600 text-dark-500'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
