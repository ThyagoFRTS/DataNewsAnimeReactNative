const nextSeason = "https://api.jikan.moe/v3/season/later"
const searchAnimeTitle = "https://api.jikan.moe/v3/search/anime?q=";
const searchAnimeTitleId = "https://api.jikan.moe/v3/anime/";


async function getNextSeason (){
    let req = await fetch(nextSeason);
    let respJson = req.json();
    console.warn(respJson);

}


export {getNextSeason}