async function searchPip(searchTerm){
    if(searchTerm == "discord"){
        searchTerm += ".py"
    }
    var obj;
    let url = 'https://stormy-tor-99017.herokuapp.com/https://pypi.org/pypi/' + searchTerm + "/json";
    await fetch(url).then(res => res.json())
        .then(data => obj = data)
    return getUrl(obj);
}

function getUrl(json) {
    let docsUrl = json.info.project_urls.Documentation;
    let homePage = json.info.project_urls.Homepage;
    let url;

    url = docsUrl !== null? docsUrl : homePage;

    if(!url) {
        return {url: `https://pypi.org/project/${json.info.name}`, description: json.info.summary}
    }

    return {url: url, description: json.info.summary};
}
export default searchPip;

// https://pypi.org/pypi/PACKAGE/json
// OR
// https://pypi.org/simple
