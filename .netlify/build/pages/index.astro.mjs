/* empty css                                 */
import { e as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, h as addAttribute } from '../chunks/astro/server_Y9m7VcrS.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C1pNFcY1.mjs';
import { g as getPosts, a as getOracionesCategoriaId, b as getCategory } from '../chunks/api_D7yCsN3R.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getPosts();
  await getOracionesCategoriaId();
  await getCategory("oraciones-cristianas") || await getCategory("oraciones");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Oraciones Cristianas - Reza Cada D\xEDa", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mb-16" data-astro-cid-j7pv25f6> <div class="text-center mb-12" data-astro-cid-j7pv25f6> <h1 class="text-5xl font-heading font-medium text-dark-500 leading-tight mb-6" data-astro-cid-j7pv25f6>
Oraciones Cristianas
</h1> <div class="decorated-title mb-6" data-astro-cid-j7pv25f6> <span class="text-primary-500 font-serif italic" data-astro-cid-j7pv25f6>Fe y devoción</span> </div> <p class="text-xl text-dark-400 max-w-3xl mx-auto font-light" data-astro-cid-j7pv25f6>
Encuentra paz y consuelo en nuestra colección de oraciones para diferentes momentos y necesidades espirituales
</p> </div> </section> <main data-astro-cid-j7pv25f6> <div class="mb-12 flex items-center justify-between" data-astro-cid-j7pv25f6> <h2 class="text-3xl font-heading font-medium text-dark-500" data-astro-cid-j7pv25f6>Colección de Oraciones</h2> <div class="flex space-x-2" data-astro-cid-j7pv25f6> <button id="grid-view-btn" class="p-2 rounded-md bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors" aria-label="Vista de cuadrícula" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-j7pv25f6> <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-astro-cid-j7pv25f6></path> </svg> </button> <button id="list-view-btn" class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Vista de lista" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-j7pv25f6> <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" data-astro-cid-j7pv25f6></path> </svg> </button> </div> </div> <ul id="posts-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-j7pv25f6> ${posts.map((post) => renderTemplate`<li class="chapel-card group bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all" data-astro-cid-j7pv25f6> <div class="relative h-56 overflow-hidden" data-astro-cid-j7pv25f6> ${post._embedded?.["wp:featuredmedia"]?.[0] ? renderTemplate`<img${addAttribute(post._embedded["wp:featuredmedia"][0].source_url, "src")}${addAttribute(post.title.rendered, "alt")} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-astro-cid-j7pv25f6>` : renderTemplate`<div class="w-full h-full bg-gradient-to-tr from-primary-50 to-primary-100 flex items-center justify-center" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-j7pv25f6></path> </svg> </div>`} <div class="absolute top-4 left-4 flex flex-wrap gap-2" data-astro-cid-j7pv25f6> ${post._embedded?.["wp:term"]?.[0]?.map((category) => renderTemplate`<span class="bg-dark-500/70 backdrop-blur-md text-white text-xs px-3 py-1 font-sans uppercase tracking-wider" data-astro-cid-j7pv25f6> ${category.name} </span>`)} </div> </div> <div class="p-8" data-astro-cid-j7pv25f6> <h2 class="text-2xl font-heading mb-3 text-dark-500 group-hover:text-primary-500 transition-colors" data-astro-cid-j7pv25f6>${post.title.rendered}</h2> <div class="text-dark-400 mb-4 line-clamp-2 font-light" data-astro-cid-j7pv25f6>${unescapeHTML(post.excerpt.rendered)}</div> <div class="flex items-center justify-between pt-4 border-t border-gray-100" data-astro-cid-j7pv25f6> <span class="text-sm text-dark-300 italic font-serif" data-astro-cid-j7pv25f6> ${new Date(post.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long"
  })} </span> <a${addAttribute(`/post/${post.slug}`, "href")} class="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium uppercase text-xs tracking-wider" data-astro-cid-j7pv25f6>
Leer más
<svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-j7pv25f6> <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-j7pv25f6></path> </svg> </a> </div> </div> </li>`)} </ul> </main> ` })} ${renderScript($$result, "/Users/oscar/Documents/Astro/wp-headless/src/pages/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/oscar/Documents/Astro/wp-headless/src/pages/index.astro", void 0);

const $$file = "/Users/oscar/Documents/Astro/wp-headless/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
