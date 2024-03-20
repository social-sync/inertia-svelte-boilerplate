import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path, {resolve} from 'path';
import {homedir} from 'os';
import fs from 'fs';

export default defineConfig({
    /**
    * This allows you to use paths like @/folder/file where @ is replaced with
    * node_modules
    */
    resolve: {
        alias: {
            '~@': path.resolve(__dirname, './node_modules'),
        },
    },
    optimizeDeps: {
        include: ['@inertiajs/svelte'],
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
            ssr: 'bootstrap/ssr/ssr.js',
        }),
        svelte({
            prebundleSvelteLibraries: true,
            compilerOptions: {
                hydratable: true,
            }
        }),
    ],
});