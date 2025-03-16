import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_C1AnRY0H.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/get-posts.astro.mjs');
const _page3 = () => import('./pages/api/subscribe.astro.mjs');
const _page4 = () => import('./pages/blog/_page_.astro.mjs');
const _page5 = () => import('./pages/blog.astro.mjs');
const _page6 = () => import('./pages/category/_slug_.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/cookies.astro.mjs');
const _page9 = () => import('./pages/legal/_slug_.astro.mjs');
const _page10 = () => import('./pages/legal-notice.astro.mjs');
const _page11 = () => import('./pages/oraciones.astro.mjs');
const _page12 = () => import('./pages/post/_slug_.astro.mjs');
const _page13 = () => import('./pages/privacy.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/get-posts.js", _page2],
    ["src/pages/api/subscribe.js", _page3],
    ["src/pages/blog/[page].astro", _page4],
    ["src/pages/blog.astro", _page5],
    ["src/pages/category/[slug].astro", _page6],
    ["src/pages/contact.astro", _page7],
    ["src/pages/cookies.astro", _page8],
    ["src/pages/legal/[slug].astro", _page9],
    ["src/pages/legal-notice.astro", _page10],
    ["src/pages/oraciones.astro", _page11],
    ["src/pages/post/[slug].astro", _page12],
    ["src/pages/privacy.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0152596a-c33f-4b55-b5f4-5e912826f94e"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
