/// <reference types="vite/client" />

export interface PageToPreview {
    namespace: 'Template';
    pageName: string;
    fullPageName: string;
}

const modules = import.meta.glob<{ default: React.ComponentType }>('~/templates/*/index.tsx');

export const pages = new Map<string, PageToPreview>();

for (const path of Object.keys(modules)) {
    const match = path.match(/\/templates\/([^/]+)\/index\.tsx$/);
    if (match) {
        const pageName = match[1]!;
        const fullPageName = ('Template:' + pageName) as string;
        pages.set(fullPageName, {
            namespace: 'Template',
            pageName,
            fullPageName,
        });
    }
}
