async function searchNpm(searchTerm){
    let url = 'https://stormy-tor-99017.herokuapp.com/https://registry.npmjs.org/' + searchTerm;
    return fetch(url).then(function(resp){
        return resp.json().homepage;
    })
}

function processJSON(obj){
    return obj.homepage;
}


export default searchNpm;
searchNpm("discord")

// https://registry.npmjs.org/
// Docs: https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md