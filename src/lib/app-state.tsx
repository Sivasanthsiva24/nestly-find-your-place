import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { getPG } from "@/data/pgs";

type AppState = {
  favorites: string[];
  compare: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  inCompare: (id: string) => boolean;
};

const Ctx = createContext<AppState | null>(null);

const FAV_KEY = "pgfinder:favorites";
const CMP_KEY = "pgfinder:compare";

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(read(FAV_KEY));
    setCompare(read(CMP_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CMP_KEY, JSON.stringify(compare));
  }, [compare, hydrated]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const has = prev.includes(id);
      const name = getPG(id)?.name ?? "PG";
      toast[has ? "message" : "success"](has ? `Removed ${name} from favorites` : `Saved ${name} to favorites`);
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) {
        toast.error("You can compare up to 3 PGs at a time");
        return prev;
      }
      toast.success(`Added ${getPG(id)?.name ?? "PG"} to compare`);
      return [...prev, id];
    });
  }, []);

  const value = useMemo<AppState>(
    () => ({
      favorites,
      compare,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      toggleCompare,
      removeCompare: (id) => setCompare((p) => p.filter((x) => x !== id)),
      clearCompare: () => setCompare([]),
      inCompare: (id) => compare.includes(id),
    }),
    [favorites, compare, toggleFavorite, toggleCompare],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
