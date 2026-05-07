# CardioCheck — Heart Attack Risk Predictor Frontend

AI-powered heart risk assessment UI built with **Next.js 15**, **Tailwind CSS v4**, **shadcn/ui**, and **motion/react**.

---

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── health/route.ts       ← GET  /api/health  → proxies to ML :5000/health
│   │   └── predict/route.ts      ← POST /api/predict → proxies to ML :5000/predict
│   ├── globals.css               ← Tailwind v4 + CSS vars (light/dark)
│   ├── layout.tsx                ← Root layout with ThemeProvider
│   └── page.tsx                  ← Home page
├── components/
│   ├── Navbar.tsx                ← Logo | Accuracy badge | Health check | Theme toggle
│   ├── HeroSection.tsx           ← Left copy + Right form layout
│   ├── HeartForm.tsx             ← All 8 input fields + submit
│   ├── ResultDialog.tsx          ← shadcn Dialog with risk result + probability bar
│   └── ThemeProvider.tsx         ← next-themes wrapper
├── constants/
│   ├── types.ts                  ← TypeScript types & interfaces
│   └── constants.ts              ← Field options, defaults, messages
└── hooks/
    ├── usePredict.ts             ← POST /api/predict hook
    └── useHealth.ts              ← GET  /api/health hook
```

---

## Setup

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Install shadcn/ui components

```bash
npx shadcn@latest init
npx shadcn@latest add button input label select dialog badge
```

### 3. Set environment variable

Copy `.env.local.example` → `.env.local` and set the ML service URL:

```bash
NEXT_PRIVATE_ML_SERVICE_URL=http://localhost:5000
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Features

| Feature | Details |
| --- | --- |
| **Theme** | Light (default) / Dark — toggled via Navbar |
| **Health check** | Pings `/api/health` → shadcn Dialog shows status |
| **Risk prediction** | Submits form → `/api/predict` → shadcn Dialog with result + probability bar |
| **Animations** | motion/react — page load stagger, EKG path draw, pulsing heart, probability fill |
| **Fonts** | Playfair Display (headings) + DM Sans (body) |
| **Responsive** | Mobile-first; stacks to single column below `lg` breakpoint |

---

## Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `NEXT_PRIVATE_ML_SERVICE_URL` | Base URL of FastAPI ML service | ✅ |

> `NEXT_PRIVATE_` prefix ensures the variable is **never** sent to the browser bundle.

---

## Key Design Decisions

- **Tailwind v4 syntax** used throughout (`max-w-100`, `bg-linear-to-r`, etc.)
- **CSS custom properties** from `globals.css` (`--heart-primary`, `--heart-soft`, etc.) drive all colour references — single place to retheme
- **react-hook-form** with `Controller` for Select fields to keep forms uncontrolled and performant
- **Route handlers** act as a secure proxy layer — the ML service URL never leaks to the client
