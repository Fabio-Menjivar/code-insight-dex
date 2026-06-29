import { createContext, useContext, useState, type ReactNode } from "react";

interface PremiumContextValue {
  isPremium: boolean;
  setPremium: (v: boolean) => void;
  togglePremium: () => void;
  openPricing: () => void;
  pricingOpen: boolean;
  setPricingOpen: (v: boolean) => void;
}

const PremiumContext = createContext<PremiumContextValue | null>(null);

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setPremium] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  const value: PremiumContextValue = {
    isPremium,
    setPremium,
    togglePremium: () => setPremium((v) => !v),
    openPricing: () => setPricingOpen(true),
    pricingOpen,
    setPricingOpen,
  };
  return <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>;
}

export function usePremium() {
  const ctx = useContext(PremiumContext);
  if (!ctx) throw new Error("usePremium must be used within PremiumProvider");
  return ctx;
}