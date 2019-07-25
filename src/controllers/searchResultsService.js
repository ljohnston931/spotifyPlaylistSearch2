const urlProvider = require('./urlProvider.js');

async function getSearchResults(searchQueryTerms) {
    const url = urlProvider.getUrl(searchQueryTerms);
    const res = await getResponse(url);

    return processResults(res);
}

function processResults(res) {
    if (!res) {
        return;
    }
    let searchResults = {};
    if (res.error) {
        searchResults.error = res.error;
        return searchResults;
    }
    searchResults.hitCount = res.searchInformation.totalResults;
    searchResults.items = res.items.reduce((processedItems, item) => {
        const metatags = item.pagemap.metatags[0];
        const spotifyURI = getSpotifyURI(metatags["og:url"]);
        if (spotifyURI) {
            const playlistInfo = metatags["og:title"]
            processedItems.push({
                title: parseTitle(playlistInfo),
                link: metatags["og:url"],
                imageSource: metatags["og:image"],
                authorName: parseAuthor(playlistInfo),
                authorLink: metatags["music:creator"],
                songCount: metatags["music:song_count"],
                spotifyURI: spotifyURI
            });
        } else {
            //This result isn't a playlist
            searchResults.hitCount = adjustHitCount(searchResults.hitCount);
        }
        return processedItems;
    }, []);
    searchResults.hitCount = formatNumber(searchResults.hitCount);
    return searchResults;
}

function getSpotifyURI(url) {
    if (!url) {
        return;
    }
    const matches = url.match(/(?<=\/playlist\/).*/g);
    if (matches && matches.length === 1) {
        const playlistId = matches[0];
        return "spotify:playlist:" + playlistId;
    }
}

async function getResponse(url) {
    const resPromise = await fetch(url);
    const resJson = await resPromise.json();
    return resJson;
}

function adjustHitCount(hitCount) {
    if (hitCount >= 1000) {
        return hitCount;
    } 
    return hitCount--;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseTitle(playlistInfo) {
    const matches = playlistInfo.match(/.+?(?=, a playlist)/g)
    if (matches && matches.length > 0) {
        return matches[0];
    }
}

function parseAuthor(playlistInfo) {
    const matches = playlistInfo.match(/(?<=a playlist by )(.*)(?= on Spotify|$)/g)
    if (matches && matches.length > 0) {
        return matches[0];
    }
}

module.exports = { getSearchResults: getSearchResults };