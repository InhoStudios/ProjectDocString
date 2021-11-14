async function searchNpm(searchTerm){
    var obj;
    let url = 'https://stormy-tor-99017.herokuapp.com/https://registry.npmjs.org/' + searchTerm;
    fetch(url).then(res => res.json())
        .then(data => obj = data)
    return obj.homepage;
}

searchNpm("discord")

// function processJSON(obj){
//     return obj.homepage;
// }


export default searchNpm;


// https://registry.npmjs.org/
// Docs: https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md