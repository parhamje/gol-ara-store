import { Star } from 'lucide-react';

/**
 * Renders 5 star icons based on a 0-5 rating.
 * @param {number} rating
 * @param {number} [size=14]
 */
export default function StarRating({ rating, size = 14 }) {
  return (
    <div className="stars" aria-label={`امتیاز ${rating} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}
          fill={i <= Math.round(rating) ? '#f59e0b' : 'none'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
