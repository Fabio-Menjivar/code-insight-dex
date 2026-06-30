import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PremiumOverlay } from "@/components/premium-overlay";
import { SecurityArchitecturePanel } from "@/components/security-panel";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Lock,
  Unlock,
  ExternalLink,
  Check,
  X,
  KeyRound,
  Github,
  BarChart3,
} from "lucide-react";
import type { Wallet } from "@/lib/wallets";
import { WalletLogo } from "@/components/wallet-logo";

const LANG_COLORS = [
  "var(--bitcoin)",
  "var(--bitcoin-glow)",
  "oklch(0.65 0.16 150)",
  "oklch(0.6 0.12 220)",
  "oklch(0.7 0.15 320)",
];

function StatusBadge({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone: "success" | "warning" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const toneClass =
    tone === "success"
      ? "border-success/30 bg-success/10 text-success"
      : tone === "warning"
        ? "border-warning/30 bg-warning/10 text-warning-foreground"
        : "border-border bg-muted text-muted-foreground";

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-3 ${toneClass}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0">
        <div className="text-[11px] font-medium uppercase tracking-wide opacity-80">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function incidentCountColor(total: number) {
  if (total > 10) return "text-warning";
  if (total < 5) return "text-success";
  return "text-foreground";
}

function WalletTrackRecordPanel({ wallet }: { wallet: Wallet }) {
  const { totalIncidents, description } = wallet.vulnerabilityStats;
  const countColor = incidentCountColor(totalIncidents);

  return (
    <div className="glass-card rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-bitcoin">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Historical Vulnerabilities
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            CVEs and disclosed incidents tracked over the wallet&apos;s lifetime.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className={`text-6xl font-bold tabular-nums tracking-tight ${countColor}`}>
          {totalIncidents}
        </div>
        <p className="mt-2 text-sm font-medium text-foreground/80">
          {totalIncidents === 1 ? "recorded incident" : "recorded incidents"}
        </p>
      </div>

      <Separator className="my-6 bg-white/10" />

      <p className="text-sm leading-relaxed text-gray-400">{description}</p>

      {totalIncidents > 10 && (
        <p className="mt-4 rounded-lg border border-warning/20 bg-warning/5 px-3 py-2 text-xs text-warning-foreground">
          High counts often reflect project age and audit surface area — not necessarily current
          risk. Review patch cadence and severity breakdowns before drawing conclusions.
        </p>
      )}
    </div>
  );
}

function OverviewTab({ wallet }: { wallet: Wallet }) {
  const reproTone =
    wallet.reproducibility === "Reproducible"
      ? "success"
      : wallet.reproducibility === "Not Reproducible"
        ? "warning"
        : "neutral";
  const ReproIcon =
    wallet.reproducibility === "Reproducible"
      ? ShieldCheck
      : wallet.reproducibility === "Not Reproducible"
        ? ShieldAlert
        : ShieldQuestion;

  return (
    <div className="space-y-5">
      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-success">
            <Check className="h-3.5 w-3.5" /> Pros
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            {wallet.pros.map((p) => (
              <li key={p} className="text-foreground/90">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-destructive">
            <X className="h-3.5 w-3.5" /> Cons
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            {wallet.cons.map((p) => (
              <li key={p} className="text-foreground/90">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Separator className="bg-border/60" />

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Security & Scrutiny
        </h4>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <StatusBadge
            label="Reproducibility"
            value={wallet.reproducibility}
            tone={reproTone}
            icon={ReproIcon}
          />
          <StatusBadge
            label="Custody"
            value={wallet.custody}
            tone={wallet.custody === "Self-custodial" ? "success" : "warning"}
            icon={KeyRound}
          />
          <StatusBadge
            label="Code Access"
            value={wallet.codeAccess}
            tone={
              wallet.codeAccess === "Open Source"
                ? "success"
                : wallet.codeAccess === "Closed Source"
                  ? "warning"
                  : "neutral"
            }
            icon={wallet.codeAccess === "Open Source" ? Unlock : Lock}
          />
        </div>
      </section>

      <Separator className="bg-border/60" />

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Language Breakdown
        </h4>
        <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-muted">
          {wallet.languages.map((l, i) => (
            <div
              key={l.name}
              className="h-full transition-all"
              style={{ width: `${l.percent}%`, background: LANG_COLORS[i % LANG_COLORS.length] }}
              title={`${l.name} ${l.percent}%`}
            />
          ))}
        </div>
        <ul className="mt-3 space-y-1.5 text-sm">
          {wallet.languages.map((l, i) => (
            <li key={l.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ background: LANG_COLORS[i % LANG_COLORS.length] }}
                />
                <span className="text-foreground">{l.name}</span>
                {wallet.isMultiSig && i === 0 && (
                  <span className="rounded-full border border-bitcoin/30 bg-bitcoin/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-bitcoin">
                    Multi-Signature
                  </span>
                )}
              </span>
              <span className="text-muted-foreground">{l.percent}%</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="bg-border/60" />

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Key Characteristics
        </h4>
        <ul className="mt-3 space-y-2 text-sm">
          {wallet.characteristics.map((c) => (
            <li key={c} className="flex items-start gap-2 text-foreground/90">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bitcoin" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {wallet.repoUrl && (
        <>
          <Separator className="bg-border/60" />
          <Button asChild variant="outline" className="w-full border-white/10">
            <a href={wallet.repoUrl} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" /> View Repository{" "}
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          </Button>
        </>
      )}
    </div>
  );
}

export function WalletDetail({
  wallet,
  open,
  onOpenChange,
}: {
  wallet: Wallet | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!wallet) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-white/10 bg-card sm:max-w-xl"
      >
        <SheetHeader className="space-y-3">
          <div className="flex items-start gap-3">
            <WalletLogo wallet={wallet} size="lg" />
            <div className="min-w-0 flex-1">
              <SheetTitle className="truncate text-xl">{wallet.name}</SheetTitle>
              <SheetDescription className="truncate">{wallet.company}</SheetDescription>
            </div>
          </div>
          <p className="text-sm text-foreground/80">{wallet.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {wallet.tags.map((t) => (
              <Badge key={t} variant="outline" className="border-bitcoin/40 text-bitcoin">
                {t}
              </Badge>
            ))}
            {wallet.clients.map((c) => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))}
            {wallet.isMultiSig && (
              <Badge
                variant="outline"
                className="border-bitcoin/40 bg-bitcoin/10 text-bitcoin"
              >
                Multi-Signature
              </Badge>
            )}
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-5">
          <TabsList className="grid w-full grid-cols-3 border border-white/10 bg-white/[0.04] p-1">
            <TabsTrigger
              value="overview"
              className="text-xs data-[state=active]:border data-[state=active]:border-white/10 data-[state=active]:bg-white/[0.06]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="text-xs data-[state=active]:border data-[state=active]:border-white/10 data-[state=active]:bg-white/[0.06]"
            >
              Security Model
            </TabsTrigger>
            <TabsTrigger
              value="track-record"
              className="text-xs data-[state=active]:border data-[state=active]:border-white/10 data-[state=active]:bg-white/[0.06]"
            >
              Track record
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <OverviewTab wallet={wallet} />
          </TabsContent>

          <TabsContent value="security" className="mt-4">
            <div className="mb-3 flex items-center gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Security & Seed Architecture
              </h4>
              <Badge
                className="border-0 text-[10px] text-primary-foreground"
                style={{ background: "var(--gradient-bitcoin)" }}
              >
                Enterprise
              </Badge>
            </div>
            <PremiumOverlay>
              <SecurityArchitecturePanel wallet={wallet} />
            </PremiumOverlay>
          </TabsContent>

          <TabsContent value="track-record" className="mt-4">
            <WalletTrackRecordPanel wallet={wallet} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
