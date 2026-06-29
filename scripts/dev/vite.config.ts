import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    root: resolve(import.meta.dirname, './site'),
    plugins: [react(), tailwindcss()],
    define: {
        'process.env.CONVERT_TO_HTML': '"true"',
        'process.env.WIKI_SITE_BASE': '"https://saoaw.com"',
    },
    resolve: {
        alias: {
            '~': resolve(import.meta.dirname, '../../src'),
        },
    },
});
