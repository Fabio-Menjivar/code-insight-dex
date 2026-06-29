import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { usePremium } from "@/components/premium-provider";

const FREE = [
  "Full wallet directory",
  "Programming language breakdown",
  "Open-source / reproducibility status",
  "Client type & basic filters",
];

const ENTERPRISE = [
  "Deep Dive Security Models",
  "Seed Derivation Path analysis",
  "Multi-sig Compliance Matrices",
  "Open-Source vs Premium Service comparison",
  "Corporate Setup Matcher & Guides",
  "Priority data updates and CSV exports",
];

export function PricingModal() {
  const { pricingOpen, setPricingOpen, setPremium } = usePremium();

  function upgrade() {
    setPremium(true);
    setPricingOpen(false);
  }

  return (
    <Dialog open={pricingOpen} onOpenChange={setPricingOpen}>
      <DialogContent className="max-w-3xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upgrade to Enterprise Premium</DialogTitle>
          <DialogDescription>
            Built for security teams, compliance officers and corporate treasury managers.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 grid gap-4 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-semibold">Free</h3>
              <Badge variant="secondary">Current</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Public directory for individuals.</p>
            <div className="mt-4">
              <span className="text-3xl font-bold tracking-tight">$0</span>
              <span className="ml-1 text-sm text-muted-foreground">/ forever</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {FREE.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise */}
          <div
            className="relative rounded-xl border border-bitcoin/50 p-5 shadow-[var(--shadow-elegant)]"
            style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--bitcoin) 8%, var(--card)), var(--card))" }}
          >
            <Badge
              className="absolute -top-2 right-4 border-0 text-primary-foreground"
              style={{ background: "var(--gradient-bitcoin)" }}
            >
              <Sparkles className="mr-1 h-3 w-3" /> Most popular
            </Badge>
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-semibold">Enterprise</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">For security & compliance teams.</p>
            <div className="mt-4">
              <span className="text-3xl font-bold tracking-tight">$299</span>
              <span className="ml-1 text-sm text-muted-foreground">/ month</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {ENTERPRISE.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-bitcoin" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={upgrade}
              className="mt-5 w-full text-primary-foreground hover:opacity-90"
              style={{ background: "var(--gradient-bitcoin)" }}
            >
              Start Enterprise Trial
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Demo mode — no payment is collected.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}