import type { AstroGlobal } from "astro";
import { getCachedWordle } from "./cache";
import type { WordleData } from "./nyt";



export async function getWordleByDate(
	date: string,
	Astro: AstroGlobal
): Promise<WordleData | null> {


	if(!date){

		return null;

	}


	return await getCachedWordle(
		date,
		Astro
	);


}




export function formatWordleDate(
	date: Date
): string {


	const year =
		date.getFullYear();



	const month =
		String(
			date.getMonth() + 1
		).padStart(2,"0");



	const day =
		String(
			date.getDate()
		).padStart(2,"0");



	return `${year}-${month}-${day}`;

}