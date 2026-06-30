import { useState } from "react";
import type { Wallet } from "@/lib/wallets";

export function WalletLogo({
  wallet,
  size = "md",
  className = "",
}: {
  wallet: Wallet;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const dims =
    size === "sm" ? "h-9 w-9" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  if (failed) {
    return (
      <div
        className={`${dims} grid shrink-0 place-items-center rounded-lg text-sm font-bold text-primary-foreground ${className}`}
        style={{ background: "var(--gradient-bitcoin)" }}
      >
        {wallet.name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={wallet.logoUrl}
      alt={`${wallet.name} logo`}
      className={`${dims} shrink-0 rounded-lg border border-white/10 bg-white/5 object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
