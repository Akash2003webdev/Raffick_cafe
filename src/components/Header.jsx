import { useRef, useState } from "react";
import {
  Home,
  Menu,
  MessageSquareText,
  MessageCircleQuestion,
  ShoppingBag,
  Tag,
  UtensilsCrossed,
  X,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "menu", label: "Menu", icon: UtensilsCrossed },
  { key: "offers", label: "Offers", icon: Tag },
  { key: "reviews", label: "Reviews", icon: MessageSquareText },
  { key: "enquiry", label: "Enquiry", icon: MessageCircleQuestion },
];

export default function Header({ onAdminTrigger, activePage, onNavigate }) {
  const timerRef = useRef(null);
  const [pressing, setPressing] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { itemCount } = useCart();

  const startPress = () => {
    setPressing(true);
    timerRef.current = window.setTimeout(() => {
      onAdminTrigger?.();
      setPressing(false);
    }, 600);
  };

  const cancelPress = () => {
    setPressing(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const go = (key) => {
    setDrawerOpen(false);
    onNavigate?.(key);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-orange-100/70 bg-[#fffaf3]/85 px-3 py-3 backdrop-blur-2xl sm:px-5 md:px-7 lg:px-8">
        <div className="mx-auto w-full max-w-[1440px] rounded-[22px] border border-white/90 bg-white/95 px-3 py-3 shadow-[0_14px_40px_rgba(70,35,12,0.08)] sm:px-4 lg:rounded-[28px] lg:px-6 lg:py-4">
          {/* Mobile */}
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => go("home")}
              className="flex min-w-0 items-center gap-3 text-left"
            >
              <span
                onMouseDown={startPress}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                onTouchStart={startPress}
                onTouchEnd={cancelPress}
                className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_8px_22px_rgba(234,88,12,0.12)] transition-all ${
                  pressing ? "scale-95 ring-4 ring-orange-100" : ""
                }`}
              >
                <img src={logo} alt="Raffick Cafe" className="h-full w-full object-cover" />
              </span>

              <span className="min-w-0">
                <span className="block truncate font-display text-[19px] font-black tracking-tight text-[#2b1b12]">
                  Raffick <span className="text-[#ea580c]">Cafe</span>
                </span>
                <span className="mt-0.5 block truncate text-[7px] font-black uppercase tracking-[0.30em] text-gray-500">
                  Feel Good, Eat Good
                </span>
              </span>
            </button>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ea580c]"
              >
                <Menu size={18} />
              </button>

              <button
                type="button"
                onClick={() => go("cart")}
                aria-label="Open cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e85d1e] to-[#ff8a2a] text-white shadow-[0_10px_24px_rgba(234,88,12,0.28)] transition hover:scale-105 active:scale-95"
              >
                <ShoppingBag size={17} />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#21150f] px-1 text-[9px] font-black text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden items-center justify-between gap-7 lg:flex">
            <button
              type="button"
              onClick={() => go("home")}
              className="flex shrink-0 items-center gap-3 text-left"
            >
              <span
                onMouseDown={startPress}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_10px_24px_rgba(234,88,12,0.12)] transition-all hover:scale-105 ${
                  pressing ? "scale-95 ring-4 ring-orange-100" : ""
                }`}
              >
                <img src={logo} alt="Raffick Cafe" className="h-full w-full object-cover" />
              </span>

              <span>
                <span className="block font-display text-[23px] font-black tracking-tight text-[#2b1b12]">
                  Raffick <span className="text-[#ea580c]">Cafe</span>
                </span>
                <span className="mt-0.5 block text-[9px] font-black uppercase tracking-[0.32em] text-gray-500">
                  Feel Good, Eat Good
                </span>
              </span>
            </button>

            <nav className="flex items-center gap-1.5 rounded-full border border-orange-100/80 bg-[#fffaf6] p-1.5 shadow-inner shadow-orange-50/50">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                const active = activePage === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => go(key)}
                    className={`group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                      active
                        ? "bg-white text-[#ea580c] shadow-[0_7px_20px_rgba(234,88,12,0.13)]"
                        : "text-gray-500 hover:bg-white hover:text-[#ea580c]"
                    }`}
                  >
                    <Icon size={16} className="transition-transform group-hover:scale-110" />
                    {label}
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => go("cart")}
              className="relative flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#e85d1e] to-[#ff8a2a] px-6 py-3 text-sm font-black text-white shadow-[0_13px_30px_rgba(234,88,12,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(234,88,12,0.35)] active:scale-95"
            >
              <ShoppingBag size={17} />
              Order Now
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#21150f] px-1 text-[9px] font-black text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/45 backdrop-blur-[2px]"
          />

          <aside className="absolute bottom-0 left-0 top-0 flex w-[292px] max-w-[84%] flex-col bg-[#fffaf3] shadow-2xl animate-slide-in-left">
            <div className="border-b border-orange-100 bg-white px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={() => go("home")} className="flex min-w-0 items-center gap-3 text-left">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-orange-100 shadow-sm">
                    <img src={logo} alt="Raffick Cafe" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-black text-[#2b1b12]">
                      Raffick <span className="text-[#ea580c]">Cafe</span>
                    </p>
                    <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.25em] text-[#ea580c]">
                      Feel Good, Eat Good
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-orange-100 hover:text-[#ea580c]"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                const active = activePage === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => go(key)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all ${
                      active
                        ? "bg-gradient-to-r from-[#e85d1e] to-[#ff8a2a] text-white shadow-lg shadow-orange-200"
                        : "bg-white text-gray-600 hover:bg-orange-50 hover:text-[#ea580c]"
                    }`}
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-white/15" : "bg-orange-50 text-[#ea580c]"}`}>
                      <Icon size={18} />
                    </span>
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-orange-100 bg-white p-4">
              <button
                type="button"
                onClick={() => go("cart")}
                className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e85d1e] to-[#ff8a2a] px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition-transform active:scale-[0.98]"
              >
                <ShoppingBag size={18} />
                View Cart & Order
                {itemCount > 0 && (
                  <span className="absolute right-4 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-black text-[#ea580c]">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}