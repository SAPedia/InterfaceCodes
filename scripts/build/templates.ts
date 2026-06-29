import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TEMPLATE_BANNER } from './utils';

/**
 * 将 ReactNode 编译为 HTML/wikitext
 */
const compileComponent = (node: ReactNode): string => renderToStaticMarkup(node);

const buildTemplates = async () => {
    const templatesDir = join(import.meta.dirname, '../../src/templates');
    const outputDir = join(import.meta.dirname, '../../dist/templates');

    const entries = await readdir(templatesDir, { withFileTypes: true });
    const dirs = entries.filter(e => e.isDirectory() && !e.name.startsWith('.'));

    await Promise.all(
        dirs.map(async dir => {
            const name = dir.name;
            const srcDir = join(templatesDir, name);

            const mod = await import(pathToFileURL(join(srcDir, 'index.tsx')).href);
            const render = mod.default as () => ReactNode;

            const node = render();
            const content = compileComponent(node);

            const output = `<noinclude>\n${TEMPLATE_BANNER}\n</noinclude>${content}<noinclude>\n{{doc}}\n</noinclude>`;

            const dest = join(outputDir, name);
            await mkdir(dirname(dest), { recursive: true });
            await writeFile(dest, output);
        }),
    );
};

export { buildTemplates };
