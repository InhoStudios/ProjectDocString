function searchPip(searchTerm){
    return fetch(`https://pypi.org/pypi/${searchTerm}/json`)
    .then(getUrl);
}

function getUrl(response) {
    let docsUrl = response.json().info.docs_url;
    let homePage = response.json().info.home_page;
    let url;

    url = docsUrl !== null? docsUrl : homePage;

    return url;
}

// https://pypi.org/pypi/PACKAGE/json
// OR
// https://pypi.org/simple