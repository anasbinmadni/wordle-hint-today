import type { APIRoute } from "astro";

const staticPages = [
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
    const domain = "https://wordlehinttoday.online";

    let urls = staticPages.map(page => `
        <url>
            <loc>${domain}${page}</loc>
            <changefreq>daily</changefreq>
            <priority>${page === "/" ? "1.0" : "0.8"}</priority>
        </url>
    `).join("");

    // DYNAMIC DAILY URLS: Generate sitemap links for the past 30 days
    // STRICT EST TIMEZONE FIX
    const estTimeString = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const baseDate = new Date(estTimeString);

    for (let i = 0; i <= 30; i++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() - i);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        urls += `
        <url>
            <loc>${domain}/wordle-hint-${1000 - i}-${year}-${month}-${day}</loc>
            <changefreq>never</changefreq>
            <priority>0.7</priority>
        </url>
        `;
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