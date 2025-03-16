/* empty css                                 */
import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, h as addAttribute } from '../chunks/astro/server_Y9m7VcrS.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C1pNFcY1.mjs';
import { g as getPosts } from '../chunks/api_D7yCsN3R.mjs';
export { renderers } from '../renderers.mjs';

const $$Oraciones = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getPosts();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Oraciones Cristianas - Colecci\xF3n completa" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mb-12"> <div class="text-center mb-8"> <h1 class="text-4xl font-extrabold text-gray-900 leading-tight sm:text-5xl mb-4">
Oraciones Cristianas
</h1> <p class="text-xl text-gray-600 max-w-3xl mx-auto">
Encuentra oraciones para diferentes momentos y necesidades espirituales
</p> </div> </section> <main> ${posts.length > 0 ? renderTemplate`<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${posts.map((post) => renderTemplate`<li class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"> <div class="relative h-56 overflow-hidden"> ${post._embedded?.["wp:featuredmedia"]?.[0] ? renderTemplate`<img${addAttribute(post._embedded["wp:featuredmedia"][0].source_url, "src")}${addAttribute(post.title.rendered, "alt")} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">` : renderTemplate`<div class="w-full h-full bg-gradient-to-tr from-primary-100 to-primary-200 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div>`} <div class="absolute top-4 left-4 flex flex-wrap gap-2"> ${post._embedded?.["wp:term"]?.[0]?.map((cat) => renderTemplate`<span class="bg-black/50 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full"> ${cat.name} </span>`)} </div> </div> <div class="p-6"> <h2 class="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors">${post.title.rendered}</h2> <div class="text-gray-600 mb-4 line-clamp-2">${unescapeHTML(post.excerpt.rendered)}</div> <div class="flex items-center justify-between"> <span class="text-sm text-gray-500"> ${new Date(post.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </span> <a${addAttribute(`/post/${post.slug}`, "href")} class="inline-flex items-center font-medium text-primary-700 hover:text-primary-800 transition-colors">
Leer más
<svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </a> </div> </div> </li>`)} </ul>` : renderTemplate`<div class="text-center py-12"> <p class="text-xl text-gray-600">No se encontraron oraciones disponibles.</p> </div>`} </main> ` })}`;
}, "/Users/oscar/Documents/Astro/wp-headless/src/pages/oraciones.astro", void 0);

const $$file = "/Users/oscar/Documents/Astro/wp-headless/src/pages/oraciones.astro";
const $$url = "/oraciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Oraciones,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
