import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-gold font-display text-lg font-bold text-primary-foreground">
              P
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">PGFinder</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Find a place that feels like home. Verified PGs, hostels and shared rooms near India's top colleges
            and workplaces.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="PGFinder social profile"
                className="grid size-9 place-items-center rounded-full border border-line text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-brand">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-brand">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/search" className="hover:text-brand">
                  Find PGs
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-brand">
                  Map view
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-brand">
                  Compare
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted-foreground">
        © 2026 PGFinder. Listings shown are sample data for demonstration.
      </div>
    </footer>
  );
}
