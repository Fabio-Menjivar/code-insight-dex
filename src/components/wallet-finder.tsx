import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RotateCcw, Wallet } from "lucide-react";

export interface WalletFinderCriteria {
  lightning: boolean;
  selfCustody: boolean;
  mobile: boolean;
  multiSig: boolean;
  standardSeed: boolean;
}

const QUESTIONS: { key: keyof WalletFinderCriteria; q: string; hint: string }[] = [
  {
    key: "lightning",
    q: "Do you want Lightning support for fast, low-fee payments?",
    hint: "Lightning wallets are ideal for everyday spending and small transactions.",
  },
  {
    key: "selfCustody",
    q: "Is self-custody important — do you want to hold your own keys?",
    hint: "Self-custodial wallets keep you in control. Exchanges hold keys for you.",
  },
  {
    key: "mobile",
    q: "Will you primarily use this wallet on your phone?",
    hint: "We'll prioritize wallets with a native iOS or Android app.",
  },
  {
    key: "multiSig",
    q: "Do you need built-in multi-signature support?",
    hint: "Multi-sig requires multiple approvals before funds can move.",
  },
  {
    key: "standardSeed",
    q: "Do you require a standard BIP-39 seed phrase for recovery?",
    hint: "BIP-39 lets you restore your wallet in most compatible apps.",
  },
];

export function WalletFinder({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onApply: (c: WalletFinderCriteria | null) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WalletFinderCriteria>>({});

  function reset() {
    setStep(0);
    setAnswers({});
  }

  function answer(v: boolean) {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.key]: v };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      onApply(next as WalletFinderCriteria);
      onOpenChange(false);
      setTimeout(reset, 300);
    }
  }

  function clear() {
    onApply(null);
    onOpenChange(false);
    setTimeout(reset, 300);
  }

  const current = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(reset, 300);
      }}
    >
      <DialogContent className="max-w-md border-white/15 bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-bitcoin" />
            Find your wallet
          </DialogTitle>
          <DialogDescription>
            Answer {QUESTIONS.length} quick questions and we&apos;ll narrow the directory to wallets
            that fit your needs.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full transition-all"
            style={{ width: `${progress}%`, background: "var(--gradient-bitcoin)" }}
          />
        </div>

        <div className="mt-4 rounded-lg border border-white/12 bg-background/60 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-bitcoin">
            Question {step + 1} of {QUESTIONS.length}
          </div>
          <p className="mt-1 text-base font-semibold text-foreground">{current.q}</p>
          <p className="mt-1 text-xs text-muted-foreground">{current.hint}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => answer(false)}
              className="h-11 border-white/15"
            >
              <X className="mr-1.5 h-4 w-4" /> No
            </Button>
            <Button
              onClick={() => answer(true)}
              className="h-11 bg-bitcoin text-primary-foreground hover:bg-bitcoin/90"
            >
              <Check className="mr-1.5 h-4 w-4" /> Yes
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" /> Start over
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear results
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function matchesWalletFinder(
  w: import("@/lib/wallets").Wallet,
  c: WalletFinderCriteria,
): boolean {
  if (c.lightning && !w.protocols.includes("Lightning")) return false;
  if (c.selfCustody && w.custody !== "Self-custodial") return false;
  if (c.mobile && !w.clients.includes("Mobile")) return false;
  if (c.multiSig && !w.isMultiSig) return false;
  if (c.standardSeed && w.seedRisk !== "Standard") return false;
  return true;
}
