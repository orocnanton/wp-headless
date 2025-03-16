import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';  // Actualizado: eliminado '/functions'
// Elige solo un adaptador - he seleccionado Netlify porque es muy popular

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'hybrid', // Cambiando de 'server' a 'hybrid' para combinar SSR y pre-renderizado
  adapter: netlify()
});
