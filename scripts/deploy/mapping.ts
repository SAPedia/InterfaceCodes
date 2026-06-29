import { basename, relative, sep } from 'node:path';

/**
 * 将 dist 目录中的文件路径映射为页面标题
 *
 * 映射规则：
 * - `dist/widgets/<name>`             → `Widget:<name>`
 * - `dist/templates/<name>`             → `Template:<name>`
 * - `dist/global/<name>.js`           → `MediaWiki:<name>.js`
 * - `dist/gadgets/Gadgets-definition` → `MediaWiki:Gadgets-definition`
 * - `dist/gadgets/<gadget>/<file>`   → `MediaWiki:<file>`
 * - `dist/gadgets/<gadget>/<page>/<sub>`   → `MediaWiki:<page>/<sub>`
 * - `dist/gadgets/<gadget>/<page>/_base`    → `MediaWiki:<page>`
 */
const toWikiTitle = (file: string): string => {
    const rel = relative('dist', file).replaceAll(sep, '/');
    const segs = rel.split('/');

    if (rel.startsWith('templates/')) {
        return `Template:${basename(file)}`;
    }

    if (rel.startsWith('widgets/')) {
        return `Widget:${basename(file)}`;
    }

    if (rel.startsWith('global/')) {
        return `MediaWiki:${basename(file)}`;
    }

    if (rel.startsWith('gadgets/')) {
        if (segs.length === 2) {
            // gadgets/Gadgets-definition → MediaWiki:Gadgets-definition
            return `MediaWiki:${segs[1]!}`;
        }
        // gadgets/<gadget>/<page>/_base → MediaWiki:<page>
        if (segs.at(-1) === '_base') {
            return `MediaWiki:${segs.slice(2, -1).join('/')}`;
        }
        // gadgets/<gadget>/<page>/<sub> → MediaWiki:<page>/<sub>
        // gadgets/<gadget>/<file> → MediaWiki:<file>
        return `MediaWiki:${segs.slice(2).join('/')}`;
    }

    throw new Error(`Unknown file path: ${file}`);
};

export { toWikiTitle };
