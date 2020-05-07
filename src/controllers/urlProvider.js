function getUrl(searchQueryTerms, apiKey) {
    const endpoint = "https://www.googleapis.com/customsearch/v1";
    const key = getRandomApiKey(apiKey);
    const customEngine = process.env.REACT_APP_CUSTOM_ENGINE;

    let searchString = "inurl:playlist";
    searchQueryTerms.forEach(queryTerm => {
        searchString += createSearchString(queryTerm);
    })
    searchString = encodeURIComponent(searchString);
    searchString = replaceSpaces(searchString);
    return endpoint + "?key=" + key + "&cx=" + customEngine + "&q=" + searchString;
};

function getNextPageUrl(baseUrl, startIndex) {
    return baseUrl + "&start="+ startIndex;
}

function createSearchString(queryTerm) {
    let searchString = '';
    if (queryTerm.artist) {
        searchString += " \"" + queryTerm.artist + "\""; 
    }
    if (queryTerm.song) {
        searchString += " \"" + queryTerm.song + "\"";
    }
    return searchString;
}

function replaceSpaces(searchString) {
    return searchString.split("%20").join("+");
}

function getRandomApiKey(apiKey) {
    if (!apiKey) {
        apiKey = Math.floor(Math.random() * 6)
    }
    const key = "REACT_APP_API_KEY_" + apiKey
    return process.env[key]
}

export default { getUrl: getUrl, getNextPageUrl : getNextPageUrl };