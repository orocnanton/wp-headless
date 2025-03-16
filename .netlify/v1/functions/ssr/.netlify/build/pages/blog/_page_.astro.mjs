/* empty css                                    */
import { e as createComponent, r as renderTemplate } from '../../chunks/astro/server_Y9m7VcrS.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$page = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/Users/oscar/Documents/Astro/wp-headless/src/pages/blog/[page].astro", void 0);

const $$file = "/Users/oscar/Documents/Astro/wp-headless/src/pages/blog/[page].astro";
const $$url = "/blog/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$page,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
