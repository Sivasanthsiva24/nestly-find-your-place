import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartOff } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PGCard } from "@/components/site/PGCard";
import { PGS } from "@/data/pgs";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Saved PGs — PGFinder" },
      { name: "description", content: "Your shortlisted PGs and hostels, ready to compare side by side." },
      { property: "og:title", content: "Saved PGs — PGFinder" },
      { property: "og:description", content: "Your shortlisted PGs and hostels on PGFinder." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, toggleFavorite } = useAppState();
  const saved = PGS.filter((p) => favorites.includes(p.id));

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Saved PGs</h1>
        <p className="mt-2 text-muted-foreground">
          {saved.length > 0
            ? `${saved.length} ${saved.length === 1 ? "place" : "places"} on your shortlist.`
            : "Shortlist places you like and revisit them anytime."}
        </p>

        {saved.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-line bg-card p-12 text-center shadow-soft">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-sun text-brand">
              <HeartOff className="size-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold">No saved PGs yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Save PGs you like and compare them later.
            </p>
            <Link
              to="/search"
              className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark"
            >
              Explore PGs
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((pg) => (
              <div key={pg.id} className="space-y-2">
                <PGCard pg={pg} />
                <button
                  onClick={() => toggleFavorite(pg.id)}
                  className="w-full rounded-xl border border-line bg-card py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                >
                  Remove from favorites
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
