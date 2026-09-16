import type { APIRoute } from "astro";


export const GET: APIRoute = () => {


const robots = `

User-agent: *

Allow: /


Sitemap: https://wordlehinttoday.online/sitemap.xml

`;


return new Response(
robots.trim(),
{
headers:{
"Content-Type":"text/plain"
}
}
);


};