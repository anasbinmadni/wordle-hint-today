import { getCachedWordle } from "./cache";
import type { WordleData } from "./nyt";

// AstroGlobal import hata diya hai kyunke ab iski zaroorat nahi

export async function getWordleByDate(
    date: string
): Promise<WordleData | null> {

    if (!date) {
        return null;
    }

    // Sirf date pass karni hai, Astro object nahi
    return await getCachedWordle(date);
}


export function formatWordleDate(
    date: Date
): string {

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}