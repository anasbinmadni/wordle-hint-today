import { fetchWordle } from "./nyt";


export async function getCachedWordle(
	date:string
){


	try {


		let kv:any = null;


		// Cloudflare KV only exists in production
		try {

			const { env } = await import(
				"cloudflare:workers"
			);

			kv = env.WORDLE_CACHE;


		}
		catch{

			console.log(
				"Local mode: KV unavailable"
			);

		}



		// Check KV cache

		if(kv){


			const cached =
			await kv.get(
				date,
				"json"
			);



			if(cached){

				console.log(
					"KV Cache HIT"
				);

				return cached;

			}

		}



		// Fetch from NYT

		const data =
		await fetchWordle(date);



		// Save to KV

		if(kv && data){


			await kv.put(

				date,

				JSON.stringify(data)

			);


			console.log(
				"Saved to KV"
			);

		}



		return data;



	}

	catch(error){


		console.error(
			"Wordle Cache Error:",
			error
		);



		return null;


	}



}