# Random ID Card Generator

A production-ready web application that generates realistic fake ID cards for **195+ countries** worldwide. Built with React, TypeScript, Vite, and TailwindCSS.

## Features

- 🌍 **195+ countries** — complete coverage of all UN member states
- 🪪 **Realistic ID formats** — country-specific ID number patterns (SSN, Aadhaar, CPF, NIK, etc.)
- 🌐 **Auto country detection** — via `Intl.Locale` / `navigator.language` + IP geolocation fallback
- 📥 **Download as PNG** — high-resolution card export via html2canvas
- 📋 **Copy to clipboard** — copy all card data at once
- 🌙 **Dark mode** — system preference aware, persisted in localStorage
- 📱 **Fully responsive** — mobile-first layout
- 🔒 **Privacy safe** — all generation happens in the browser, no data sent to servers
- 💡 **AdSense ready** — top, in-content, and bottom ad slots pre-wired

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 5 | Build tool & dev server |
| TailwindCSS 3 | Utility-first styling |
| @faker-js/faker | Realistic fake data (50+ locales) |
| html2canvas | Card PNG export |
| react-select | Searchable country dropdown |
| lucide-react | Icons |

## Project Structure

```
src/
├── components/
│   ├── IDCard.tsx          # Visual ID card component
│   ├── CountrySelector.tsx # Searchable dropdown with flags
│   ├── ActionButtons.tsx   # Download PNG + Copy clipboard
│   ├── AdBanner.tsx        # Google AdSense slots
│   ├── Header.tsx          # App header with theme toggle
│   └── ThemeToggle.tsx     # Dark/light mode button
├── utils/
│   └── country-format/
│       ├── countries.ts    # 195+ country definitions
│       ├── idFormats.ts    # Country-specific ID generators
│       └── index.ts        # Main generateCardData() function
├── hooks/
│   ├── useCountryDetect.ts # Browser country detection
│   └── useTheme.ts         # Dark mode state
└── types/
    └── index.ts            # Shared TypeScript types
```

## Setup & Development

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
git clone https://github.com/ppwnr88/random-id-card.git
cd random-id-card
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deployment

### Deploy to Vercel

**Option 1 — Vercel CLI**

```bash
npm install -g vercel
vercel deploy         # preview deployment
vercel deploy --prod  # production deployment
```

**Option 2 — Vercel Dashboard**

1. Push to GitHub (already configured)
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no extra config needed
4. Click Deploy

The `vercel.json` at the root handles SPA routing rewrites automatically.

### Deploy to Netlify

```bash
npm run build
# Drag & drop the dist/ folder to Netlify, or:
netlify deploy --dir=dist --prod
```

## Environment

No environment variables required. The app is fully client-side.

For AdSense, the publisher ID (`ca-pub-9540032299322636`) and ad slot IDs are set in:
- `index.html` — AdSense script tag
- `src/App.tsx` — slot numbers passed to `<AdBanner />`

Update the slot numbers with your actual AdSense slot IDs before going live.

## License

MIT — free to use for personal and commercial projects.

> **Disclaimer:** All generated data is completely fictional. Do not use for identity fraud, impersonation, or any illegal activity.
