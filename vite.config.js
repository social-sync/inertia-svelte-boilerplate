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
        svelte({
            prebundleSvelteLibraries: true,
        }),
        laravel.default({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});


/**
 * This is some custom config added by us at SocialSync from a Freek Van Der Herten blog post.
 * Helps resolve custom domains using Valet and it's SSL.
 * 
 * @param {string} host 
 * @returns 
 */
function detectServerConfig(host) {
    let keyPath = resolve(homedir(), `.config/valet/Certificates/${host}.key`)
    let certificatePath = resolve(homedir(), `.config/valet/Certificates/${host}.crt`)

    if (!fs.existsSync(keyPath)) {
        return {}
    }

    if (!fs.existsSync(certificatePath)) {
        return {}
    }

    return {
        hmr: {host},
        host,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certificatePath),
        },
    }
}
