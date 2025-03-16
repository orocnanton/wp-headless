/* empty css                                 */
import { e as createComponent, f as createAstro } from '../chunks/astro/server_Y9m7VcrS.mjs';
import 'kleur/colors';
import 'clsx';
import { e as getLegalPage } from '../chunks/api_D7yCsN3R.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Cookies = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cookies;
  const cookiesPage = await getLegalPage("politica-de-cookies");
  if (cookiesPage) {
    return Astro2.redirect(`/legal/${cookiesPage.slug}`);
  } else {
    return Astro2.redirect("/");
  }
}, "/Users/oscar/Documents/Astro/wp-headless/src/pages/cookies.astro", void 0);

const $$file = "/Users/oscar/Documents/Astro/wp-headless/src/pages/cookies.astro";
const $$url = "/cookies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cookies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
