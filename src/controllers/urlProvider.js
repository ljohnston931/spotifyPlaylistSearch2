function getUrl(searchQueryTerms) {
    const endpoint = "https://www.googleapis.com/customsearch/v1";
    const key = process.env.REACT_APP_API_KEY;
    const customEngine = process.env.REACT_APP_CUSTOM_ENGINE;

    let searchString = "inurl:playlist";
    searchQueryTerms.forEach(queryTerm => {
        searchString += createSearchString(queryTerm);
    })
    searchString = encodeURIComponent(searchString);
    searchString = replaceSpaces(searchString);
    return endpoint + "?key=" + key + "&cx=" + customEngine + "&q=" + searchString;
};

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

module.exports = { getUrl: getUrl };