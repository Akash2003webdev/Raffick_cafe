import { useState } from "react";
import { Plus, Heart } from "lucide-react";
import VegBadge from "./VegBadge";
import Stars from "./Stars";
import { useCart } from "../context/CartContext";
import { isItemOrderableNow, getUnavailableReason } from "../lib/timeRestrictions";

const BADGE_STYLES = {
  bestseller: "bg-primary-600 text-white",
  popular: "bg-gold-500 text-primary-900",
  save: "bg-emerald-600 text-white",
};

export default function MenuItemCard({ item, onClick, onToast, badge }) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);

  // Logic Integration
  const isSoldOut = item.status === "sold_out";
  const orderable = isItemOrderableNow(item.categoryName);
  const isBlocked = isSoldOut || !orderable;
  const defaultVariant = item.variants?.[0];

  function handleQuickAdd(e) {
    e.stopPropagation();
    if (isBlocked) return;
    
    addItem({
      id: item.id,
      name: item.name,
      price: defaultVariant?.price ?? 0,
      variantId: defaultVariant?.id ?? null,
      variantName: defaultVariant?.name ?? null,
      image: item.images?.[0],
      categoryName: item.categoryName,
      quantity: 1,
    });
    
    onToast?.(`${item.name} added to cart`);
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl md:rounded-3xl shadow-soft hover:shadow-card overflow-hidden animate-fadeUp cursor-pointer flex flex-col transition-shadow duration-300 group"
    >
      {/* Image Container */}
      <div className="relative h-32 md:h-40 overflow-hidden">
        <img
          src={item.images?.[0]}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
            <span className="text-white text-xs font-bold uppercase tracking-wide">
              Sold Out
            </span>
          </div>
        )}

        {/* Time Restriction Overlay */}
        {!isSoldOut && !orderable && (
          <div className="absolute inset-0 bg-ink/50 flex items-center justify-center px-2">
            <span className="text-white text-[11px] font-semibold text-center leading-tight">
              {getUnavailableReason(item.categoryName)}
            </span>
          </div>
        )}

        {/* Promo tag, top-left */}
        {badge && (
          <span
            className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-md shadow-sm ${
              BADGE_STYLES[badge.type] || BADGE_STYLES.bestseller
            }`}
          >
            {badge.label}
          </span>
        )}

        {/* Wishlist heart, top-right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          aria-label="Save to favorites"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
        >
          <Heart
            size={13}
            className={liked ? "fill-primary-600 text-primary-600" : "text-gray-400"}
          />
        </button>

        {/* Veg / Non-Veg Badge */}
        <div className="absolute bottom-2 left-2 bg-white/90 rounded-md p-0.5">
          <VegBadge type={item.veg_type} size={14} />
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3 md:p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-sm md:text-[15px] text-primary-800 leading-tight">
          {item.name}
        </h3>
        
        <p className="text-xs text-gray-500 line-clamp-2 hidden sm:block">
          {item.description}
        </p>

        <div className="flex items-center gap-1.5 mt-1">
          <Stars rating={item.rating} size={12} />
          <span className="text-[11px] text-gray-400 font-medium">
            {item.rating ?? "4.5"} ({item.reviewCount ?? "1.2K"}+)
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          {defaultVariant && (
            <span className="text-sm md:text-base font-bold text-primary-600">
              ₹{defaultVariant.price}
            </span>
          )}

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isBlocked}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 flex items-center justify-center shadow-soft transition-colors shrink-0"
          >
            <Plus size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}