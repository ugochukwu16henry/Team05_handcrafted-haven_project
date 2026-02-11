#!/usr/bin/env node
/**
 * Run the locally installed Next.js CLI.
 * Use this so "next" works without relying on PATH or pnpm exec (avoids Windows issues).
 */
const path = require('path');
const { spawn } = require('child_process');

const cwd = path.join(__dirname, '..');
let nextBin;
try {
  nextBin = require.resolve('next/dist/bin/next', { paths: [cwd] });
} catch {
  console.error('Next.js not found. Run: pnpm install');
  process.exit(1);
}

// On Windows, Turbopack can fail with "failed to create junction point" (os error 1).
// Use webpack instead to avoid that code path.
const args = process.argv.slice(2);
if (process.platform === 'win32' && !args.includes('--webpack') && !args.includes('--turbopack')) {
  args.push('--webpack');
}

const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: 'inherit',
  shell: false,
  cwd,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
