import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, GraduationCap, IndianRupee, Repeat2, Search, ShieldCheck, Star } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PGCard } from "@/components/site/PGCard";
import { CITIES, PGS, TOP_COLLEGES } from "@/data/pgs";
import heroRoom from "@/assets/hero-room.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PGFinder — Find Your Perfect PG Near Your College" },
      {
        name: "description",
        content:
          "Compare PGs, hostels and shared rooms near Indian colleges by price, location, amenities and real student reviews.",
      },
      { property: "og:title", content: "PGFinder — Find Your Perfect PG Near Your College" },
      {
        property: "og:description",
        content: "Verified PGs and hostels near your campus. Compare rent, distance, amenities and reviews.",
      },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { icon: ShieldCheck, title: "Verified Listings", text: "Every PG inspected and confirmed by our team." },
  { icon: Star, title: "Student Reviews", text: "Honest ratings from real students who live there." },
  { icon: Repeat2, title: "Easy Comparison", text: "Line up up to three PGs side by side in seconds." },
  { icon: GraduationCap, title: "Nearby Locations", text: "Find stays right beside your college or workplace." },
];

function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/search",
      search: { q: query || undefined, max: budget ? Number(budget) : undefined },
    });
  };

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="floaty absolute -right-24 -top-24 size-[420px] rounded-full bg-gradient-to-br from-gold/50 to-brand/30 blur-3xl" />
        <div className="absolute -left-32 top-40 size-[360px] rounded-full bg-brand/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3 py-1 text-xs font-semibold text-brand-dark shadow-sm">
              Golden-hour homes for students
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              Find Your Perfect <span className="text-brand">PG</span> Near Your College
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Compare PGs, hostels and shared rooms by price, location, amenities and real student reviews.
            </p>

            <form
              onSubmit={submit}
              className="mt-8 flex flex-col gap-2 rounded-3xl border border-line bg-card p-3 shadow-soft md:flex-row"
            >
              <div className="flex flex-1 items-center gap-2 px-3 py-2">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  aria-label="Enter college, area or city"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Enter college, area or city"
                />
              </div>
              <div className="hidden w-px bg-line md:my-1 md:block" />
              <div className="flex items-center gap-2 px-3 py-2 md:w-44">
                <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
                <input
                  aria-label="Move-in date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm text-muted-foreground outline-none"
                />
              </div>
              <div className="hidden w-px bg-line md:my-1 md:block" />
              <div className="flex items-center gap-2 px-3 py-2 md:w-40">
                <IndianRupee className="size-4 shrink-0 text-muted-foreground" />
                <input
                  aria-label="Budget"
                  type="number"
                  min={0}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Budget"
                />
              </div>
              <button
                type="submit"
                className="whitespace-nowrap rounded-2xl bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark"
              >
                Search PGs
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="self-center text-xs font-medium text-muted-foreground">Popular:</span>
              {CITIES.map((c) => (
                <Link
                  key={c}
                  to="/search"
                  search={{ q: c }}
                  className="rounded-full border border-line bg-sun px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand/50"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src={heroRoom}
              alt="Sunlit PG bedroom with wooden furniture and a study desk"
              width={1080}
              height={1280}
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold">Why PGFinder?</h2>
          <p className="mt-2 text-muted-foreground">Everything you need to feel at home, faster.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-line bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-sun text-brand">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold">Popular PGs</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked homes students love this week.</p>
          </div>
          <Link
            to="/search"
            className="hidden text-sm font-semibold text-brand transition-colors hover:text-brand-dark sm:inline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PGS.slice(0, 6).map((pg) => (
            <PGCard key={pg.id} pg={pg} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Find PGs Near Top Colleges</h2>
        <p className="mt-2 text-muted-foreground">Jump straight to stays around India's busiest campuses.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TOP_COLLEGES.map((c) => (
            <Link
              key={c.name}
              to="/search"
              search={{ q: c.name }}
              className="group rounded-2xl border border-line bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-brand/40"
            >
              <GraduationCap className="size-5 text-brand" />
              <h3 className="mt-3 font-display text-base font-semibold leading-snug">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.city}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-gold px-8 py-14 text-center shadow-lift">
          <div className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-cream/15" />
          <div className="pointer-events-none absolute -bottom-16 -left-8 size-64 rounded-full bg-cream/15" />
          <h2 className="relative font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Ready to find your new home?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-primary-foreground/85">
            Browse verified rooms near your campus. No brokers, no pressure — just a room that fits.
          </p>
          <Link
            to="/search"
            className="relative mt-6 inline-block rounded-full bg-card px-7 py-3 text-sm font-semibold text-brand-dark transition-transform hover:-translate-y-0.5"
          >
            Explore PGs
          </Link>
        </div>
      </section>
    </Layout>
  );
}
