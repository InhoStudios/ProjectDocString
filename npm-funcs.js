async function searchNpm(searchTerm, sort_by_popularity=true){
    var obj;
    if(sort_by_popularity){
        let url = 'https://stormy-tor-99017.herokuapp.com/https://registry.npmjs.org/-/v1/search?text=' + searchTerm;
        await fetch(url).then(res => res.json())
            .then(data => obj = data)
        if(obj.total > 0){
            obj = obj.objects
            obj.sort(compareFinal)
            obj.reverse()
            searchTerm = obj[0].package.name
        }
    }

    let url = 'https://stormy-tor-99017.herokuapp.com/https://registry.npmjs.org/' + searchTerm;
    await fetch(url).then(res => res.json())
        .then(data => obj = data)


    if('homepage' in obj){
        return {description: obj.description, url: obj.homepage};
    }else if('repository' in obj){
        return {description: obj.description, url: obj.repository.url.substring(4,obj.repository.url.length)}
    }else{
        if('error' in obj){
            return {description: "", url: "https://www.npmjs.com/package/" + searchTerm.split(".")[0]}
        }else{
            return {description: obj.description.endsWith(".") ? obj.description : obj.description + ".", url: "https://www.npmjs.com/package/" + searchTerm.split(".")[0]};
        }
    }
}

function compareFinal( a, b ) {
    if ( a.score.final < b.score.final){
        return -1;
    }
    if ( a.score.final > b.score.final ){
        return 1;
    }
    return 0;
}

export default searchNpm;


// https://registry.npmjs.org/
// Docs: https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md