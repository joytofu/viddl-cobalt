import "dotenv/config";
import adapter from "@sveltejs/adapter-static";

import { mdsvex } from "mdsvex";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { sveltePreprocess } from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    extensions: [".svelte", ".md"],
    preprocess: [
        {
            name: "strip-announcer",
            markup: ({ content: code }) => {
                code = code.replace(
                    /<div id="svelte-announcer" [\s\S]*?<\/div>/,
                    '<svelte:component this={null} />'
                );

                return { code }
            }
        },
        sveltePreprocess(),
        mdsvex({
            extensions: ['.md'],
            // 添加ignore选项排除博客文章目录
            ignore: ['**/routes/blogs/posts/*.md'],
            layout: {
                about: join(
                    dirname(fileURLToPath(import.meta.url)),
                    '/src/components/misc/AboutPageWrapper.svelte'
                ),
                changelogs: join(
                    dirname(fileURLToPath(import.meta.url)),
                    '/src/components/changelog/ChangelogEntryWrapper.svelte'
                )
            }
        })
    ],
    kit: {
        adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: 'build',
            assets: 'build',
            fallback: 'index.html',
            precompress: false,
            //strict: true
        }),
        prerender: {
            entries: ['*'], // 预渲染所有页面
            handleMissingId: 'warn', // 缺少ID时仅警告而非报错
            crawl: true // 自动发现并预渲染所有链接页面
        },
        csp: {
            mode: "hash",
            directives: {
                "connect-src": ["*"],
                "default-src": ["none"],

                "font-src": ["self"],
                "style-src": ["self", "unsafe-inline"],
                "img-src": ["*", "data:"],
                "manifest-src": ["self"],
                "worker-src": ["self"],

                "object-src": ["none"],
                "frame-src": [
                    "self",
                    "challenges.cloudflare.com"
                ],

                "script-src": [
                    "self",
                    "wasm-unsafe-eval",
                    "challenges.cloudflare.com",
                    "www.googletagmanager.com",
                    "sha256-agcr0peth1MshZ7m/6LWnKnQ3oSm1JJPm1ueahsd0nA=",
                    "sha256-TKO57MzqeWoQiH4tRXrz0GQc3bcohvZfm/Y65BFxwtg=",
                    "sha256-g67gIjM3G8yMbjbxyc3QUoVsKhdxgcQzCmSKXiZZo6s=",
                    "sha256-kcBF6wQU5yeiBo0/AfyRI7c9sQsggxdflee5iI9Xwrw=",
                    "sha256-8Qq2eH/+nyhuY31PMcSDb2dPRtRdUmhsFk8p9OYFSNM=",
                    "sha256-qwnOt5R+RmUangW3myI4FOq2GE5Jg84xX07svu/BURQ=",

                    // eslint-disable-next-line no-undef
                    process.env.WEB_PLAUSIBLE_HOST ? process.env.WEB_PLAUSIBLE_HOST : "",

                    // hash of the theme preloader in app.html
                    "sha256-g67gIjM3G8yMbjbxyc3QUoVsKhdxgcQzCmSKXiZZo6s=",
                    "sha256-kcBF6wQU5yeiBo0/AfyRI7c9sQsggxdflee5iI9Xwrw=",
                    
                ],

                "frame-ancestors": ["none"]
            }
        },
        env: {
            publicPrefix: 'WEB_'
        },
        version: {
            pollInterval: 60000
        },
        paths: {
            //relative: false
            base: ''
        },
        alias: {
            $components: 'src/components',
            $i18n: 'i18n',
        }
    }
};

export default config;
