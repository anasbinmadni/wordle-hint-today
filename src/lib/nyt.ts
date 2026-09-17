    export interface WordleData {
        solution: string;
        days_since_launch: number;
        id: number;
    }

    const NYT_API_URL = "https://www.nytimes.com/svc/wordle/v2";

    export async function fetchWordle(date: string): Promise<WordleData | null> {
        // Note: 'date' must be in exactly 'YYYY-MM-DD' format (e.g., '2026-09-16')
        try {
            const response = await fetch(`${NYT_API_URL}/${date}.json`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible; WordleHintToday.online/1.0)"
                }
            });

            if (!response.ok) {
                console.error(`NYT API Error for date ${date}:`, response.status);
                return null;
            }

            const data = await response.json() as Partial<WordleData>;

            // Safety Check: Make sure the solution actually exists before upper-casing it
            if (
                !data ||
                !data.solution ||
                typeof data.days_since_launch !== "number" ||
                typeof data.id !== "number"
            ) {
                console.error("NYT API Error: Solution missing in response data");
                return null;
            }

            return {
                solution: data.solution.toUpperCase(),
                days_since_launch: data.days_since_launch,
                id: data.id
            };

        } catch (error) {
            console.error("Wordle Fetch Error:", error);
            return null;
        }
    }