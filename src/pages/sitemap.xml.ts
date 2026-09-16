import type { APIRoute } from "astro";


const pages = [

"/",

"/today-wordle-hint",

"/today-wordle-answer",

"/wordle-solver",

"/wordle-archive",

"/past-answers",


"/about",

"/privacy-policy",

"/terms-of-service",

"/contact",


"/blog",

"/blog/how-to-play-wordle",

"/blog/best-wordle-starting-words",

"/blog/wordle-tips-and-tricks",

"/blog/wordle-vs-connections"

];



export const GET: APIRoute = () => {


const domain =
"https://wordlehinttoday.online";



const urls = pages.map(page=>`

<url>

<loc>${domain}${page}</loc>

<changefreq>daily</changefreq>

<priority>${page === "/" ? "1.0":"0.8"}</priority>

</url>

`).join("");



const xml = `

<?xml version="1.0" encoding="UTF-8"?>

<urlset

xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"

>

${urls}

</urlset>

`;



return new Response(

xml.trim(),

{

headers:{

"Content-Type":"application/xml"

}

}

);


};