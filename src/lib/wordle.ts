// 1. Asal NYT API Base URL
const NYT_API_BASE = "https://www.nytimes.com/svc/wordle/v2";

// 2. Date ko as a parameter pass kiya taake har din ka cache alag bane
async function getCachedWordle(env: any, date: string) {
    return await env.WORDLE_CACHE?.get(`wordle-${date}`, "json");
}

async function saveCachedWordle(env: any, date: string, data: any) {
    // Key format: "wordle-2026-09-17" taake past archive bhi fast load ho
    await env.WORDLE_CACHE?.put(`wordle-${date}`, JSON.stringify(data));
}

// Main function jisme hum env ke sath 'date' (e.g. "2026-09-17") bhi bhejenge
export async function getWordle(env: any, date: string) {
    try {
        // Step 1: Check KV first for the specific date
        const cached = await getCachedWordle(env, date);

        if (cached) {
            console.log(`Serving from KV Cache for date: ${date}`);
            return cached;
        }

        // Step 2: Fetch from NYT API dynamically for that date
        console.log(`Cache MISS. Fetching NYT API for date: ${date}`);
        const response = await fetch(`${NYT_API_BASE}/${date}.json`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; WordleHintToday.online/1.0)"
            }
        });

        // Error check: Agar URL galat hai ya word nahi aaya
        if (!response.ok) {
            console.error(`NYT API Error: ${response.status} for date ${date}`);
            return null; 
        }

        const data = await response.json();

        // Step 3: Save into KV for future requests
        await saveCachedWordle(env, date, data);

        return data;

    } catch (error) {
        // Agar network crash ho jaye toh site crash na ho
        console.error("Wordle Fetch/Cache Error:", error);
        return null;
    }
}