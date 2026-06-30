# Fraktur — AI-Powered Security for Bitcoin Companies

An interactive directory for comparing Bitcoin wallets and exchanges by programming language, custody model, protocols, multi-signature support, and historical vulnerability track records.

Inspired by [WalletScrutiny](https://walletscrutiny.com/) — data is illustrative; always verify against primary sources.

## Features

- **Wallet & exchange directory** — 12 entries with real logos, protocol tags, and platform badges
- **Rich filters** — Exchange, custodial, non-Bitcoin, multi-signature, protocol, region, custody, platform
- **Colored filter chips** — Distinct active and hover colors per filter category
- **Authentication** — Register, sign in, and subscribe to Enterprise (demo billing linked to account)
- **Wallet detail drawer** — Overview (pros/cons first), Security Model (premium), Track record
- **Corporate Setup Matcher** — Enterprise wallet criteria wizard
- **Projector-friendly dark UI** — High-contrast Fraktur theme (dark mode only)

## Tech Stack

- TanStack Start + React 19 + Vite + Tailwind CSS v4 + shadcn/ui

## Getting Started

```bash
npm install
npm run dev
```

### Auth & subscription (demo)

1. Click **Register** and create an account (stored in localStorage)
2. Click **Upgrade** → **Subscribe — $299/mo** while signed in
3. Enterprise unlocks the Security Model tab

## License

ISC
