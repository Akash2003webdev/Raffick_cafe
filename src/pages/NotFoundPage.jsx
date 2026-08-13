import { Link } from "react-router-dom";
import { Home, Utensils } from "lucide-react";
import { useSEO } from "../lib/seo";

export default function NotFoundPage() {
  useSEO({
    title: "Page Not Found | Raffick Cafe",
    description: "The requested page could not be found.",
    path: window.location.pathname,
    noindex: true,
  });

  return (
    <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-6 pb-28 text-center">
      <p className="text-sm font-black uppercase tracking-[.25em] text-orange-500">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-black text-stone-900">Page not found</h1>
      <p className="mt-3 text-stone-500">This page may have moved. Return home or browse the Raffick Cafe menu.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-bold text-white"><Home size={17} /> Home</Link>
        <Link to="/menu" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white"><Utensils size={17} /> Menu</Link>
      </div>
    </main>
  );
}
