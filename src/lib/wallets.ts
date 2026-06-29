export type Custody = "Self-custodial" | "Custodial";
export type CodeAccess = "Open Source" | "Closed Source" | "Shared Source";
export type Reproducibility = "Reproducible" | "Not Reproducible" | "Unverifiable";
export type ClientType = "Mobile" | "Desktop" | "Hardware" | "Browser Extension";

export interface LanguageSlice {
  name: string;
  percent: number;
}

export interface Wallet {
  id: string;
  name: string;
  company: string;
  tagline: string;
  clients: ClientType[];
  languages: LanguageSlice[];
  custody: Custody;
  codeAccess: CodeAccess;
  reproducibility: Reproducibility;
  repoUrl?: string;
  characteristics: string[];
  pros: string[];
  cons: string[];
  tags: string[];
  seedModel: string;
  seedRisk: "Standard" | "Non-Standard" | "Proprietary";
  multiSigType: string;
  multiSigKind: "Native" | "Coordinator" | "Server-Dependent" | "None";
  businessModel: string;
  freeOffering: string;
  paidOffering: string;
}

export const WALLETS: Wallet[] = [
  {
    id: "wasabi",
    name: "Wasabi Wallet",
    company: "zkSNACKs",
    tagline: "Privacy-focused desktop wallet with built-in CoinJoin.",
    clients: ["Desktop"],
    languages: [
      { name: "C#", percent: 82 },
      { name: "Avalonia XAML", percent: 12 },
      { name: "Shell", percent: 6 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Reproducible",
    repoUrl: "https://github.com/WalletWasabi/WalletWasabi",
    characteristics: [
      "Coordinated CoinJoin via WabiSabi protocol",
      "Built on .NET with Avalonia UI",
      "Block filters fetched from a backend coordinator",
    ],
    pros: ["Strong privacy defaults", "Reproducible builds", "Hardware wallet support"],
    cons: ["Higher resource use", "Coordinator dependency for CoinJoin"],
    tags: ["Privacy", "CoinJoin", "Reproducible"],
  },
  {
    id: "bitcoin-core",
    name: "Bitcoin Core",
    company: "Bitcoin Core Contributors",
    tagline: "The reference implementation and consensus standard.",
    clients: ["Desktop"],
    languages: [
      { name: "C++", percent: 71 },
      { name: "Python", percent: 14 },
      { name: "C", percent: 9 },
      { name: "Shell", percent: 6 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Reproducible",
    repoUrl: "https://github.com/bitcoin/bitcoin",
    characteristics: [
      "Full validating node with consensus rules",
      "Guix-based deterministic builds",
      "Direct peer-to-peer network connections",
    ],
    pros: ["Maximum sovereignty", "No third-party trust", "Audited by thousands"],
    cons: ["Heavy disk and bandwidth", "Initial block download takes days"],
    tags: ["Full Node", "Consensus", "Reproducible"],
  },
  {
    id: "bluewallet",
    name: "BlueWallet",
    company: "BlueWallet Services",
    tagline: "Dual on-chain and Lightning mobile wallet.",
    clients: ["Mobile", "Desktop"],
    languages: [
      { name: "TypeScript", percent: 64 },
      { name: "JavaScript", percent: 22 },
      { name: "Objective-C", percent: 8 },
      { name: "Java", percent: 6 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Reproducible",
    repoUrl: "https://github.com/BlueWallet/BlueWallet",
    characteristics: [
      "React Native cross-platform stack",
      "Custodial LndHub Lightning option",
      "Watch-only and multi-sig vaults",
    ],
    pros: ["Flexible account types", "Beginner friendly", "Active development"],
    cons: ["Default LndHub is custodial", "Large JS surface area"],
    tags: ["Lightning", "Mobile", "Multi-sig"],
  },
  {
    id: "phoenix",
    name: "Phoenix",
    company: "ACINQ",
    tagline: "Non-custodial Lightning wallet powered by splicing.",
    clients: ["Mobile"],
    languages: [
      { name: "Kotlin", percent: 58 },
      { name: "Swift", percent: 36 },
      { name: "Shell", percent: 6 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Not Reproducible",
    repoUrl: "https://github.com/ACINQ/phoenix",
    characteristics: [
      "Native iOS and Android codebases",
      "Trampoline routing for simpler UX",
      "On-the-fly channel splicing",
    ],
    pros: ["Truly non-custodial Lightning", "Polished UX", "Built by ACINQ"],
    cons: ["Single LSP dependency", "iOS builds not reproducible yet"],
    tags: ["Lightning", "Splicing", "Mobile"],
  },
  {
    id: "sparrow",
    name: "Sparrow Wallet",
    company: "Sparrow",
    tagline: "Desktop power-user wallet and hardware coordinator.",
    clients: ["Desktop"],
    languages: [
      { name: "Java", percent: 88 },
      { name: "CSS", percent: 8 },
      { name: "Shell", percent: 4 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Reproducible",
    repoUrl: "https://github.com/sparrowwallet/sparrow",
    characteristics: [
      "JavaFX desktop UI",
      "PSBT and miniscript support",
      "Connects to your own Bitcoin Core or Electrum server",
    ],
    pros: ["Hardware wallet rich support", "Advanced coin control", "Tor friendly"],
    cons: ["Steep learning curve", "Java runtime footprint"],
    tags: ["PSBT", "Hardware", "Power User"],
  },
  {
    id: "electrum",
    name: "Electrum",
    company: "Electrum Technologies",
    tagline: "Veteran lightweight SPV wallet for power users.",
    clients: ["Desktop", "Mobile"],
    languages: [
      { name: "Python", percent: 92 },
      { name: "Shell", percent: 5 },
      { name: "C", percent: 3 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Reproducible",
    repoUrl: "https://github.com/spesmilo/electrum",
    characteristics: [
      "SPV verification with Electrum servers",
      "Plugin architecture",
      "Hardware wallet integrations",
    ],
    pros: ["Lightweight and fast", "Battle-tested since 2011", "Scriptable"],
    cons: ["Relies on public Electrum servers by default", "Dated UI"],
    tags: ["SPV", "Lightweight", "Veteran"],
  },
  {
    id: "muun",
    name: "Muun",
    company: "Muun",
    tagline: "2-of-2 multi-sig mobile wallet with submarine swaps.",
    clients: ["Mobile"],
    languages: [
      { name: "Kotlin", percent: 40 },
      { name: "Swift", percent: 36 },
      { name: "Go", percent: 18 },
      { name: "Java", percent: 6 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Not Reproducible",
    repoUrl: "https://github.com/muun",
    characteristics: [
      "2-of-2 multi-sig between device and Muun server",
      "Submarine swaps to bridge Lightning",
      "Emergency Kit recovery flow",
    ],
    pros: ["Single balance across L1/L2", "Simple onboarding", "Recovery tooling"],
    cons: ["High on-chain fees per send", "Server co-signer dependency"],
    tags: ["Lightning", "Multi-sig", "Mobile"],
  },
  {
    id: "ledger-live",
    name: "Ledger Live",
    company: "Ledger SAS",
    tagline: "Companion app for Ledger hardware devices.",
    clients: ["Desktop", "Mobile", "Hardware"],
    languages: [
      { name: "TypeScript", percent: 70 },
      { name: "C", percent: 20 },
      { name: "Rust", percent: 10 },
    ],
    custody: "Self-custodial",
    codeAccess: "Shared Source",
    reproducibility: "Unverifiable",
    repoUrl: "https://github.com/LedgerHQ/ledger-live",
    characteristics: [
      "Pairs with Ledger Nano S/X/Stax",
      "App-based device firmware model",
      "Closed-source secure element firmware",
    ],
    pros: ["Wide asset support", "Polished UX", "Hardware-backed keys"],
    cons: ["Secure element is closed source", "Telemetry by default"],
    tags: ["Hardware", "Multi-asset"],
  },
  {
    id: "metamask",
    name: "MetaMask",
    company: "ConsenSys",
    tagline: "Browser extension wallet for EVM ecosystems.",
    clients: ["Browser Extension", "Mobile"],
    languages: [
      { name: "TypeScript", percent: 60 },
      { name: "JavaScript", percent: 32 },
      { name: "Swift", percent: 4 },
      { name: "Kotlin", percent: 4 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Not Reproducible",
    repoUrl: "https://github.com/MetaMask/metamask-extension",
    characteristics: [
      "EIP-1193 provider for dApps",
      "Infura RPC by default",
      "Snaps plugin system",
    ],
    pros: ["dApp standard", "Snaps extensibility", "Hardware wallet support"],
    cons: ["Default RPC sees all activity", "Large attack surface in browser"],
    tags: ["EVM", "Extension", "dApps"],
  },
  {
    id: "trezor-suite",
    name: "Trezor Suite",
    company: "SatoshiLabs",
    tagline: "Companion app for Trezor hardware wallets.",
    clients: ["Desktop", "Hardware"],
    languages: [
      { name: "TypeScript", percent: 78 },
      { name: "C", percent: 16 },
      { name: "Python", percent: 6 },
    ],
    custody: "Self-custodial",
    codeAccess: "Open Source",
    reproducibility: "Reproducible",
    repoUrl: "https://github.com/trezor/trezor-suite",
    characteristics: [
      "Fully open hardware and firmware",
      "Tor integration built in",
      "CoinJoin via zkSNACKs coordinator",
    ],
    pros: ["Open-source firmware", "Reproducible Suite builds", "Privacy features"],
    cons: ["No secure element on older models", "Slower than competitors"],
    tags: ["Hardware", "Open Firmware"],
  },
];

export const ALL_LANGUAGES = Array.from(
  new Set(WALLETS.flatMap((w) => w.languages.map((l) => l.name))),
).sort();

export const ALL_CLIENTS: ClientType[] = ["Mobile", "Desktop", "Hardware", "Browser Extension"];
export const ALL_CODE_ACCESS: CodeAccess[] = ["Open Source", "Closed Source", "Shared Source"];