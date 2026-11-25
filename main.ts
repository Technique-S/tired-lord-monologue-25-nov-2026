import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MONOLOGUE } from './monologue.ts';

// Write exactly one villain monologue to /output/entry.txt. The gate accepts
// UTF-8 text of 1-600 characters that is not only whitespace, so check those
// constraints here before anything reaches the judge. The brief asks for a
// monologue of about 100 words, spendable in one breath, so guard the word
// count too. The text is one speech: allow line feeds but no other controls.
const text = MONOLOGUE;
const size = [...text].length;
if (size < 1 || size > 600) {
  throw new Error(`a monologue must be 1-600 characters, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the monologue must not be only whitespace');
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('the monologue must be a single speech with no control characters');
}
const words = text.trim().split(/\s+/).length;
if (words < 60 || words > 140) {
  throw new Error(`a monologue of about 100 words is expected, got ${words}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character, ${words}-word monologue to ${target}`);
