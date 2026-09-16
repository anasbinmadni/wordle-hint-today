import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({

  // Enable SSR for Cloudflare Pages
  output: 'server',

  // Cloudflare adapter
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },

    // Disable automatic SESSION KV generation
    sessionKVBindingName: undefined
  }),

  vite: {
    plugins: [
      tailwindcss()
    ]
  }

});