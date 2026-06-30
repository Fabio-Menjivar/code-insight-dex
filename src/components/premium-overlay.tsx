import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePremium } from "@/components/auth-provider";

export function PremiumOverlay({
  label = "Enterprise Premium",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  const { isPremium, openPricing } = usePremium();

  if (isPremium) return <>{children}</>;

  return (
    <div className="relative overflow-hidden rounded-xl border border-bitcoin/30 bg-card">
      <div aria-hidden className="pointer-events-none select-none opacity-60 blur-[6px]">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-background/40 via-background/70 to-background/90 p-6 text-center backdrop-blur-[2px]">
        <div
          className="grid h-11 w-11 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-elegant)]"
          style={{ background: "var(--gradient-bitcoin)" }}
        >
          <Lock className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-bitcoin">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            Unlock deep-dive security analysis
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Seed engines, multi-signature compliance and wallet finder guides.
          </p>
        </div>
        <Button
          size="sm"
          onClick={openPricing}
          className="bg-bitcoin text-primary-foreground hover:bg-bitcoin/90"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Upgrade to Premium
        </Button>
      </div>
    </div>
  );
}