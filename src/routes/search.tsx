import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, Search as SearchIcon, X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PGCard, PGCardSkeleton } from "@/components/site/PGCard";
import { AMENITIES, GENDERS, PGS, ROOM_TYPES, formatINR } from "@/data/pgs";
import type { Amenity, Gender, RoomType } from "@/data/pgs";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SearchParams = { q?: string | undefined; max?: number | undefined };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" && search["q"] ? (search["q"] as string) : undefined,
    max: typeof search["max"] === "number" && (search["max"] as number) > 0 ? (search["max"] as number) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search PGs & Hostels — PGFinder" },
      {
        name: "description",
        content: "Filter PGs by budget, room type, gender, amenities, distance and rating across Indian cities.",
      },
      { property: "og:title", content: "Search PGs & Hostels — PGFinder" },
      { property: "og:description", content: "Filter verified PGs by budget, amenities, distance and rating." },
    ],
  }),
  component: SearchPage,
});

const SORTS = ["Recommended", "Price: Low to High", "Price: High to Low", "Highest Rated", "Nearest"] as const;
const DISTANCES = [1, 3, 5, 10] as const;

function SearchPage() {
  const { q, max } = Route.useSearch();
  const [location, setLocation] = useState(q ?? "");
  const [range, setRange] = useState<[number, number]>([3000, max ?? 15000]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Recommended");
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => setLocation(q ?? ""), [q]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [location, range, roomTypes, genders, amenities, distance, minRating, sort]);

  const toggle = <T,>(list: T[], set: (v: T[]) => void, value: T) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const term = location.trim().toLowerCase();
    let out = PGS.filter((p) => {
      if (term) {
        const hay = `${p.name} ${p.area} ${p.city} ${p.college}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (p.rent < range[0] || p.rent > range[1]) return false;
      if (roomTypes.length && !roomTypes.some((r) => p.roomTypes.includes(r))) return false;
      if (genders.length && !genders.includes(p.gender)) return false;
      if (amenities.length && !amenities.every((a) => p.amenities.includes(a))) return false;
      if (distance !== null && p.distanceKm > distance) return false;
      if (minRating !== null && p.rating < minRating) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      switch (sort) {
        case "Price: Low to High":
          return a.rent - b.rent;
        case "Price: High to Low":
          return b.rent - a.rent;
        case "Highest Rated":
          return b.rating - a.rating;
        case "Nearest":
          return a.distanceKm - b.distanceKm;
        default:
          return b.rating * 100 - b.reviewCount / 10 - (a.rating * 100 - a.reviewCount / 10);
      }
    });
    return out;
  }, [location, range, roomTypes, genders, amenities, distance, minRating, sort]);

  const clearAll = () => {
    setLocation("");
    setRange([3000, 15000]);
    setRoomTypes([]);
    setGenders([]);
    setAmenities([]);
    setDistance(null);
    setMinRating(null);
  };

  const filters = (
    <div className="space-y-6">
      <FilterBlock title="Location">
        <input
          aria-label="Search location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Area, city or college"
          className="w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
      </FilterBlock>

      <FilterBlock title="Monthly Budget">
        <div className="flex items-center gap-2">
          <input
            aria-label="Minimum price"
            type="number"
            value={range[0]}
            onChange={(e) => setRange([Number(e.target.value), range[1]])}
            className="w-full rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <span className="text-muted-foreground">–</span>
          <input
            aria-label="Maximum price"
            type="number"
            value={range[1]}
            onChange={(e) => setRange([range[0], Number(e.target.value)])}
            className="w-full rounded-xl border border-line bg-background px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <Slider
          className="mt-4"
          value={range}
          min={3000}
          max={15000}
          step={100}
          onValueChange={(v) => setRange([v[0] ?? 3000, v[1] ?? 15000] as [number, number])}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {formatINR(range[0])} – {formatINR(range[1])} per month
        </p>
      </FilterBlock>

      <FilterBlock title="Room Type">
        {ROOM_TYPES.map((r) => (
          <CheckRow
            key={r}
            label={r}
            checked={roomTypes.includes(r)}
            onChange={() => toggle(roomTypes, setRoomTypes, r)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title="Gender">
        {GENDERS.map((g) => (
          <CheckRow key={g} label={g} checked={genders.includes(g)} onChange={() => toggle(genders, setGenders, g)} />
        ))}
      </FilterBlock>

      <FilterBlock title="Amenities">
        <div className="flex flex-wrap gap-1.5">
          {AMENITIES.map((a) => (
            <button
              key={a}
              onClick={() => toggle(amenities, setAmenities, a)}
              aria-pressed={amenities.includes(a)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                amenities.includes(a)
                  ? "border-brand bg-brand text-primary-foreground"
                  : "border-line bg-background hover:border-brand/50",
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Distance">
        {DISTANCES.map((d) => (
          <CheckRow
            key={d}
            type="radio"
            label={`Within ${d} km`}
            checked={distance === d}
            onChange={() => setDistance(distance === d ? null : d)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title="Rating">
        {[4, 3].map((r) => (
          <CheckRow
            key={r}
            type="radio"
            label={`${r}+ stars`}
            checked={minRating === r}
            onChange={() => setMinRating(minRating === r ? null : r)}
          />
        ))}
      </FilterBlock>

      <button
        onClick={clearAll}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-brand"
      >
        <X className="size-4" /> Clear all filters
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Find PGs</h1>
        <p className="mt-2 text-muted-foreground">Verified stays near colleges and workplaces across India.</p>

        <div className="mt-8 lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-line bg-card p-5 shadow-soft">
              {filters}
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-3 rounded-3xl border border-line bg-card p-4 shadow-soft sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-background px-3 py-2.5">
                <SearchIcon className="size-4 text-muted-foreground" />
                <input
                  aria-label="Search PGs"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search by PG, area, city or college"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm font-semibold lg:hidden">
                      <SlidersHorizontal className="size-4" /> Filters
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
                    <SheetHeader>
                      <SheetTitle className="font-display">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="px-4 pb-8">{filters}</div>
                  </SheetContent>
                </Sheet>
                <select
                  aria-label="Sort results"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
                  className="rounded-xl border border-line bg-background px-3 py-2.5 text-sm font-medium outline-none focus:border-brand"
                >
                  {SORTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {loading ? "Searching…" : `${results.length} ${results.length === 1 ? "PG" : "PGs"} found`}
            </p>

            {loading ? (
              <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PGCardSkeleton key={i} />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-dashed border-line bg-card p-12 text-center shadow-soft">
                <h2 className="font-display text-xl font-semibold">No PGs match these filters</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try widening your budget or clearing a filter or two.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-brand-dark"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {results.slice(0, visible).map((pg) => (
                    <PGCard key={pg.id} pg={pg} />
                  ))}
                </div>
                {visible < results.length && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisible((v) => v + 6)}
                      className="rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold shadow-soft transition-colors hover:border-brand/50 hover:text-brand"
                    >
                      Load more PGs
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
  type = "checkbox",
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type={type}
        checked={checked}
        onChange={onChange}
        className="size-4 accent-[oklch(0.688_0.144_51.5)]"
      />
      <span>{label}</span>
    </label>
  );
}
