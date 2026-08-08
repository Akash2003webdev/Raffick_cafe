import {
  Home,
  UtensilsCrossed,
  Tag,
  MessageSquareText,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const NAV_ITEMS = [
  {
    key: "home",
    label: "Home",
    icon: Home,
  },
  {
    key: "menu",
    label: "Menu",
    icon: UtensilsCrossed,
  },
  {
    key: "cart",
    label: "Orders",
    icon: ShoppingBag,
    raised: true,
  },
  {
    key: "offers",
    label: "Offers",
    icon: Tag,
  },
  {
    key: "reviews",
    label: "Reviews",
    icon: MessageSquareText,
  },
];

export default function BottomNav({ activePage, onNavigate }) {
  const { itemCount } = useCart();

  const handleNavigate = (key) => {
    onNavigate?.(key);
  };

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        border-t border-orange-100
        bg-white/95
        shadow-[0_-8px_30px_rgba(91,44,10,0.10)]
        backdrop-blur-xl
        md:hidden
      "
      aria-label="Mobile bottom navigation"
    >
      <div
        className="
          mx-auto flex w-full max-w-5xl
          items-end justify-around
          px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2
        "
      >
        {NAV_ITEMS.map(({ key, label, icon: Icon, raised }) => {
          const active = activePage === key;

          if (raised) {
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleNavigate(key)}
                aria-label={`Open ${label}`}
                aria-current={active ? "page" : undefined}
                className="
                  relative -mt-8 flex min-w-[62px]
                  flex-col items-center gap-1 px-2
                  transition-transform duration-300
                  active:scale-95
                "
              >
                <span
                  className={`
                    relative flex h-14 w-14
                    items-center justify-center
                    rounded-full
                    ring-4 ring-white
                    shadow-[0_12px_28px_rgba(234,88,12,0.30)]
                    transition-all duration-300
                    ${
                      active
                        ? "scale-105 bg-gradient-to-br from-[#c2410c] to-[#ea580c]"
                        : "bg-gradient-to-br from-[#ea580c] to-[#ff8a2a]"
                    }
                  `}
                >
                  <ShoppingBag
                    size={22}
                    strokeWidth={2.4}
                    className="text-white"
                  />

                  {itemCount > 0 && (
                    <span
                      className="
                        absolute -right-1 -top-1
                        flex h-5 min-w-5
                        items-center justify-center
                        rounded-full
                        border-2 border-white
                        bg-gray-950 px-1
                        text-[9px] font-black text-white
                      "
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </span>

                <span
                  className={`
                    text-[10px] font-black
                    transition-colors duration-300
                    ${
                      active
                        ? "text-[#ea580c]"
                        : "text-gray-500"
                    }
                  `}
                >
                  {label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={key}
              type="button"
              onClick={() => handleNavigate(key)}
              aria-label={`Open ${label}`}
              aria-current={active ? "page" : undefined}
              className="
                group relative flex min-w-[58px]
                flex-col items-center gap-1
                rounded-2xl px-2 py-1.5
                transition-all duration-300
                active:scale-95
              "
            >
              {active && (
                <span
                  className="
                    absolute inset-x-2 -top-2
                    h-1 rounded-full
                    bg-gradient-to-r from-[#ea580c] to-[#ff8a2a]
                  "
                />
              )}

              <span
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-xl
                  transition-all duration-300
                  ${
                    active
                      ? "bg-orange-50 text-[#ea580c]"
                      : "text-gray-400 group-hover:bg-orange-50 group-hover:text-[#ea580c]"
                  }
                `}
              >
                <Icon
                  size={21}
                  strokeWidth={active ? 2.5 : 2}
                />
              </span>

              <span
                className={`
                  text-[10px]
                  transition-colors duration-300
                  ${
                    active
                      ? "font-black text-[#ea580c]"
                      : "font-semibold text-gray-400 group-hover:text-[#ea580c]"
                  }
                `}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}