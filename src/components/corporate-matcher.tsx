import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";

export interface CorporateCriteria {
  multiSig: boolean;
  fullyOpen: boolean;
  bip39: boolean;
}

const QUESTIONS: { key: keyof CorporateCriteria; q: string; hint: string }[] = [
  {
    key: "multiSig",
    q: "Do you need standalone multi-signature routing?",
    hint: "Native M-of-N or coordinator support — not server-dependent multi-sig.",
  },
  {
    key: "fullyOpen",
    q: "Must the code be 100% open-source without paid server dependencies?",
    hint: "Excludes wallets that require a vendor LSP or proprietary co-signer to operate.",
  },
  {
    key: "bip39",
    q: "Do you require standard BIP-39 recovery?",
    hint: "Ensures funds can be migrated to any compliant wallet in an incident.",
  },
];

export function CorporateMatcher({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onApply: (c: CorporateCriteria | null) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<CorporateCriteria>>({});

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
      onApply(next as CorporateCriteria);
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
      <DialogContent className="max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Corporate Setup Matcher</DialogTitle>
          <DialogDescription>
            Answer 3 quick questions to filter wallets to corporate-grade options.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full transition-all"
            style={{ width: `${progress}%`, background: "var(--gradient-bitcoin)" }}
          />
        </div>

        <div className="mt-4 rounded-lg border border-border bg-background p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-bitcoin">
            Step {step + 1} of {QUESTIONS.length}
          </div>
          <p className="mt-1 text-base font-semibold text-foreground">{current.q}</p>
          <p className="mt-1 text-xs text-muted-foreground">{current.hint}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => answer(false)} className="h-11">
              <X className="mr-1.5 h-4 w-4" /> No
            </Button>
            <Button onClick={() => answer(true)} className="h-11 bg-bitcoin text-primary-foreground hover:bg-bitcoin/90">
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
            <RotateCcw className="h-3 w-3" /> Restart
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear corporate filter
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function matchesCorporate(
  w: import("@/lib/wallets").Wallet,
  c: CorporateCriteria,
): boolean {
  if (c.multiSig && (w.multiSigKind === "None" || w.multiSigKind === "Server-Dependent")) return false;
  if (c.fullyOpen) {
    if (w.codeAccess !== "Open Source") return false;
    if (w.multiSigKind === "Server-Dependent") return false;
    if (/Paid Server|Server-Dependent|Paid LSP|Paid Infrastructure|Proprietary/i.test(w.businessModel)) {
      return false;
    }
  }
  if (c.bip39 && w.seedRisk !== "Standard") return false;
  return true;
}