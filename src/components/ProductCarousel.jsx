import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // In RTL, moving 'forward' means scrolling physically to the left (negative x)
      const scrollAmount = direction === 'next' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Right Button (Prev in RTL) */}
      <button 
        onClick={() => scroll('prev')}
        className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg border border-pink-100 text-pink-500 hover:bg-pink-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="قبلی"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 hide-scrollbar scroll-smooth"
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-[260px] md:w-[280px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Left Button (Next in RTL) */}
      <button 
        onClick={() => scroll('next')}
        className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg border border-pink-100 text-pink-500 hover:bg-pink-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="بعدی"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
}
