import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify/functions';
// Elige solo un adaptador - he seleccionado Netlify porque es muy popular

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: netlify()
});
