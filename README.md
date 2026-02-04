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
- **pnpm** ([install](https://pnpm.io/installation): `npm install -g pnpm`)

### Install and run

This project uses **pnpm** only.

```powershell
cd d:\Team05_handcrafted-haven_project
pnpm install
pnpm run dev
```

Then open **http://localhost:3000** in your browser.

**Quick fix (if install or dev ever fail):** Clean and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue; pnpm install; pnpm run dev
```

### Scripts

| Script         | Description              |
| -------------- | ------------------------- |
| `pnpm run dev`   | Start development server  |
| `pnpm run build` | Build for production      |
| `pnpm run start` | Start production server   |
| `pnpm run lint`  | Run Next.js ESLint        |

### Optional: environment

Copy `.env.example` to `.env` and set `MONGODB_URI` when you add a database.

### If the app won’t start

**`'next' is not recognized` or `Command "next" not found`**  
Do a **clean install** with pnpm:

```powershell
cd d:\Team05_handcrafted-haven_project
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
pnpm install
pnpm run dev
```

**If you see `ERR_PNPM_EPERM` / "operation not permitted, rename"**  
Something is locking `node_modules` (IDE, terminal, antivirus, or OneDrive). Do this:

1. **Close** all terminals in this project and any other apps using the project folder.
2. **Optional:** Close Cursor/VS Code (or at least don’t have the project’s `node_modules` open in the file tree).
3. Open a **new PowerShell window** (not inside the IDE).
4. Run a clean install:

```powershell
cd d:\Team05_handcrafted-haven_project
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
pnpm install
pnpm run dev
```

If it still fails, temporarily **pause OneDrive** (or other sync) for this folder, or **exclude** the project folder from Windows Defender real-time scanning, then repeat the steps above.

**If you see `ERR_PNPM_ENOENT` / "no such file or directory, rename"**  
The project uses `.npmrc` with `node-linker=hoisted` to avoid Windows path issues. After the clean install above, if the error persists, close other terminals/IDEs using the project, disable any sync (e.g. OneDrive) on the project folder, then run `pnpm install` again.
