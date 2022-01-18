import urlProvider from './urlProvider.js';
import ReactGA from 'react-ga';

async function getSearchResults(searchQueryTerms, apiKey = null) {
    const url = urlProvider.getUrl(searchQueryTerms, apiKey);
    const res = await getResponse(url);
    let results = processResults(res);
    results.baseUrl = url;
    if (results.nextPageIndex) {
        results.nextPageUrl = urlProvider.getNextPageUrl(url, results.nextPageIndex)
    } 
    return results;
}

async function getMoreResults(nextPageUrl, baseUrl) {
    const res = await getResponse(nextPageUrl);
    let results = processMoreResults(res);
    results.baseUrl = baseUrl;
    if (results.nextPageIndex) {
        results.nextPageUrl = urlProvider.getNextPageUrl(baseUrl, results.nextPageIndex)
    } else {
        results.nextPageUrl = null;
    }
    return results;
}

function processMoreResults(res) {
    if (!res) {
        return;
    }
    let searchResults = {};
    if (res.error) {
        //ReactGA.initialize('UA-146064976-1');
        //ReactGA.exception(res.error);
        console.log(res.error)
        searchResults.error = res.error;
        return searchResults;
    }
    if (res.items) {
        searchResults.items = res.items.reduce((processedItems, item) => {
            const metatags = item.pagemap.metatags[0];
            const spotifyUri = getSpotifyURI(metatags["og:url"]);
            if (spotifyUri) {
                let processedItem = parseMetatags(metatags);
                processedItem.spotifyUri = spotifyUri;
                processedItems.push(processedItem);
            } else {
                //This result isn't a playlist
                searchResults.hitCount = adjustHitCount(searchResults.hitCount);
            }
            return processedItems;
        }, []);
    }

    if (res.queries && res.queries.nextPage && res.queries.nextPage.length > 0) {
        searchResults.nextPageIndex = res.queries.nextPage[0].startIndex;
    } else {
        searchResults.nextPageIndex = null;
    }

    return searchResults;
}

function processResults(res) {
    if (!res) {
        return;
    }
    let searchResults = {};
    if (res.error) {
        //ReactGA.initialize('UA-146064976-1');
        //ReactGA.exception(res.error);
        console.log(res.error)
        searchResults.error = res.error;
        return searchResults;
    }
    searchResults.hitCount = res.searchInformation.totalResults;
    if (res.items) {
        searchResults.items = res.items.reduce((processedItems, item) => {
            const metatags = item.pagemap.metatags[0];
            const spotifyUri = getSpotifyURI(metatags["og:url"]);
            if (spotifyUri) {
                let processedItem = parseMetatags(metatags);
                processedItem.spotifyUri = spotifyUri;
                processedItems.push(processedItem);
            } else {
                //This result isn't a playlist
                searchResults.hitCount = adjustHitCount(searchResults.hitCount);
            }
            return processedItems;
        }, []);
    }

    if (res.queries && res.queries.nextPage && res.queries.nextPage.length > 0) {
        searchResults.nextPageIndex = res.queries.nextPage[0].startIndex;
    } else {
        searchResults.nextPageIndex = null;
    }

    if (searchResults.hitCount > 1) {
        searchResults.message = formatNumber(searchResults.hitCount) + " results";
    } else if (searchResults.hitCount == 1) {
        searchResults.message = formatNumber(searchResults.hitCount) + " result";
    } else {
        searchResults.message = "No public playlists match your search. Try using less specific criteria and double-check your spelling."
    }
    
    return searchResults;
}

const parseMetatags = (metatags) => {
    return {
        title: parseTitle(metatags["og:title"]),
        link: metatags["og:url"],
        imageSource: metatags["og:image"],
        authorName: parseAuthor(metatags["og:title"], metatags["og:description"]),
        authorLink: metatags["music:creator"],
        songCount: parseSongCount(metatags["og:description"]),
    }
}

function getSpotifyURI(url) {
    if (!url) {
        return;
    }
    const matches = url.match(/\/playlist\/(.*)/);
    if (matches && matches.length === 2) {
        const playlistId = matches[1];
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
    return hitCount - 1;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseTitle(playlistInfo) {
    if (playlistInfo.includes("a playlist by")) {
        const matches = playlistInfo.match(/.+?(?=, a playlist)/)
        if (matches && matches.length > 0) {
            return matches[0];
        }
    } else {
        return playlistInfo;
    }
}

function parseAuthor(title, description) { 
    let matches = title.match(/a playlist by (.*)/)
    if (matches && matches.length > 1) {
        let authorString = matches[1];
        return authorString.replace(" on Spotify", "");
    }
    matches = description.match(/.*?(?= ·)/)
    if (matches && matches.length > 0) {
        return matches[0]
    } else {
        return "Spotify"
    }
}

const parseSongCount = (description) => {
    const matches = description.match(/\d+(?= songs)/)
    if (matches && matches.length > 0) {
        return matches[0];
    }
}

export default { getSearchResults: getSearchResults, getMoreResults: getMoreResults };