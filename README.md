# Handcrafted Haven

Group Project Description: Handcrafted Haven

## Overview

Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items. It serves as a virtual marketplace, connecting talented creators with potential customers who appreciate the beauty and quality of handmade products. The application focuses on fostering a sense of community, supporting local artisans, and promoting sustainable consumption.

Handcrafted Haven aims to revolutionize the way handcrafted items are discovered, appreciated, and acquired. By providing a digital platform for artisans to showcase their creativity and connect with a broader audience, the web application fosters a thriving community of passionate creators and conscious consumers. With its user-friendly features, secure e-commerce capabilities, and emphasis on customization and community engagement, Handcrafted Haven is set to become the go-to destination for those seeking unique, handcrafted treasures.

## Team Members

- Henry Ugochukwu
- Michael Anderson
- David Alade
- Milton Kumirai

## Getting started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **pnpm**

### Install and run

Use **one** package manager for install and run (don’t mix npm and pnpm).

**With npm:**

```bash
cd d:\Team05_handcrafted-haven_project
npm install
npm run dev
```

**With pnpm:**

```bash
cd d:\Team05_handcrafted-haven_project
pnpm install
pnpm run dev
```

Then open **http://localhost:3000** in your browser.

### Scripts

| Script    | Description              |
| --------- | ------------------------- |
| `npm run dev`   | Start development server  |
| `npm run build` | Build for production      |
| `npm run start` | Start production server   |
| `npm run lint`  | Run Next.js ESLint        |

### Optional: environment

Copy `.env.example` to `.env` and set `MONGODB_URI` when you add a database.

### If the app won’t start

If you see errors like `'next' is not recognized` or `Cannot find module '../server/require-hook'`, do a **clean install** (use one package manager only):

**npm:**

```bash
cd d:\Team05_handcrafted-haven_project
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
npm install
npm run dev
```

**pnpm:**

```bash
cd d:\Team05_handcrafted-haven_project
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
pnpm install
pnpm run dev
```
