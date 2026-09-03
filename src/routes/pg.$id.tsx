import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bus,
  Check,
  Cross,
  GraduationCap,
  Heart,
  MapPin,
  Share2,
  ShoppingCart,
  Star,
  Train,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { ContactOwnerModal, ScheduleVisitModal } from "@/components/site/Modals";
import { PGS, formatINR, getPG } from "@/data/pgs";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pg/$id")({
  loader: ({ params }) => {
    const pg = getPG(params.id);
    if (!pg) throw notFound();
    return { name: pg.name, area: pg.area, city: pg.city };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "PG not found — PGFinder" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name}, ${loaderData.area} — PGFinder`;
    const description = `Rent, deposit, room options, amenities, house rules and student reviews for ${loaderData.name} in ${loaderData.area}, ${loaderData.city}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PGDetails,
});

const NEARBY_ICONS: Record<string, typeof Bus> = {
  College: GraduationCap,
  "Bus stop": Bus,
  "Railway station": Train,
  Hospital: Cross,
  Supermarket: ShoppingCart,
};

function PGDetails() {
  const { id } = Route.useParams();
  const pg = PGS.find((p) => p.id === id)!;
  const { isFavorite, toggleFavorite } = useAppState();
  const [active, setActive] = useState(0);
  const [room, setRoom] = useState(pg.rooms[0]!);
  const fav = isFavorite(pg.id);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link to="/search" className="hover:text-brand">
            Find PGs
          </Link>
          <span> / {pg.area}, {pg.city}</span>
        </nav>

        <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={pg.images[active]}
              alt={`${pg.name} — photo ${active + 1}`}
              width={1024}
              height={768}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="absolute right-3 top-3 flex gap-2">
              <button
                onClick={() => toggleFavorite(pg.id)}
                aria-label={fav ? "Remove from favorites" : "Save to favorites"}
                className="grid size-10 place-items-center rounded-full bg-card/90 shadow-sm"
              >
                <Heart className={cn("size-4", fav ? "fill-brand text-brand heart-pop" : "text-muted-foreground")} />
              </button>
              <button
                onClick={() => toast.success("Link copied — share it with your friends!")}
                aria-label="Share this PG"
                className="grid size-10 place-items-center rounded-full bg-card/90 shadow-sm"
              >
                <Share2 className="size-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 lg:grid-cols-2">
            {pg.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                className={cn(
                  "overflow-hidden rounded-2xl border-2 transition-all",
                  i === active ? "border-brand" : "border-transparent opacity-80 hover:opacity-100",
                )}
              >
                <img
                  src={img}
                  alt={`${pg.name} thumbnail ${i + 1}`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sun px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                  {pg.gender}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-4 fill-gold text-gold" />
                  <span className="font-semibold">{pg.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({pg.reviewCount} reviews)</span>
                </span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{pg.name}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-4" /> {pg.area}, {pg.city} · {pg.distanceKm} km from {pg.college}
              </p>
              <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                <Stat label="Monthly rent" value={`${formatINR(pg.rent)}/mo`} />
                <Stat label="Security deposit" value={formatINR(pg.deposit)} />
                <Stat label="Available from" value={pg.availableFrom} />
              </dl>
            </header>

            <section>
              <h2 className="font-display text-2xl font-semibold">Room options</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {pg.rooms.map((r) => (
                  <div
                    key={r.type}
                    className={cn(
                      "overflow-hidden rounded-3xl border bg-card shadow-soft transition-colors",
                      room.type === r.type ? "border-brand" : "border-line",
                    )}
                  >
                    <img
                      src={r.image}
                      alt={`${r.type} room at ${pg.name}`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-semibold">{r.type}</h3>
                        <span className="font-display text-lg font-semibold">{formatINR(r.price)}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {r.occupancy} {r.occupancy === 1 ? "person" : "people"} per room ·{" "}
                        {r.available > 0 ? `${r.available} beds available` : "Waitlist"}
                      </p>
                      <button
                        onClick={() => {
                          setRoom(r);
                          toast.success(`${r.type} selected`);
                        }}
                        className={cn(
                          "mt-3 w-full rounded-xl py-2.5 text-sm font-semibold transition-colors",
                          room.type === r.type
                            ? "bg-sun text-brand-dark"
                            : "bg-ink text-cream hover:bg-brand",
                        )}
                      >
                        {room.type === r.type ? "Selected" : "Select Room"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">Amenities</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {pg.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3 text-sm"
                  >
                    <span className="grid size-8 place-items-center rounded-xl bg-sun text-brand">
                      {a === "Wi-Fi" ? <Wifi className="size-4" /> : <Check className="size-4" />}
                    </span>
                    {a}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">About this PG</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{pg.description}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">House rules</h2>
              <dl className="mt-4 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card">
                {pg.rules.map((r) => (
                  <div key={r.label} className="grid gap-1 p-4 sm:grid-cols-[160px_1fr]">
                    <dt className="text-sm font-semibold">{r.label}</dt>
                    <dd className="text-sm text-muted-foreground">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">What's nearby</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {pg.nearby.map((n) => {
                  const Icon = NEARBY_ICONS[n.label] ?? MapPin;
                  return (
                    <div
                      key={n.label}
                      className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-sun text-brand">
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{n.name}</p>
                        <p className="text-xs text-muted-foreground">{n.label}</p>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{n.distance}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">Student reviews</h2>
              <div className="mt-4 space-y-4">
                {pg.reviews.map((r) => (
                  <article key={r.id} className="rounded-3xl border border-line bg-card p-5 shadow-soft">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold to-brand text-sm font-bold text-primary-foreground">
                        {r.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                      <span className="ml-auto flex items-center gap-1 text-sm">
                        <Star className="size-4 fill-gold text-gold" /> {r.rating}.0
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-card p-6 shadow-lift">
              <p className="font-display text-3xl font-semibold">
                {formatINR(room.price)}
                <span className="font-sans text-base font-normal text-muted-foreground">/mo</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Deposit {formatINR(pg.deposit)} · {room.type}
              </p>

              <div className="mt-5 space-y-3">
                <ContactOwnerModal
                  pgName={pg.name}
                  ownerName={pg.owner.name}
                  trigger={
                    <button className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark">
                      Contact Owner
                    </button>
                  }
                />
                <ScheduleVisitModal
                  pgName={pg.name}
                  trigger={
                    <button className="w-full rounded-xl border border-line py-3 text-sm font-semibold transition-colors hover:border-brand/50 hover:text-brand">
                      Schedule Visit
                    </button>
                  }
                />
              </div>

              <div className="mt-5 border-t border-line pt-4 text-sm">
                <p className="font-semibold">{pg.owner.name}</p>
                <p className="text-muted-foreground">{pg.owner.since}</p>
                <p className="text-muted-foreground">{pg.owner.responseTime}</p>
              </div>

              <Link
                to="/compare"
                className="mt-5 block text-center text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Compare with other PGs →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-4 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-display text-lg font-semibold">{value}</dd>
    </div>
  );
}
