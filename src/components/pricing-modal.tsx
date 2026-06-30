import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/components/auth-provider";
import { useState } from "react";

const FREE = [
  "Full wallet directory",
  "Programming language breakdown",
  "Open-source / reproducibility status",
  "Client type & protocol filters",
];

const ENTERPRISE = [
  "Deep Dive Security Models",
  "Seed Derivation Path analysis",
  "Multi-signature Compliance Matrices",
  "Open-Source vs Premium Service comparison",
  "Find your wallet guided matcher",
  "Priority data updates and CSV exports",
];

export function PricingModal() {
  const { pricingOpen, setPricingOpen, isAuthenticated, isPremium, purchaseSubscription } =
    useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function upgrade() {
    setError("");
    setLoading(true);
    try {
      await purchaseSubscription();
      setPricingOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Purchase failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={pricingOpen} onOpenChange={setPricingOpen}>
      <DialogContent className="max-w-3xl border-white/15 bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upgrade to Enterprise Premium</DialogTitle>
          <DialogDescription>
            Built for security teams, compliance officers and corporate treasury managers.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/12 bg-background/60 p-5">
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

          <div
            className="relative rounded-xl border border-bitcoin/50 p-5 shadow-[var(--shadow-elegant)]"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--bitcoin) 8%, var(--card)), var(--card))",
            }}
          >
            <Badge
              className="absolute -top-2 right-4 border-0 text-primary-foreground"
              style={{ background: "var(--gradient-bitcoin)" }}
            >
              <Sparkles className="mr-1 h-3 w-3" /> Most popular
            </Badge>
            <h3 className="text-base font-semibold">Enterprise</h3>
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

            {!isAuthenticated ? (
              <div className="mt-5 space-y-2">
                <p className="text-center text-xs text-muted-foreground">
                  Sign in or create an account to subscribe.
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1 border-white/15">
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button
                    asChild
                    className="flex-1 text-primary-foreground"
                    style={{ background: "var(--gradient-bitcoin)" }}
                  >
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              </div>
            ) : isPremium ? (
              <Button disabled className="mt-5 w-full">
                Enterprise Active
              </Button>
            ) : (
              <>
                <Button
                  onClick={upgrade}
                  disabled={loading}
                  className="mt-5 w-full text-primary-foreground hover:opacity-90"
                  style={{ background: "var(--gradient-bitcoin)" }}
                >
                  {loading ? "Processing…" : "Subscribe — $299/mo"}
                </Button>
                {error && (
                  <p className="mt-2 text-center text-xs text-destructive">{error}</p>
                )}
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Subscription is linked to your account. Demo billing — no card required.
                </p>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
