# Setup and Run Guide

This guide explains how to download, install, and run the project locally.

## 1. Prerequisites

Make sure you have:

- Node.js (recommended: version 20 or later)
- npm (usually installed with Node.js)
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

## 2. Clone the repository

```bash
git clone https://github.com/samenov01/weather-checker-app/
cd weather-checker-app
```

If your folder has a different name, open the folder that contains `package.json`.

## 3. Install dependencies

```bash
npm install
```

## 4. Run the app in development mode

```bash
npm run dev
```

Then open:

- http://localhost:3000

## 5. Useful scripts

```bash
npm run lint   # run ESLint
npm run build  # build for production
npm run start  # start production build
```

## 6. Troubleshooting

- If `node` or `npm` is not recognized:
  - reinstall Node.js and restart your terminal.
- If port `3000` is already in use:
  - stop the process using that port, or run on another port:
  - `npm run dev -- -p 3001`
