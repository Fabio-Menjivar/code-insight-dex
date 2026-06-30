import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Zap,
  Link2,
  KeyRound,
  Building2,
  Smartphone,
  Monitor,
  HardDrive,
  Globe,
} from "lucide-react";
import type { Wallet, ProtocolTag, ClientType } from "@/lib/wallets";
import { WalletLogo } from "@/components/wallet-logo";

function ReproIcon({ repro }: { repro: Wallet["reproducibility"] }) {
  if (repro === "Reproducible") return <ShieldCheck className="h-4 w-4 text-success" />;
  if (repro === "Not Reproducible") return <ShieldAlert className="h-4 w-4 text-warning" />;
  return <ShieldQuestion className="h-4 w-4 text-muted-foreground" />;
}

const PROTOCOL_STYLES: Record<
  ProtocolTag,
  { className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  Lightning: { className: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400", icon: Zap },
  "On-chain": { className: "border-orange-500/40 bg-orange-500/10 text-orange-400", icon: Link2 },
  EVM: { className: "border-violet-500/40 bg-violet-500/10 text-violet-400", icon: Globe },
  CoinJoin: { className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400", icon: ShieldCheck },
  "Multi-chain": { className: "border-sky-500/40 bg-sky-500/10 text-sky-400", icon: Link2 },
};

const CLIENT_ICONS: Record<ClientType, React.ComponentType<{ className?: string }>> = {
  Mobile: Smartphone,
  Desktop: Monitor,
  Hardware: HardDrive,
  "Browser Extension": Globe,
};

export function WalletCard({ wallet, onSelect }: { wallet: Wallet; onSelect: () => void }) {
  const isOpen = wallet.codeAccess === "Open Source";
  const isCustodial = wallet.custody === "Custodial";

  return (
    <Card
      onClick={onSelect}
      className="glass-card group cursor-pointer overflow-hidden border-white/12 bg-card p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin/50 hover:bg-white/[0.06] hover:shadow-[0_16px_48px_-12px_rgba(247,147,26,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <WalletLogo wallet={wallet} size="md" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-tight text-foreground group-hover:text-white">
              {wallet.name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{wallet.company}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {isOpen ? (
            <Unlock className="h-4 w-4 text-success" />
          ) : (
            <Lock className="h-4 w-4 text-warning" />
          )}
          <ReproIcon repro={wallet.reproducibility} />
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground group-hover:text-foreground/80">
        {wallet.tagline}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {wallet.protocols.map((p) => {
          const style = PROTOCOL_STYLES[p];
          const Icon = style.icon;
          return (
            <span
              key={p}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.className}`}
            >
              <Icon className="h-3 w-3" />
              {p}
            </span>
          );
        })}
        {isCustodial ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">
            <Building2 className="h-3 w-3" />
            Custodial
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
            <KeyRound className="h-3 w-3" />
            Self-Custody
          </span>
        )}
        {wallet.isMultiSig && (
          <span className="inline-flex items-center rounded-md border border-bitcoin/40 bg-bitcoin/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-bitcoin">
            Multi-Signature
          </span>
        )}
        {wallet.kind === "Exchange" && (
          <span className="inline-flex items-center rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
            Exchange
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {wallet.clients.map((c) => {
          const Icon = CLIENT_ICONS[c];
          return (
            <Badge key={c} variant="secondary" className="gap-1 text-[10px] font-medium">
              <Icon className="h-3 w-3" />
              {c}
            </Badge>
          );
        })}
      </div>
    </Card>
  );
}
