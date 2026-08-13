import React from 'react';

export default function CategoryShowcase({ 
  categories = [], 
  selectedId, 
  onSelect, 
  onViewAll 
}) {
  return (
    <div className="w-full  animate-fadeUp">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-6 px-1">
        <div>
          <span className="block text-gold-500 text-[11px] font-bold tracking-[0.25em] uppercase mb-1">
            Curated Selection
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-900 tracking-tight">
            Browse Menu
          </h2>
        </div>
        {onViewAll && (
          <button 
            onClick={onViewAll} 
            className="group flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors"
          >
            <span>View all</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroll / Grid */}
      <div className="flex md:grid md:grid-cols-8 gap-5 md:gap-4 overflow-x-auto pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = selectedId === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat)}
              className="flex flex-col items-center gap-2.5 shrink-0 group focus:outline-none"
            >
              {/* Image Container */}
              <div
                className={`relative w-20 h-20 md:w-22 md:h-22 rounded-full overflow-hidden transition-all duration-500 ${
                  isActive
                    ? "ring-2 ring-gold-500 ring-offset-4 ring-offset-white shadow-lg scale-105"
                    : "border border-gold-200/60 group-hover:border-gold-400 group-hover:shadow-md"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  width="160"
                  height="160"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Subtle dark gradient overlay on hover for better depth */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Category Label */}
              <span
                className={`text-xs text-center max-w-[76px] md:max-w-[88px] leading-tight transition-colors duration-300 ${
                  isActive 
                    ? "text-primary-900 font-bold tracking-tight" 
                    : "text-primary-700/80 group-hover:text-primary-900 font-medium"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
