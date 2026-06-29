# WalletStack — Crypto Wallet Architecture Tracker

An interactive directory for comparing popular Bitcoin and crypto wallets by programming language, custody model, reproducibility, multi-signature support, and historical vulnerability track record.

Inspired by [WalletScrutiny](https://walletscrutiny.com/) — data is illustrative; always verify against primary sources.

## Features

- **Wallet directory** — Browse 10 wallets with language breakdowns, client types, and open-source status
- **Search & filters** — Filter by language, client type, repository status, and multi-signature support
- **Corporate Setup Matcher** — Wizard to find wallets matching enterprise criteria (multi-sig, BIP-39, no paid dependencies)
- **Wallet detail drawer** — Tabbed view with Overview, Security Model (premium), and Track record panels
- **Track record** — Historical CVE/incident counts with contextual descriptions per wallet
- **Premium layer** — Seed architecture, multi-signature matrix, and business model insights
- **Dark theme** — Coinlateral-inspired palette with glassmorphism cards and Bitcoin orange accents

## Tech Stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (React 19)
- [Vite](https://vitejs.dev/) + [Nitro](https://nitro.build/) (SSR)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [TanStack Query](https://tanstack.com/query)

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or bun)

### Install & run

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

### Other scripts

| Command | Description |
| --- | --- |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Project Structure

```
src/
├── components/       # UI components (wallet cards, detail drawer, filters)
├── lib/              # Wallet data and utilities
├── routes/           # File-based routes (__root.tsx, index.tsx)
├── styles.css        # Global theme and design tokens
└── router.tsx        # TanStack Router setup
```

Wallet mock data lives in `src/lib/wallets.ts`. Each wallet includes languages, custody, reproducibility, `isMultiSig`, and `vulnerabilityStats`.

## License

ISC
