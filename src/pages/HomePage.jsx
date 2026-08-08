import { useEffect, useState } from "react";
import {
  ArrowRight,
  Coffee,
  MapPin,
  Navigation,
  Quote,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Utensils,
} from "lucide-react";

import SearchBar from "../components/SearchBar";
import CategoryShowcase from "../components/CategoryShowcase";
import BannerCarousel from "../components/BannerCarousel";
import MenuItemCard from "../components/MenuItemCard";
import ReviewCard from "../components/ReviewCard";

import {
  getBanners,
  getCategories,
  getMenuItems,
  getOverallReviews,
  getPopularItems,
} from "../lib/api";

import { useSEO } from "../lib/seo";

const POPULAR_BADGES = [
  { type: "bestseller", label: "Bestseller" },
  { type: "popular", label: "Hot" },
  { type: "popular", label: "Popular" },
  { type: "save", label: "Save 15%" },
];

export default function HomePage({
  onNavigate,
  onSelectCategory,
  onSelectItem,
  onToast,
}) {
  useSEO({
    title: "Raffick Cafe | Coffee, Food & Delivery in Sattur",
    description:
      "Raffick Cafe in Sattur offers coffee, burgers, pasta, fried rice, desserts, takeaway and delivery.",
    path: "/",
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [popular, setPopular] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      getCategories(),
      getPopularItems(8),
      getOverallReviews(),
      getBanners(),
    ]).then(([categoryResult, popularResult, reviewResult, bannerResult]) => {
      if (!mounted) return;

      const categoryData =
        categoryResult.status === "fulfilled" ? categoryResult.value || [] : [];

      setCategories(categoryData);
      setSelectedCategory(categoryData[0] || null);
      setPopular(popularResult.status === "fulfilled" ? popularResult.value || [] : []);
      setReviews(reviewResult.status === "fulfilled" ? reviewResult.value || [] : []);
      setBanners(bannerResult.status === "fulfilled" ? bannerResult.value || [] : []);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const value = search.trim();

    if (!value) {
      setSearchResults([]);
      setLoadingSearch(false);
      return undefined;
    }

    let cancelled = false;
    setLoadingSearch(true);

    const timer = window.setTimeout(() => {
      getMenuItems({ search: value })
        .then((data) => {
          if (!cancelled) setSearchResults(data || []);
        })
        .catch(() => {
          if (!cancelled) setSearchResults([]);
        })
        .finally(() => {
          if (!cancelled) setLoadingSearch(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [search]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory?.(category);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf3] text-[#2b1b12]">
      {/* Search + hero */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-5 sm:px-6 md:px-8 md:pt-7 lg:px-10">
        <div className="mb-5 flex items-center gap-3 md:mb-7">
          <div className="min-w-0 flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search for your favorite food..."
            />
          </div>

          <button
            type="button"
            onClick={() => onNavigate?.("menu")}
            aria-label="Browse full menu"
            className="flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-orange-100 bg-white px-4 text-sm font-bold text-[#ea580c] shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 md:h-[54px] md:px-5"
          >
            <SlidersHorizontal size={19} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {!search.trim() && (
          <div className="relative mb-8 w-full overflow-hidden rounded-[18px]  shadow-[0_28px_70px_rgba(91,44,10,0.20)] md:rounded-[28px]">
            <div className="aspect-[6/4] w-full sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[16/6] [&>*]:h-full [&>*]:w-full">
              <BannerCarousel banners={banners} />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[1440px] space-y-14 px-4 pb-28 sm:px-6 md:space-y-20 md:px-8 md:pb-20 lg:px-10">
        {search.trim() ? (
          <div className="animate-fade-in">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.20em] text-[#c97924]">
                  <Coffee size={13} />
                  Search
                </span>
                <h2 className="font-display text-2xl font-black tracking-tight md:text-3xl">
                  Results for “{search.trim()}”
                </h2>
              </div>

              <span className="rounded-full border border-orange-100 bg-white px-3 py-1.5 text-xs font-black text-[#ea580c] shadow-sm">
                {loadingSearch ? "Searching..." : `${searchResults.length} found`}
              </span>
            </div>

            {!loadingSearch && searchResults.length === 0 ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[30px] border border-dashed border-orange-200 bg-white/80 px-6 text-center shadow-[0_15px_45px_rgba(91,44,10,0.05)]">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-[#ea580c]">
                  <SearchX size={25} />
                </span>
                <h3 className="font-display text-xl font-black">No matching food found</h3>
                <p className="mt-2 max-w-md text-sm text-gray-500">
                  Try another dish name or open the full menu to browse all items.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate?.("menu")}
                  className="mt-5 rounded-full bg-gradient-to-r from-[#e85d1e] to-[#ff8a2a] px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-200"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {searchResults.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onClick={() => onSelectItem?.(item)}
                    onToast={onToast}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Categories */}
            <section className="animate-fade-in">
              <CategoryShowcase
                categories={categories}
                selectedId={selectedCategory?.id}
                onSelect={handleCategorySelect}
                onViewAll={() => onNavigate?.("menu")}
              />
            </section>

            {/* Popular */}
            <section>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.20em] text-[#c97924]">
                    <Utensils size={13} />
                    Most Ordered
                  </span>
                  <h2 className="font-display text-2xl font-black tracking-tight md:text-3xl">
                    Explore Our <span className="text-[#ea580c]">Bestsellers</span>
                  </h2>
                  <p className="mt-1 hidden text-sm text-gray-500 sm:block">
                    Handpicked favorites loved by everyone at Raffick Cafe.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate?.("menu")}
                  className="group flex shrink-0 items-center gap-1 text-xs font-black text-[#ea580c] transition hover:text-[#c2410c] md:text-sm"
                >
                  View all
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {popular.map((item, index) => (
                  <div key={item.id} className="min-w-0 transition-transform duration-300 hover:-translate-y-1">
                    <MenuItemCard
                      item={item}
                      onClick={() => onSelectItem?.(item)}
                      onToast={onToast}
                      badge={POPULAR_BADGES[index % POPULAR_BADGES.length]}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Offer */}
            <section className="group relative overflow-hidden rounded-[30px] bg-[#24140d] p-[1px] shadow-[0_24px_60px_rgba(50,22,7,0.18)]">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl transition group-hover:bg-orange-500/30" />
              <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />

              <button
                type="button"
                onClick={() => onNavigate?.("offers")}
                className="relative flex w-full items-center justify-between gap-6 overflow-hidden rounded-[29px] bg-gradient-to-r from-[#2d180f] via-[#21120d] to-[#32190f] px-6 py-8 text-left md:px-10 md:py-10"
              >
                <div className="relative z-10 max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.23em] text-orange-300">
                    <Sparkles size={12} />
                    Exclusive Offer
                  </span>

                  <h3 className="mt-3 font-display text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
                    Coffee, Snacks & Combo Deals Made for Your Mood
                  </h3>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange-300">
                    Explore today&apos;s offers
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#ff9b3f] to-[#e85d1e] text-white shadow-[0_15px_35px_rgba(234,88,12,0.35)] transition duration-500 group-hover:rotate-6 group-hover:scale-110 md:h-20 md:w-20 md:rounded-[26px]">
                  <Tag size={30} className="-rotate-12" />
                </div>
              </button>
            </section>

            {/* Reviews */}
            <section>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.20em] text-[#c97924]">
                    <Quote size={13} className="fill-[#c97924]" />
                    Guest Stories
                  </span>
                  <h2 className="font-display text-2xl font-black tracking-tight md:text-3xl">
                    What Our Guests Say
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate?.("reviews")}
                  className="group flex shrink-0 items-center gap-1 text-xs font-black text-[#ea580c] md:text-sm"
                >
                  View all
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:px-0">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="min-w-[280px] transition-transform duration-300 hover:-translate-y-1 md:min-w-0">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.20em] text-[#c97924]">
                  Visit Us
                </span>
                <h2 className="mt-1 font-display text-2xl font-black tracking-tight md:text-3xl">
                  Find Raffick Cafe
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Come for the food. Stay for the good mood.
                </p>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-orange-100/70 bg-white shadow-[0_20px_55px_rgba(70,35,12,0.08)]">
                <iframe
                  title="Raffick Cafe location"
                  src="https://www.google.com/maps?q=Raffick+Cafe+Sattur+Tamil+Nadu&output=embed"
                  width="100%"
                  height="390"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full brightness-[0.98] contrast-[1.01]"
                />
              </div>

              <div className="mt-5 flex flex-col gap-5 rounded-[26px] border border-orange-100/80 bg-white p-5 shadow-[0_15px_45px_rgba(70,35,12,0.05)] sm:flex-row sm:items-center sm:justify-between md:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c]">
                    <MapPin size={21} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-black">Raffick Cafe</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      Sattur, Tamil Nadu
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Raffick+Cafe+Sattur+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e85d1e] to-[#ff8a2a] px-6 py-3.5 text-sm font-black text-white shadow-[0_12px_28px_rgba(234,88,12,0.24)] transition hover:-translate-y-0.5"
                >
                  <Navigation size={16} />
                  Open in Google Maps
                </a>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}