import { defineConfig, searchForWorkspaceRoot, type PluginOption } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import basicSSL from "@vitejs/plugin-basic-ssl";
import { glob } from "glob";
import mime from "mime";
import { createSitemap } from 'svelte-sitemap/src/index'

import { cp, readdir, mkdir } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { join, basename } from "node:path";

const exposeLibAV: PluginOption = (() => {
    const IMPUT_MODULE_DIR = join(__dirname, 'node_modules/@imput');
    return {
        name: "vite-libav.js",
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (!req.url?.startsWith('/_libav/')) return next();

                const filename = basename(req.url).split('?')[0];
                if (!filename) return next();

                const [ file ] = await glob(join(IMPUT_MODULE_DIR, '/**/dist/', filename));
                if (!file) return next();

                const fileType = mime.getType(filename);
                if (!fileType) return next();

                res.setHeader('Content-Type', fileType);
                return createReadStream(file).pipe(res);
            });
        },
        generateBundle: async (options) => {
            if (!options.dir) {
                return;
            }

            const assets = join(options.dir, '_libav');
            await mkdir(assets, { recursive: true });

            const modules = await readdir(IMPUT_MODULE_DIR).then(
                modules => modules.filter(m => m.startsWith('libav.js'))
            );

            for (const module of modules) {
                const distFolder = join(IMPUT_MODULE_DIR, module, 'dist/');
                await cp(distFolder, assets, { recursive: true });
            }
        }
    }
})();

const enableCOEP: PluginOption = {
    name: "isolation",
    configureServer(server) {
        server.middlewares.use((_req, res, next) => {
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            next();
        })
    }
};

const generateSitemap: PluginOption = {
    name: "generate-sitemap",
    async writeBundle(bundle) {
        if (!process.env.WEB_HOST || !bundle.dir?.endsWith('server')) {
            return;
        }

        await createSitemap(`https://${process.env.WEB_HOST}`, {
            changeFreq: 'monthly',
            outDir: '.svelte-kit/output/prerendered/pages',
            resetTime: true
        });
    }
}

export default defineConfig({
    plugins: [
        basicSSL(),
        sveltekit(),
        enableCOEP,
        exposeLibAV,
        generateSitemap
    ],
    build: {
        sourcemap: true // Add this line to enable source maps
    },
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp"
        },
        fs: {
            allow: [
                searchForWorkspaceRoot(process.cwd())
            ]
        },
        proxy: {}
    },
    optimizeDeps: {
        exclude: [ "@imput/libav.js-remux-cli" ]
    },
});
