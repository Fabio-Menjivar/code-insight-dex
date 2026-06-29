import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, ShieldQuestion, Server, Users, Cpu, Gift, Briefcase } from "lucide-react";
import type { Wallet } from "@/lib/wallets";

function SeedRiskBlock({ wallet }: { wallet: Wallet }) {
  const tone =
    wallet.seedRisk === "Standard"
      ? { color: "text-success", bg: "bg-success/10", border: "border-success/30", Icon: ShieldCheck, line: "Portable: funds can be recovered in any BIP-39 compliant wallet." }
      : wallet.seedRisk === "Non-Standard"
        ? { color: "text-warning-foreground", bg: "bg-warning/10", border: "border-warning/40", Icon: ShieldAlert, line: "Limited portability: recovery requires this wallet or a compatible client." }
        : { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", Icon: ShieldQuestion, line: "Proprietary entropy: funds cannot be recovered in standard wallets without the vendor's tooling." };

  return (
    <div className={`rounded-lg border p-4 ${tone.bg} ${tone.border}`}>
      <div className="flex items-start gap-3">
        <tone.Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone.color}`} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Seed Engine
            </span>
            <Badge variant="outline" className={`${tone.color} border-current`}>
              {wallet.seedRisk}
            </Badge>
          </div>
          <p className="mt-1 text-sm font-medium text-foreground">{wallet.seedModel}</p>
          <p className="mt-1 text-xs text-muted-foreground">{tone.line}</p>
        </div>
      </div>
    </div>
  );
}

function MultiSigMatrix({ wallet }: { wallet: Wallet }) {
  const cells: Array<{ kind: Wallet["multiSigKind"]; label: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { kind: "Native", label: "Standalone", Icon: ShieldCheck },
    { kind: "Coordinator", label: "Coordinator", Icon: Users },
    { kind: "Server-Dependent", label: "Server", Icon: Server },
    { kind: "None", label: "Single-sig", Icon: Cpu },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {cells.map((c) => {
          const active = wallet.multiSigKind === c.kind;
          return (
            <div
              key={c.kind}
              className={`rounded-lg border p-2.5 text-center transition-all ${
                active
                  ? "border-bitcoin bg-bitcoin/10 text-bitcoin"
                  : "border-border bg-muted/40 text-muted-foreground"
              }`}
            >
              <c.Icon className="mx-auto h-4 w-4" />
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider">{c.label}</div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{wallet.multiSigType}</p>
    </div>
  );
}

function FreeVsPaid({ wallet }: { wallet: Wallet }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div className="rounded-lg border border-success/30 bg-success/5 p-3">
        <div className="flex items-center gap-2 text-success">
          <Gift className="h-4 w-4" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">Free / Open</span>
        </div>
        <p className="mt-1.5 text-xs text-foreground/90">{wallet.freeOffering}</p>
      </div>
      <div className="rounded-lg border border-bitcoin/30 bg-bitcoin/5 p-3">
        <div className="flex items-center gap-2 text-bitcoin">
          <Briefcase className="h-4 w-4" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">Paid Services</span>
        </div>
        <p className="mt-1.5 text-xs text-foreground/90">{wallet.paidOffering}</p>
      </div>
      <div className="sm:col-span-2 rounded-lg border border-border bg-muted/40 p-3">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Business Model
        </div>
        <p className="mt-1 text-sm font-medium text-foreground">{wallet.businessModel}</p>
      </div>
    </div>
  );
}

export function SecurityArchitecturePanel({ wallet }: { wallet: Wallet }) {
  return (
    <div className="space-y-5 p-5">
      <div>
        <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Seed Phrase Engine
        </h5>
        <SeedRiskBlock wallet={wallet} />
      </div>
      <div>
        <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Multi-Signature & Custody Matrix
        </h5>
        <MultiSigMatrix wallet={wallet} />
      </div>
      <div>
        <h5 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Open-Source vs Premium Services
        </h5>
        <FreeVsPaid wallet={wallet} />
      </div>
    </div>
  );
}