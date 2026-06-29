import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Moon, Sun, Bitcoin, X, Sparkles, Building2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { WalletCard } from "@/components/wallet-card";
import { WalletDetail } from "@/components/wallet-detail";
import { usePremium } from "@/components/premium-provider";
import {
  CorporateMatcher,
  matchesCorporate,
  type CorporateCriteria,
} from "@/components/corporate-matcher";
import {
  WALLETS,
  ALL_LANGUAGES,
  ALL_CLIENTS,
  ALL_CODE_ACCESS,
  type Wallet,
  type ClientType,
  type CodeAccess,
} from "@/lib/wallets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WalletStack — Crypto Wallet Architecture Tracker" },
      {
        name: "description",
        content:
          "Inspect the programming languages, security profile and reproducibility of popular Bitcoin and crypto wallets.",
      },
      { property: "og:title", content: "WalletStack — Crypto Wallet Architecture Tracker" },
      {
        property: "og:description",
        content: "Languages, custody and scrutiny status for the wallets you actually use.",
      },
    ],
  }),
  component: Index,
});

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      className="shrink-0"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
        active
          ? "border-bitcoin bg-bitcoin text-primary-foreground shadow-[var(--shadow-elegant)]"
          : "border-border bg-card text-foreground/80 hover:border-bitcoin/60 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function Index() {
  const [query, setQuery] = useState("");
  const [langs, setLangs] = useState<string[]>([]);
  const [clients, setClients] = useState<ClientType[]>([]);
  const [access, setAccess] = useState<CodeAccess[]>([]);
  const [multiSigOnly, setMultiSigOnly] = useState(false);
  const [selected, setSelected] = useState<Wallet | null>(null);
  const [open, setOpen] = useState(false);
  const [matcherOpen, setMatcherOpen] = useState(false);
  const [corporate, setCorporate] = useState<CorporateCriteria | null>(null);
  const { isPremium, togglePremium, openPricing } = usePremium();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WALLETS.filter((w) => {
      if (q) {
        const hay = `${w.name} ${w.company} ${w.tagline} ${w.tags.join(" ")} ${w.languages
          .map((l) => l.name)
          .join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (langs.length && !langs.some((l) => w.languages.some((wl) => wl.name === l))) return false;
      if (clients.length && !clients.some((c) => w.clients.includes(c))) return false;
      if (access.length && !access.includes(w.codeAccess)) return false;
      if (multiSigOnly && !w.isMultiSig) return false;
      if (corporate && !matchesCorporate(w, corporate)) return false;
      return true;
    });
  }, [query, langs, clients, access, multiSigOnly, corporate]);

  const activeFilterCount =
    langs.length +
    clients.length +
    access.length +
    (query ? 1 : 0) +
    (corporate ? 1 : 0) +
    (multiSigOnly ? 1 : 0);

  function clearAll() {
    setQuery("");
    setLangs([]);
    setClients([]);
    setAccess([]);
    setMultiSigOnly(false);
    setCorporate(null);
  }

  function openWallet(w: Wallet) {
    setSelected(w);
    setOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:flex sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-bitcoin)" }}
            >
              <Bitcoin className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight sm:text-lg">
                WalletStack
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Architecture & scrutiny tracker
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 sm:flex">
              <ShieldCheck
                className={`h-3.5 w-3.5 ${isPremium ? "text-bitcoin" : "text-muted-foreground"}`}
              />
              <span className="text-[11px] font-medium text-foreground">Premium</span>
              <Switch checked={isPremium} onCheckedChange={togglePremium} aria-label="Premium user" />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMatcherOpen(true)}
              className="hidden border-bitcoin/40 text-bitcoin hover:bg-bitcoin/10 sm:inline-flex"
            >
              <Building2 className="mr-1.5 h-4 w-4" /> Find Corporate Setup
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/60 bg-gradient-to-b from-bitcoin/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">
              Bitcoin · Lightning · Multi-chain
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Know the code behind your{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-bitcoin)" }}
              >
                wallet
              </span>
              .
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Compare the programming languages, reproducibility, custody model and code access of
              today's most-used crypto wallets — at a glance.
            </p>
          </div>

          {/* Search */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search wallets, companies, languages…"
                className="h-11 pl-9"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setMatcherOpen(true)}
              className="h-11 border-bitcoin/40 text-bitcoin hover:bg-bitcoin/10 sm:hidden"
            >
              <Building2 className="mr-1.5 h-4 w-4" /> Corporate Setup
            </Button>
            {activeFilterCount > 0 && (
              <Button variant="ghost" onClick={clearAll} className="h-11 shrink-0">
                <X className="mr-1.5 h-4 w-4" /> Clear ({activeFilterCount})
              </Button>
            )}
          </div>

          {corporate && (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-bitcoin/30 bg-bitcoin/5 p-3 text-xs">
              <Building2 className="h-4 w-4 text-bitcoin" />
              <span className="font-medium text-foreground">Corporate filter active:</span>
              {corporate.multiSig && <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">Multi-Signature</Badge>}
              {corporate.fullyOpen && <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">No paid deps</Badge>}
              {corporate.bip39 && <Badge variant="outline" className="border-bitcoin/40 text-bitcoin">BIP-39</Badge>}
              <button
                type="button"
                onClick={() => setCorporate(null)}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
        {/* Sidebar Filters */}
        <aside className="mb-8 lg:mb-0">
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
            <FilterGroup title="Multi-Signature & Protocols">
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/40 px-3 py-2.5 backdrop-blur-sm">
                <span className="text-xs font-medium text-foreground">Multi-Signature Only</span>
                <Switch
                  checked={multiSigOnly}
                  onCheckedChange={setMultiSigOnly}
                  aria-label="Show multi-signature wallets only"
                />
              </label>
            </FilterGroup>

            <FilterGroup title="Client Type">
              <div className="flex flex-wrap gap-1.5">
                {ALL_CLIENTS.map((c) => (
                  <FilterChip
                    key={c}
                    active={clients.includes(c)}
                    onClick={() => setClients((s) => toggle(s, c))}
                  >
                    {c}
                  </FilterChip>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Repository Status">
              <div className="flex flex-wrap gap-1.5">
                {ALL_CODE_ACCESS.map((a) => (
                  <FilterChip
                    key={a}
                    active={access.includes(a)}
                    onClick={() => setAccess((s) => toggle(s, a))}
                  >
                    {a}
                  </FilterChip>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Programming Language">
              <div className="flex flex-wrap gap-1.5">
                {ALL_LANGUAGES.map((l) => (
                  <FilterChip
                    key={l}
                    active={langs.includes(l)}
                    onClick={() => setLangs((s) => toggle(s, l))}
                  >
                    {l}
                  </FilterChip>
                ))}
              </div>
            </FilterGroup>
          </div>
        </aside>

        {/* Grid */}
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "wallet" : "wallets"}
            </h3>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No wallets match your filters. Try clearing some.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((w) => (
                <WalletCard key={w.id} wallet={w} onSelect={() => openWallet(w)} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        Data is illustrative. Inspired by WalletScrutiny — verify with the source.
      </footer>

      <WalletDetail wallet={selected} open={open} onOpenChange={setOpen} />
      <CorporateMatcher
        open={matcherOpen}
        onOpenChange={setMatcherOpen}
        onApply={setCorporate}
      />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h4>
      {children}
    </div>
  );
}
