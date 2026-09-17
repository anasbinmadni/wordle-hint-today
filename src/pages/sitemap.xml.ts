import type { APIRoute } from "astro";

const staticPages = [
    "/",
    "/today-wordle-hint",
    "/today-wordle-answer",
    "/wordle-solver",
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
    const domain = "https://wordlehinttoday.online";

    let urls = staticPages.map(page => `
        <url>
            <loc>${domain}${page}</loc>
            <changefreq>daily</changefreq>
            <priority>${page === "/" ? "1.0" : "0.8"}</priority>
        </url>
    `).join("");

    // EST TIMEZONE LOGIC
    const estTimeString = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const endDate = new Date(estTimeString);
    
    // Wordle Launch Date
    const startDate = new Date("2021-06-19T00:00:00-05:00"); 

    // Generate Dynamic URLs (Full 2000+ Pages)
    let currentDate = new Date(startDate);
    let puzzleId = 0; // Starts from 0 or 1 depending on NYT API

    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        urls += `
        <url>
            <loc>${domain}/wordle-hint-${puzzleId}-${year}-${month}-${day}</loc>
            <changefreq>never</changefreq>
            <priority>0.6</priority>
        </url>`;
        
        currentDate.setDate(currentDate.getDate() + 1);
        puzzleId++;
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml.trim(), {
        headers: {
            "Content-Type": "application/xml"
        }
    });
};