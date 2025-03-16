/* empty css                                 */
import { e as createComponent, f as createAstro } from '../chunks/astro/server_Y9m7VcrS.mjs';
import 'kleur/colors';
import 'clsx';
import { e as getLegalPage } from '../chunks/api_D7yCsN3R.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Privacy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Privacy;
  const privacyPage = await getLegalPage("politica-de-privacidad");
  if (privacyPage) {
    return Astro2.redirect(`/legal/${privacyPage.slug}`);
  } else {
    return Astro2.redirect("/about");
  }
}, "/Users/oscar/Documents/Astro/wp-headless/src/pages/privacy.astro", void 0);

const $$file = "/Users/oscar/Documents/Astro/wp-headless/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
