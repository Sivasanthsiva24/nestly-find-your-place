import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Home, Map, Menu, Scale, Search, User, X } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { toast } from "sonner";

const LINKS = [
  { to: "/search", label: "Find PGs" },
  { to: "/compare", label: "Compare" },
  { to: "/favorites", label: "Favorites" },
  { to: "/map", label: "Map" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { favorites, compare } = useAppState();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-gold font-display text-lg font-bold text-primary-foreground shadow-sm">
            P
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">PGFinder</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-brand" }}
              className="transition-colors hover:text-brand"
            >
              {l.label}
              {l.to === "/favorites" && favorites.length > 0 && (
                <span className="ml-1 rounded-full bg-sun px-1.5 py-0.5 text-[10px] font-bold text-brand-dark">
                  {favorites.length}
                </span>
              )}
              {l.to === "/compare" && compare.length > 0 && (
                <span className="ml-1 rounded-full bg-sun px-1.5 py-0.5 text-[10px] font-bold text-brand-dark">
                  {compare.length}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => toast.success("Owner onboarding opens soon — we'll email you the listing form.")}
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            List Your PG
          </button>
          <button
            aria-label="Profile"
            onClick={() => toast.message("Profiles are coming soon to PGFinder.")}
            className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-gold to-brand text-sm font-bold text-primary-foreground"
          >
            A
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-xl border border-line bg-card text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-card px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-sun"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              toast.success("Owner onboarding opens soon — we'll email you the listing form.");
            }}
            className="mt-2 w-full rounded-xl bg-brand px-3 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            List Your PG
          </button>
        </nav>
      )}
    </header>
  );
}

const MOBILE_TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/favorites", label: "Saved", icon: Heart },
  { to: "/compare", label: "Compare", icon: Scale },
  { to: "/map", label: "Map", icon: Map },
] as const;

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
        {MOBILE_TABS.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-brand" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium"
            >
              <Icon className="size-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ProfileIconPlaceholder() {
  return <User className="size-4" />;
}
