export type Custody = "Self-custodial" | "Custodial";
export type CodeAccess = "Open Source" | "Closed Source" | "Shared Source";
export type Reproducibility = "Reproducible" | "Not Reproducible" | "Unverifiable";
export type ClientType = "Mobile" | "Desktop" | "Hardware" | "Browser Extension";
export type WalletKind = "Wallet" | "Exchange";
export type ProtocolTag = "Lightning" | "On-chain" | "EVM" | "CoinJoin" | "Multi-chain";
export type Region = "Global" | "US" | "EU" | "Asia";

export function walletLogo(domain: string): string {
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

export interface LanguageSlice {
  name: string;
  percent: number;
}

export interface VulnerabilityStats {
  totalIncidents: number;
  description: string;
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
  isMultiSig: boolean;
  vulnerabilityStats: VulnerabilityStats;
  logoUrl: string;
  kind: WalletKind;
  protocols: ProtocolTag[];
  isBitcoinOnly: boolean;
  region: Region;
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
      seedModel: "Standard BIP-39 (12 words)",
    seedRisk: "Standard",
    multiSigType: "Coordinator Only (CoinJoin)",
    multiSigKind: "Coordinator",
    isMultiSig: false,
    vulnerabilityStats: {
      totalIncidents: 2,
      description:
        "Historically low CVE count; minor UI/CoinJoin routing disclosures, patched promptly.",
    },
    logoUrl: walletLogo("walletwasabi.io"),
    kind: "Wallet",
    protocols: ["On-chain", "CoinJoin"],
    isBitcoinOnly: true,
    region: "Global",
    businessModel: "Free Client / Paid Coordinator Fees",
    freeOffering: "Full wallet, CoinJoin participation, hardware wallet support",
    paidOffering: "WabiSabi coordinator fees per CoinJoin round",
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
      seedModel: "HD Descriptors (no BIP-39 by default)",
    seedRisk: "Non-Standard",
    multiSigType: "Native via descriptors & PSBT",
    multiSigKind: "Native",
    isMultiSig: true,
    vulnerabilityStats: {
      totalIncidents: 35,
      description:
        "Includes ~35 historical CVEs since 2012 (mostly DoS vectors like CVE-2024-52914 or resource consumption limits). Quick patch history.",
    },
    logoUrl: walletLogo("bitcoin.org"),
    kind: "Wallet",
    protocols: ["On-chain"],
    isBitcoinOnly: true,
    region: "Global",
    businessModel: "100% FOSS",
    freeOffering: "Full node, validation, wallet, RPC API",
    paidOffering: "None — community maintained",
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
      seedModel: "Standard BIP-39 (12/24 words)",
    seedRisk: "Standard",
    multiSigType: "Native 2-of-3 vaults",
    multiSigKind: "Native",
    isMultiSig: true,
    vulnerabilityStats: {
      totalIncidents: 3,
      description:
        "A handful of dependency advisories in the React Native stack; LndHub custodial mode has had disclosure notices around server trust assumptions.",
    },
    logoUrl: walletLogo("bluewallet.io"),
    kind: "Wallet",
    protocols: ["On-chain", "Lightning", "Multi-chain"],
    isBitcoinOnly: false,
    region: "Global",
    businessModel: "Free Client / Paid Node Infrastructure",
    freeOffering: "On-chain wallet, vaults, custodial LNDHub default",
    paidOffering: "LNDHub hosting and dedicated Electrum endpoints",
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
      seedModel: "Standard BIP-39 (12 words)",
    seedRisk: "Standard",
    multiSigType: "None (single-sig Lightning)",
    multiSigKind: "None",
    isMultiSig: false,
    vulnerabilityStats: {
      totalIncidents: 0,
      description:
        "No published CVEs tied to Phoenix itself; ACINQ maintains a responsive disclosure program for the Lightning stack.",
    },
    logoUrl: walletLogo("phoenix.acinq.co"),
    kind: "Wallet",
    protocols: ["Lightning", "On-chain"],
    isBitcoinOnly: true,
    region: "EU",
    businessModel: "Free Client / Paid LSP Fees",
    freeOffering: "Lightning wallet with splicing and trampoline",
    paidOffering: "Liquidity and channel splicing fees to ACINQ LSP",
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
      seedModel: "Standard BIP-39 + SLIP-39 + miniscript",
    seedRisk: "Standard",
    multiSigType: "Native arbitrary M-of-N",
    multiSigKind: "Native",
    isMultiSig: true,
    vulnerabilityStats: {
      totalIncidents: 1,
      description:
        "One minor PSBT parsing edge case disclosed and patched in 2022; otherwise strong track record for a power-user tool.",
    },
    logoUrl: walletLogo("sparrowwallet.com"),
    kind: "Wallet",
    protocols: ["On-chain"],
    isBitcoinOnly: true,
    region: "Global",
    businessModel: "100% FOSS (donations)",
    freeOffering: "Full desktop wallet, hardware coordinator, PSBT, miniscript",
    paidOffering: "None — donation supported",
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
      seedModel: "Electrum seed (non-BIP-39 by default)",
    seedRisk: "Non-Standard",
    multiSigType: "Native M-of-N",
    multiSigKind: "Native",
    isMultiSig: true,
    vulnerabilityStats: {
      totalIncidents: 4,
      description:
        "Notable incidents include the 2018 JSONRPC Missing Authorization (CVE-2018-1000022) and the massive 2019 Sybil/Phishing server attack.",
    },
    logoUrl: walletLogo("electrum.org"),
    kind: "Wallet",
    protocols: ["On-chain", "Lightning"],
    isBitcoinOnly: true,
    region: "Global",
    businessModel: "100% FOSS",
    freeOffering: "SPV wallet, plugins, hardware integrations",
    paidOffering: "None",
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
      seedModel: "Custom 2-of-2 split (no portable BIP-39)",
    seedRisk: "Proprietary",
    multiSigType: "2-of-2 with Muun server (server-dependent)",
    multiSigKind: "Server-Dependent",
    isMultiSig: true,
    vulnerabilityStats: {
      totalIncidents: 1,
      description:
        "Uses a custom 2-of-2 multi-sig. No major core breaches, but criticized for high fee environment edge cases.",
    },
    logoUrl: walletLogo("muun.com"),
    kind: "Wallet",
    protocols: ["Lightning", "On-chain"],
    isBitcoinOnly: true,
    region: "Global",
    businessModel: "Free Client / Server-Dependent",
    freeOffering: "Mobile wallet, submarine swaps, Emergency Kit",
    paidOffering: "On-chain fees for swaps; server co-signer is mandatory",
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
      seedModel: "Standard BIP-39 (24 words)",
    seedRisk: "Standard",
    multiSigType: "None natively (via 3rd-party coordinators)",
    multiSigKind: "None",
    isMultiSig: false,
    vulnerabilityStats: {
      totalIncidents: 6,
      description:
        "Several library and ConnectKit-related advisories; secure-element firmware remains closed-source, limiting independent CVE tracking.",
    },
    logoUrl: walletLogo("ledger.com"),
    kind: "Wallet",
    protocols: ["Multi-chain", "On-chain", "EVM"],
    isBitcoinOnly: false,
    region: "EU",
    businessModel: "Commercial / Proprietary firmware",
    freeOffering: "Ledger Live app, basic asset management",
    paidOffering: "Ledger hardware devices, Ledger Recover subscription, Ledger Enterprise",
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
      seedModel: "Standard BIP-39 + SLIP-39 Shamir",
    seedRisk: "Standard",
    multiSigType: "Coordinator-based via Electrum/Sparrow",
    multiSigKind: "Coordinator",
    isMultiSig: false,
    vulnerabilityStats: {
      totalIncidents: 2,
      description:
        "Trezor firmware has a strong disclosure record; Suite has had minor UI and CoinJoin integration issues, all patched quickly.",
    },
    logoUrl: walletLogo("trezor.io"),
    kind: "Wallet",
    protocols: ["On-chain", "Multi-chain", "CoinJoin"],
    isBitcoinOnly: false,
    region: "EU",
    businessModel: "Commercial Hardware / FOSS Software",
    freeOffering: "Trezor Suite app, firmware source, basic features",
    paidOffering: "Trezor hardware devices, CoinJoin coordinator fees",
  },
  {
    id: "coinbase",
    name: "Coinbase",
    company: "Coinbase Inc.",
    tagline: "US-regulated exchange with custodial Bitcoin and altcoin trading.",
    clients: ["Mobile", "Desktop", "Browser Extension"],
    languages: [
      { name: "TypeScript", percent: 55 },
      { name: "Go", percent: 25 },
      { name: "Ruby", percent: 12 },
      { name: "Python", percent: 8 },
    ],
    custody: "Custodial",
    codeAccess: "Closed Source",
    reproducibility: "Unverifiable",
    characteristics: [
      "Licensed US exchange and custody",
      "Insurance on USD balances",
      "Retail and institutional API tiers",
    ],
    pros: ["Regulatory clarity in the US", "High liquidity", "Beginner-friendly UX"],
    cons: ["Not self-custodial", "Account freezes possible", "Closed-source stack"],
    tags: ["Exchange", "Custodial", "US"],
    seedModel: "Exchange account (no user-held seed)",
    seedRisk: "Proprietary",
    multiSigType: "None (custodial exchange)",
    multiSigKind: "None",
    isMultiSig: false,
    vulnerabilityStats: {
      totalIncidents: 5,
      description:
        "Exchange-level incidents include API key leaks and social-engineering campaigns; funds held in custodial pools, not user wallets.",
    },
    logoUrl: walletLogo("coinbase.com"),
    kind: "Exchange",
    protocols: ["Multi-chain", "EVM", "On-chain"],
    isBitcoinOnly: false,
    region: "US",
    businessModel: "Commercial Exchange / Custody",
    freeOffering: "Retail trading, mobile app, basic custody",
    paidOffering: "Coinbase Advanced, Prime, and institutional custody fees",
  },
  {
    id: "binance",
    name: "Binance",
    company: "Binance Holdings",
    tagline: "Global exchange with deep liquidity across hundreds of trading pairs.",
    clients: ["Mobile", "Desktop", "Browser Extension"],
    languages: [
      { name: "Java", percent: 40 },
      { name: "TypeScript", percent: 35 },
      { name: "Python", percent: 15 },
      { name: "Go", percent: 10 },
    ],
    custody: "Custodial",
    codeAccess: "Closed Source",
    reproducibility: "Unverifiable",
    characteristics: [
      "Global spot and derivatives markets",
      "Proof-of-reserves snapshots published periodically",
      "BNB Chain ecosystem integration",
    ],
    pros: ["Very deep liquidity", "Wide asset coverage", "Low trading fees"],
    cons: ["Fully custodial", "Regulatory scrutiny in multiple regions", "Closed source"],
    tags: ["Exchange", "Custodial", "Global"],
    seedModel: "Exchange account (no user-held seed)",
    seedRisk: "Proprietary",
    multiSigType: "None (custodial exchange)",
    multiSigKind: "None",
    isMultiSig: false,
    vulnerabilityStats: {
      totalIncidents: 7,
      description:
        "Notable exchange hacks and API abuse campaigns; user funds depend on platform security and internal controls.",
    },
    logoUrl: walletLogo("binance.com"),
    kind: "Exchange",
    protocols: ["Multi-chain", "EVM", "On-chain"],
    isBitcoinOnly: false,
    region: "Asia",
    businessModel: "Commercial Exchange / Custody",
    freeOffering: "Spot trading, earn products, mobile app",
    paidOffering: "Futures, VIP fee tiers, and BNB Chain services",
  },
];

export const ALL_LANGUAGES = Array.from(
  new Set(WALLETS.flatMap((w) => w.languages.map((l) => l.name))),
).sort();

export const ALL_CLIENTS: ClientType[] = ["Mobile", "Desktop", "Hardware", "Browser Extension"];
export const ALL_CODE_ACCESS: CodeAccess[] = ["Open Source", "Closed Source", "Shared Source"];
export const ALL_PROTOCOLS: ProtocolTag[] = ["Lightning", "On-chain", "EVM", "CoinJoin", "Multi-chain"];
export const ALL_REGIONS: Region[] = ["Global", "US", "EU", "Asia"];
export const ALL_KINDS: WalletKind[] = ["Wallet", "Exchange"];
export const ALL_CUSTODY: Custody[] = ["Self-custodial", "Custodial"];