import type { APIContext } from "astro";

const CACHE_DURATION = 60 * 60 * 24 * 30; // 30 days

export async function getCachedWordle(
	date: string,
	context: APIContext
) {
	const cacheKey = `wordle-${date}`;

	// 1. Check Cloudflare KV
	const cached = await context.locals.runtime.env.WORDLE_CACHE.get(
		cacheKey,
		"json"
	);

	if (cached) {
		console.log("KV CACHE HIT:", date);
		return cached;
	}

	console.log("KV CACHE MISS:", date);

	// 2. Fetch NYT API
	const response = await fetch(
		`https://www.nytimes.com/svc/wordle/v2/${date}.json`
	);

	if (!response.ok) {
		return null;
	}

	const data = await response.json();

	// 3. Store in KV
	await context.locals.runtime.env.WORDLE_CACHE.put(
		cacheKey,
		JSON.stringify(data),
		{
			expirationTtl: CACHE_DURATION,
		}
	);

	return data;
}