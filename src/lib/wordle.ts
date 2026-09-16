import {
getCachedWordle,
saveCachedWordle
}
from "./nytCache";


const API_URL =
"https://your-nyt-api-url";


export async function getWordle(env:any){


    // 1. Check KV first

    const cached =
    await getCachedWordle(env);



    if(cached){

        console.log(
        "Serving from KV"
        );

        return cached;

    }



    // 2. Fetch NYT API

    const response =
    await fetch(API_URL);



    const data =
    await response.json();



    // 3. Save into KV

    await saveCachedWordle(
        env,
        data
    );



    return data;

}