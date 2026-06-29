import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import type { Wallet } from "@/lib/wallets";

function ReproIcon({ repro }: { repro: Wallet["reproducibility"] }) {
  if (repro === "Reproducible") return <ShieldCheck className="h-4 w-4 text-success" />;
  if (repro === "Not Reproducible") return <ShieldAlert className="h-4 w-4 text-warning" />;
  return <ShieldQuestion className="h-4 w-4 text-muted-foreground" />;
}

export function WalletCard({ wallet, onSelect }: { wallet: Wallet; onSelect: () => void }) {
  const primary = wallet.languages[0];
  const isOpen = wallet.codeAccess === "Open Source";

  return (
    <Card
      onClick={onSelect}
      className="glass-card group cursor-pointer overflow-hidden border-border/60 bg-card p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-bitcoin/60 hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-bold text-primary-foreground"
              style={{ background: "var(--gradient-bitcoin)" }}
            >
              {wallet.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold leading-tight text-foreground">
                {wallet.name}
              </h3>
              <p className="truncate text-xs text-muted-foreground">{wallet.company}</p>
            </div>
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

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{wallet.tagline}</p>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate font-medium text-foreground">{primary.name}</span>
            {wallet.isMultiSig && (
              <span className="shrink-0 rounded-full border border-bitcoin/30 bg-bitcoin/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-bitcoin">
                Multi-Signature
              </span>
            )}
          </div>
          <span className="shrink-0 text-muted-foreground">{primary.percent}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-bitcoin transition-all"
            style={{ width: `${primary.percent}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {wallet.clients.map((c) => (
          <Badge key={c} variant="secondary" className="text-[10px] font-medium">
            {c}
          </Badge>
        ))}
      </div>
    </Card>
  );
}