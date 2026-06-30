import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Shield,
  Sparkles,
  Wallet as WalletIcon,
  ShieldCheck,
  LogOut,
  User,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WalletCard } from "@/components/wallet-card";
import { WalletDetail } from "@/components/wallet-detail";
import { useAuth } from "@/components/auth-provider";
import {
  WalletFinder,
  matchesWalletFinder,
  type WalletFinderCriteria,
} from "@/components/wallet-finder";
import {
  WALLETS,
  ALL_CLIENTS,
  ALL_REGIONS,
  type Wallet,
  type ClientType,
  type Region,
  type WalletKind,
  type Custody,
} from "@/lib/wallets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fraktur — AI-Powered Security for Bitcoin Companies" },
      {
        name: "description",
        content:
          "Compare wallet architecture, custody, protocols, and vulnerability track records for Bitcoin companies.",
      },
      { property: "og:title", content: "Fraktur — AI-Powered Security for Bitcoin Companies" },
      {
        property: "og:description",
        content: "Wallet & exchange directory with multi-signature, protocol, and security filters.",
      },
    ],
  }),
  component: Index,
});

type TypeFilter = "all" | WalletKind | Custody;

function Index() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [platform, setPlatform] = useState<ClientType | "all">("all");
  const [selected, setSelected] = useState<Wallet | null>(null);
  const [open, setOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderCriteria, setFinderCriteria] = useState<WalletFinderCriteria | null>(null);
  const { isPremium, openPricing, isAuthenticated, user, logout } = useAuth();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WALLETS.filter((w) => {
      if (q) {
        const hay = `${w.name} ${w.company} ${w.tagline} ${w.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (region !== "all" && w.region !== region) return false;
      if (type === "Wallet" || type === "Exchange") {
        if (w.kind !== type) return false;
      } else if (type === "Self-custodial" || type === "Custodial") {
        if (w.custody !== type) return false;
      }
      if (platform !== "all" && !w.clients.includes(platform)) return false;
      if (finderCriteria && !matchesWalletFinder(w, finderCriteria)) return false;
      return true;
    });
  }, [query, region, type, platform, finderCriteria]);

  const hasFilters =
    query.trim() !== "" || region !== "all" || type !== "all" || platform !== "all" || finderCriteria;

  function clearFilters() {
    setQuery("");
    setRegion("all");
    setType("all");
    setPlatform("all");
    setFinderCriteria(null);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-white/15 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/favicon.svg" alt="Fraktur" className="h-10 w-10 shrink-0 rounded-xl" />
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight text-white sm:text-lg">
                Fraktur
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                AI-Powered Security for Bitcoin Companies
              </p>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-card px-3 py-1.5 sm:flex">
                  <User className="h-3.5 w-3.5 text-bitcoin" />
                  <span className="max-w-[120px] truncate text-[11px] font-medium">{user?.name}</span>
                  {isPremium && (
                    <Badge className="border-0 bg-bitcoin/20 text-[10px] text-bitcoin">Enterprise</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground">
                  <LogOut className="mr-1.5 h-4 w-4" /> Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="border-white/15">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="text-primary-foreground"
                  style={{ background: "var(--gradient-bitcoin)" }}
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFinderOpen(true)}
              className="hidden border-bitcoin/40 text-bitcoin hover:bg-bitcoin/10 sm:inline-flex"
            >
              <WalletIcon className="mr-1.5 h-4 w-4" /> Find your wallet
            </Button>
            {!isPremium && (
              <Button
                size="sm"
                onClick={openPricing}
                className="text-primary-foreground hover:opacity-90"
                style={{ background: "var(--gradient-bitcoin)" }}
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Upgrade
              </Button>
            )}
            {isPremium && (
              <div className="hidden items-center gap-1.5 rounded-full border border-bitcoin/30 bg-bitcoin/10 px-3 py-1.5 sm:flex">
                <ShieldCheck className="h-3.5 w-3.5 text-bitcoin" />
                <span className="text-[11px] font-medium text-bitcoin">Enterprise</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section className="mb-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Search and filter wallets
          </p>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wallet names…"
              className="h-11 border-white/15 bg-card/60 pl-9"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Select value={region} onValueChange={(v) => setRegion(v as Region | "all")}>
              <SelectTrigger className="h-11 border-white/15 bg-card/60">
                <SelectValue placeholder="All regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All regions</SelectItem>
                {ALL_REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={(v) => setType(v as TypeFilter)}>
              <SelectTrigger className="h-11 border-white/15 bg-card/60">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="Wallet">Wallet</SelectItem>
                <SelectItem value="Exchange">Exchange</SelectItem>
                <SelectItem value="Self-custodial">Self-custodial</SelectItem>
                <SelectItem value="Custodial">Custodial</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platform} onValueChange={(v) => setPlatform(v as ClientType | "all")}>
              <SelectTrigger className="h-11 border-white/15 bg-card/60">
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                {ALL_CLIENTS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            onClick={() => setFinderOpen(true)}
            className="mt-3 h-11 w-full border-bitcoin/40 text-bitcoin hover:bg-bitcoin/10 sm:w-auto"
          >
            <WalletIcon className="mr-1.5 h-4 w-4" /> Find your wallet
          </Button>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}

          {finderCriteria && (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-bitcoin/30 bg-bitcoin/5 p-3 text-xs">
              <WalletIcon className="h-4 w-4 text-bitcoin" />
              <span className="font-medium text-foreground">Find your wallet filter active</span>
              {finderCriteria.lightning && (
                <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">Lightning</Badge>
              )}
              {finderCriteria.selfCustody && (
                <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">Self-custody</Badge>
              )}
              {finderCriteria.mobile && (
                <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">Mobile</Badge>
              )}
              {finderCriteria.multiSig && (
                <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">Multi-Signature</Badge>
              )}
              {finderCriteria.standardSeed && (
                <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">BIP-39</Badge>
              )}
              <button
                type="button"
                onClick={() => setFinderCriteria(null)}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                Remove
              </button>
            </div>
          )}
        </section>

        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "wallet" : "wallets"}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 bg-card/40 p-12 text-center">
            <Shield className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No wallets match your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((w) => (
              <WalletCard
                key={w.id}
                wallet={w}
                onSelect={() => {
                  setSelected(w);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-white/12 py-6 text-center text-xs text-muted-foreground">
        Fraktur — Always verify with primary sources. All logos are trademarks of their respective owners.
      </footer>

      <WalletDetail wallet={selected} open={open} onOpenChange={setOpen} />
      <WalletFinder open={finderOpen} onOpenChange={setFinderOpen} onApply={setFinderCriteria} />
    </div>
  );
}
