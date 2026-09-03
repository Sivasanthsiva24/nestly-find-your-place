import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Scale, Star } from "lucide-react";
import { formatINR, type PG } from "@/data/pgs";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export function PGCard({ pg, showCompare = true }: { pg: PG; showCompare?: boolean }) {
  const { isFavorite, toggleFavorite, inCompare, toggleCompare } = useAppState();
  const fav = isFavorite(pg.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <Link to="/pg/$id" params={{ id: pg.id }} aria-label={`View ${pg.name}`}>
          <img
            src={pg.images[0]}
            alt={`${pg.name} in ${pg.area}, ${pg.city}`}
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-[4/3] w-full object-cover"
          />
        </Link>
        <button
          onClick={() => toggleFavorite(pg.id)}
          aria-label={fav ? `Remove ${pg.name} from favorites` : `Save ${pg.name} to favorites`}
          aria-pressed={fav}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 shadow-sm transition-transform hover:scale-105"
        >
          <Heart
            className={cn("size-4", fav ? "fill-brand text-brand heart-pop" : "text-muted-foreground")}
          />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold shadow-sm">
          {pg.gender}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-gold text-gold" />
          <span className="font-semibold text-foreground">{pg.rating.toFixed(1)}</span>
          <span>· {pg.reviewCount} reviews</span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug">
          <Link to="/pg/$id" params={{ id: pg.id }} className="hover:text-brand">
            {pg.name}
          </Link>
        </h3>
        <p className="mt-0.5 flex items-start gap-1 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0" />
          <span>
            {pg.area}, {pg.city} · {pg.distanceKm} km from {pg.college.split(" ").slice(0, 2).join(" ")}
          </span>
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
          {pg.amenities.slice(0, 4).map((a) => (
            <span key={a} className="rounded-full bg-sun px-2 py-0.5 text-accent-foreground">
              {a}
            </span>
          ))}
          {pg.amenities.length > 4 && (
            <span className="rounded-full bg-sun px-2 py-0.5 text-accent-foreground">
              +{pg.amenities.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-xl font-semibold">
            {formatINR(pg.rent)}
            <span className="font-sans text-sm font-normal text-muted-foreground">/mo</span>
          </span>
          <div className="flex items-center gap-2">
            {showCompare && (
              <button
                onClick={() => toggleCompare(pg.id)}
                aria-label={inCompare(pg.id) ? "Remove from compare" : "Add to compare"}
                aria-pressed={inCompare(pg.id)}
                className={cn(
                  "grid size-9 place-items-center rounded-xl border transition-colors",
                  inCompare(pg.id)
                    ? "border-brand bg-sun text-brand"
                    : "border-line text-muted-foreground hover:text-brand",
                )}
              >
                <Scale className="size-4" />
              </button>
            )}
            <Link
              to="/pg/$id"
              params={{ id: pg.id }}
              className="rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-brand"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PGCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-soft">
      <div className="aspect-[4/3] w-full animate-pulse bg-sun" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-sun" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-sun" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-sun" />
        <div className="h-8 w-full animate-pulse rounded bg-sun" />
      </div>
    </div>
  );
}
