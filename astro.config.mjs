import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';


export default defineConfig({

site:"https://wordlehinttoday.online",

output:"server",

adapter:cloudflare({

platformProxy:{
enabled:false
},

imageService:"passthrough"

}),

integrations:[
sitemap()
],

vite:{
plugins:[
tailwindcss()
]
}

});