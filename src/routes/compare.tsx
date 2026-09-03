import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, Scale, X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PGS, formatINR, type PG } from "@/data/pgs";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare PGs Side by Side — PGFinder" },
      {
        name: "description",
        content: "Compare up to three PGs on rent, deposit, distance, rating, food, Wi-Fi and more.",
      },
      { property: "og:title", content: "Compare PGs Side by Side — PGFinder" },
      { property: "og:description", content: "Line up three PGs and see which one wins on value." },
    ],
  }),
  component: ComparePage,
});

const score = (p: PG) =>
  Math.round(
    (p.rating / 5) * 45 +
      (1 - Math.min(p.rent, 15000) / 15000) * 30 +
      (1 - Math.min(p.distanceKm, 10) / 10) * 15 +
      (p.amenities.length / 8) * 10,
  );

function ComparePage() {
  const { compare, removeCompare, toggleCompare, clearCompare } = useAppState();
  const selected = PGS.filter((p) => compare.includes(p.id));

  const best = {
    rent: Math.min(...selected.map((p) => p.rent)),
    deposit: Math.min(...selected.map((p) => p.deposit)),
    distance: Math.min(...selected.map((p) => p.distanceKm)),
    rating: Math.max(...selected.map((p) => p.rating)),
    score: Math.max(...selected.map(score)),
  };

  const rows: { label: string; render: (p: PG) => React.ReactNode; isBest?: (p: PG) => boolean }[] = [
    { label: "Location", render: (p) => `${p.area}, ${p.city}` },
    {
      label: "Monthly rent",
      render: (p) => formatINR(p.rent),
      isBest: (p) => p.rent === best.rent,
    },
    { label: "Deposit", render: (p) => formatINR(p.deposit), isBest: (p) => p.deposit === best.deposit },
    {
      label: "Distance",
      render: (p) => `${p.distanceKm} km`,
      isBest: (p) => p.distanceKm === best.distance,
    },
    { label: "Rating", render: (p) => `${p.rating.toFixed(1)} ★`, isBest: (p) => p.rating === best.rating },
    { label: "Room types", render: (p) => p.roomTypes.join(", ") },
    ...(["Food", "Wi-Fi", "Laundry", "AC", "Parking"] as const).map((a) => ({
      label: a,
      render: (p: PG) =>
        p.amenities.includes(a) ? (
          <Check className="size-4 text-brand" />
        ) : (
          <Minus className="size-4 text-muted-foreground" />
        ),
      isBest: (p: PG) => p.amenities.includes(a),
    })),
    { label: "Security", render: () => <Check className="size-4 text-brand" /> },
    {
      label: "Overall score",
      render: (p) => `${score(p)}/100`,
      isBest: (p) => score(p) === best.score,
    },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">Compare PGs</h1>
            <p className="mt-2 text-muted-foreground">
              Pick up to 3 PGs. The best value in each row is highlighted.
            </p>
          </div>
          {selected.length > 0 && (
            <button
              onClick={clearCompare}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-destructive"
            >
              Clear comparison
            </button>
          )}
        </div>

        {selected.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-line bg-card p-12 text-center shadow-soft">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-sun text-brand">
              <Scale className="size-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold">Nothing to compare yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add PGs from the listings using the compare button on each card.
            </p>
            <Link
              to="/search"
              className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-brand-dark"
            >
              Explore PGs
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-card shadow-soft">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="w-40 p-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Details
                  </th>
                  {selected.map((p) => (
                    <th key={p.id} className="p-4 text-left align-top">
                      <div className="relative">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="aspect-[16/10] w-full rounded-2xl object-cover"
                        />
                        <button
                          onClick={() => removeCompare(p.id)}
                          aria-label={`Remove ${p.name} from comparison`}
                          className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-card/90 shadow-sm"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <p className="mt-3 font-display text-base font-semibold">{p.name}</p>
                      <Link
                        to="/pg/$id"
                        params={{ id: p.id }}
                        className="mt-2 inline-block rounded-xl bg-ink px-3 py-1.5 text-xs font-semibold text-cream hover:bg-brand"
                      >
                        View Details
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-0">
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {row.label}
                    </th>
                    {selected.map((p) => (
                      <td
                        key={p.id}
                        className={cn(
                          "p-4 align-middle",
                          row.isBest?.(p) && "bg-sun font-semibold text-brand-dark",
                        )}
                      >
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected.length > 0 && selected.length < 3 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Add another PG</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PGS.filter((p) => !compare.includes(p.id))
                .slice(0, 3)
                .map((p) => (
                  <button
                    key={p.id}
                    onClick={() => toggleCompare(p.id)}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3 text-left transition-colors hover:border-brand/50"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="size-14 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.area} · {formatINR(p.rent)}/mo
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
