import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    root: resolve(import.meta.dirname, './site'),
    plugins: [react()],
    resolve: {
        alias: {
            '~': resolve(import.meta.dirname, '../../src'),
        },
    },
});
