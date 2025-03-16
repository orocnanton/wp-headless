/* empty css                                 */
import { e as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead, k as Fragment, u as unescapeHTML, h as addAttribute } from '../chunks/astro/server_Y9m7VcrS.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_C1pNFcY1.mjs';
import { g as getPosts, a as getOracionesCategoriaId, b as getCategory } from '../chunks/api_D7yCsN3R.mjs';
export { renderers } from '../renderers.mjs';

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const initialPosts = await getPosts(1, 12);
  const totalPosts = Array.isArray(initialPosts) ? initialPosts.length : 0;
  await getOracionesCategoriaId();
  const oracionesCategory = await getCategory("oraciones-cristianas") || await getCategory("oraciones");
  const sectionTitle = oracionesCategory?.name || "Oraciones Cristianas";
  const sectionDescription = oracionesCategory?.description || "Encuentra paz y consuelo en nuestra colecci\xF3n de oraciones para diferentes momentos y necesidades espirituales";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${sectionTitle} - Oraciones Cristianas` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mb-16"> <div class="text-center mb-12"> <h1 class="text-5xl font-heading font-medium text-dark-500 leading-tight mb-6"> ${sectionTitle} </h1> <div class="decorated-title mb-6"> <span class="text-primary-500 font-serif italic">Reflexiones y crecimiento</span> </div> <p class="text-xl text-dark-400 max-w-3xl mx-auto font-light"> ${sectionDescription} </p> </div> </section> <main> ${totalPosts > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="mb-12 flex items-center justify-between"> <h2 class="text-3xl font-heading font-medium text-dark-500">Artículos recientes</h2> <div class="flex space-x-2"> <button id="grid-view-btn" class="p-2 rounded-md bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors" aria-label="Vista de cuadrícula"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path> </svg> </button> <button id="list-view-btn" class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Vista de lista"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path> </svg> </button> </div> </div> <ul id="posts-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${initialPosts.map((post) => renderTemplate`<li class="chapel-card group bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all"> <div class="relative h-56 overflow-hidden"> ${post?._embedded?.["wp:featuredmedia"]?.[0] ? renderTemplate`<img${addAttribute(post._embedded["wp:featuredmedia"][0].source_url, "src")}${addAttribute(post.title?.rendered || "", "alt")} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">` : renderTemplate`<div class="w-full h-full bg-gradient-to-tr from-primary-50 to-primary-100 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path> </svg> </div>`} <div class="absolute top-4 left-4 flex flex-wrap gap-2"> ${post?._embedded?.["wp:term"]?.[0]?.map((category) => renderTemplate`<span class="bg-dark-500/70 backdrop-blur-md text-white text-xs px-3 py-1 font-sans uppercase tracking-wider"> ${category?.name || ""} </span>`)} </div> </div> <div class="p-8"> <h2 class="text-2xl font-heading mb-3 text-dark-500 group-hover:text-primary-500 transition-colors">${post?.title?.rendered || "Sin t\xEDtulo"}</h2> <div class="text-dark-400 mb-4 line-clamp-2 font-light">${unescapeHTML(post?.excerpt?.rendered || "")}</div> <div class="flex items-center justify-between pt-4 border-t border-gray-100"> <span class="text-sm text-dark-300 italic font-serif"> ${new Date(post?.date || /* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long"
  })} </span> <a${addAttribute(`/post/${post?.slug || "#"}`, "href")} class="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium uppercase text-xs tracking-wider">
Leer más
<svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </a> </div> </div> </li>`)} </ul> <div class="flex justify-center mt-12" id="load-more-container"> <button id="load-more-btn" class="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-all font-medium flex items-center space-x-2 shadow-sm hover:shadow"> <span>Ver más artículos</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </button> <div id="loading-spinner" class="hidden"> <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div> </div> </div> ` })}` : renderTemplate`<div class="text-center py-16"> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path> </svg> <h2 class="text-2xl font-heading font-medium text-dark-500 mb-4">No hay artículos disponibles</h2> <p class="text-dark-400 max-w-lg mx-auto">
Actualmente no hay artículos publicados en esta sección. Vuelve pronto para encontrar reflexiones y contenido espiritual.
</p> </div>`} </main> ` })} ${renderScript($$result, "/Users/oscar/Documents/Astro/wp-headless/src/pages/blog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/oscar/Documents/Astro/wp-headless/src/pages/blog.astro", void 0);

const $$file = "/Users/oscar/Documents/Astro/wp-headless/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
