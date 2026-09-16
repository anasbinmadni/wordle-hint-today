import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server', // <-- YEH HAI WOH MAGIC LINE JO SSR ON KAREGI
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()]
  }
});