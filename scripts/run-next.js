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
  nextBin = require.resolve('next/bin/next', { paths: [cwd] });
} catch {
  console.error('Next.js not found. Run: npm install  or  pnpm install');
  process.exit(1);
}

const args = process.argv.slice(2);
const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: 'inherit',
  shell: false,
  cwd,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
