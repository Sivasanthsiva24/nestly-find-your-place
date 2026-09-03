import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MapPin, Star, X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { CITIES, GENDERS, PGS, formatINR } from "@/data/pgs";
import type { Gender } from "@/data/pgs";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";
import mapBg from "@/assets/map-bg.jpg";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "PG Map View — PGFinder" },
      {
        name: "description",
        content: "Browse PGs and hostels on a map view with pins, prices and quick previews.",
      },
      { property: "og:title", content: "PG Map View — PGFinder" },
      { property: "og:description", content: "See where each PG sits relative to your campus." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [city, setCity] = useState<string>("All cities");
  const [gender, setGender] = useState<Gender | "Any">("Any");
  const [maxRent, setMaxRent] = useState(15000);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useAppState();

  const list = PGS.filter(
    (p) =>
      (city === "All cities" || p.city === city) &&
      (gender === "Any" || p.gender === gender) &&
      p.rent <= maxRent,
  );
  const active = list.find((p) => p.id === activeId) ?? null;

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Map view</h1>
        <p className="mt-2 text-muted-foreground">
          Tap a pin to preview the PG. {list.length} stays shown.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-3xl border border-line bg-card p-4 shadow-soft">
          <select
            aria-label="Filter by city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-xl border border-line bg-background px-3 py-2.5 text-sm font-medium outline-none focus:border-brand"
          >
            {["All cities", ...CITIES].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            aria-label="Filter by gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender | "Any")}
            className="rounded-xl border border-line bg-background px-3 py-2.5 text-sm font-medium outline-none focus:border-brand"
          >
            {["Any", ...GENDERS].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <label className="flex flex-1 items-center gap-3 text-sm">
            <span className="whitespace-nowrap text-muted-foreground">Max {formatINR(maxRent)}</span>
            <input
              type="range"
              min={4000}
              max={15000}
              step={500}
              value={maxRent}
              onChange={(e) => setMaxRent(Number(e.target.value))}
              className="w-full accent-[oklch(0.688_0.144_51.5)]"
              aria-label="Maximum rent"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="relative overflow-hidden rounded-3xl border border-line shadow-soft">
            <img
              src={mapBg}
              alt="Stylised city map of the neighbourhood"
              width={1600}
              height={1200}
              className="h-[420px] w-full object-cover sm:h-[560px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-sun/25" />

            {list.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id === activeId ? null : p.id)}
                style={{ left: `${p.pin.x}%`, top: `${p.pin.y}%` }}
                aria-label={`Preview ${p.name}`}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-bold shadow-lift transition-transform hover:scale-110",
                  p.id === activeId ? "bg-ink text-cream" : "bg-brand text-primary-foreground",
                )}
              >
                {formatINR(p.rent)}
              </button>
            ))}

            {active && (
              <div className="absolute bottom-4 left-4 right-4 max-w-sm rounded-3xl border border-line bg-card p-3 shadow-lift sm:right-auto">
                <button
                  onClick={() => setActiveId(null)}
                  aria-label="Close preview"
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background"
                >
                  <X className="size-3.5" />
                </button>
                <div className="flex gap-3">
                  <img
                    src={active.images[0]}
                    alt={active.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-semibold">{active.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {active.area}, {active.city}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs">
                      <Star className="size-3.5 fill-gold text-gold" /> {active.rating.toFixed(1)} ·{" "}
                      {active.distanceKm} km
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-display text-base font-semibold">{formatINR(active.rent)}</span>
                      <Link
                        to="/pg/$id"
                        params={{ id: active.id }}
                        className="rounded-lg bg-ink px-3 py-1.5 text-[11px] font-semibold text-cream hover:bg-brand"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
            <h2 className="font-display text-lg font-semibold">Nearby PGs</h2>
            {list.length === 0 && (
              <p className="rounded-2xl border border-dashed border-line bg-card p-6 text-center text-sm text-muted-foreground">
                No PGs match these filters.
              </p>
            )}
            {list.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={cn(
                  "flex w-full gap-3 rounded-2xl border bg-card p-3 text-left transition-colors",
                  p.id === activeId ? "border-brand" : "border-line hover:border-brand/50",
                )}
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="size-16 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <MapPin className="size-3" /> {p.area} · {p.distanceKm} km
                  </p>
                  <p className="mt-1 text-sm font-semibold">{formatINR(p.rent)}/mo</p>
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(p.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      toggleFavorite(p.id);
                    }
                  }}
                  aria-label={`Save ${p.name}`}
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-background"
                >
                  <Heart
                    className={cn(
                      "size-4",
                      isFavorite(p.id) ? "fill-brand text-brand" : "text-muted-foreground",
                    )}
                  />
                </span>
              </button>
            ))}
          </aside>
        </div>
      </div>
    </Layout>
  );
}
