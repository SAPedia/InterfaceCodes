import { join } from 'node:path';
import { compileTailwindCSS } from '@/build/compile';
import { GADGETS_AND_GLOBAL_HEADER, GADGETS_AND_GLOBAL_FOOTER, toDest } from '@/build/utils';
import { readGHFile, writeGHFile } from './readAndWrite';

const entry = 'src/gadgets/Tailwind/Gadget-Tailwind.css';
const dest = join('dist', toDest(entry));

const content = await compileTailwindCSS(entry);

const { content: existingContent, sha } = await readGHFile(dest);
const newContent = `${GADGETS_AND_GLOBAL_HEADER}\n\n${content}\n\n${GADGETS_AND_GLOBAL_FOOTER}\n`;

if (newContent === existingContent) {
    console.log('No changes detected, skipping commit.');
    process.exit(0);
}

console.log('Changes detected, updating...');
await writeGHFile(dest, newContent, `chore: auto update Tailwindcss`, sha);
