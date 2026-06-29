import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import FastGlob from 'fast-glob';
import { compileJS, compileCSS, compileTailwindCSS } from './compile';
import { generateDefinition } from './definition';
import { buildTemplates } from './templates';
import { GADGETS_AND_GLOBAL_HEADER, GADGETS_AND_GLOBAL_FOOTER, toDest, globPath } from './utils';

await rm('dist', { recursive: true, force: true });

const gadgetsAndGlobal = await FastGlob.glob([
    'src/gadgets/*/Gadget-*.{ts,js,scss,css}',
    'src/global/*.{ts,js,scss,css}',
]);

await Promise.all(
    gadgetsAndGlobal.map(async entry => {
        const dest = join('dist', toDest(entry));
        await mkdir(dirname(dest), { recursive: true });

        let content;
        if (entry.endsWith('.scss')) {
            content = await compileCSS(entry);
        } else if (entry.endsWith('.css')) {
            const filename = basename(entry);
            content =
                filename === 'Gadget-Tailwind.css'
                    ? await compileTailwindCSS(entry)
                    : await compileCSS(entry);
        } else {
            content = await compileJS(entry);
        }

        await writeFile(
            dest,
            `${GADGETS_AND_GLOBAL_HEADER}\n\n${content}\n\n${GADGETS_AND_GLOBAL_FOOTER}\n`,
        );
    }),
);

await generateDefinition();

const widgets = await FastGlob.glob('src/widgets/*', { onlyDirectories: true });

await Promise.all(
    widgets.map(async dir => {
        const name = basename(dir);
        const desc = await readFile(join(dir, 'description.wiki'), 'utf-8').then(r => r.trim());

        const resolve = (pat: string) => globPath(join(dir, pat));
        const [jsFile] = await FastGlob.glob([resolve(`${name}.{ts,js}`)]);
        const [cssFile] = await FastGlob.glob([resolve(`${name}.{scss,css}`)]);

        const [js, css] = await Promise.all([
            jsFile ? compileJS(jsFile) : '',
            cssFile ? compileCSS(cssFile) : '',
        ]);

        const parts = [
            `<noinclude>${desc}</noinclude>`,
            '<includeonly>',
            `<!--{if !isset($wg${name}) || !$wg${name}}-->`,
            `<!--{assign var="wg${name}" value=true scope="global"}-->`,
        ];

        if (css) {
            parts.push(`<styles>\n${css}\n</styles>`);
        }
        if (js) {
            parts.push(`<scripts>\n${js}\n</scripts>`);
        }
        parts.push('<!--{/if}-->', '</includeonly>');

        const dest = join('dist/widgets', name);
        await mkdir(dirname(dest), { recursive: true });
        await writeFile(dest, parts.join('') + '\n');
    }),
);

await buildTemplates();
