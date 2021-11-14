async function searchNpm(searchTerm, sort_by_popularity=true){
    var obj;
    if(sort_by_popularity){
        let url = 'https://stormy-tor-99017.herokuapp.com/https://registry.npmjs.org/-/v1/search?text=' + searchTerm;
        await fetch(url).then(res => res.json())
            .then(data => obj = data)
        obj = obj.objects
        obj.sort(compareFinal)
        obj.reverse()
        console.log(obj)
        obj = obj[0]
    }else{
        let url = 'https://stormy-tor-99017.herokuapp.com/https://registry.npmjs.org/' + searchTerm;
        await fetch(url).then(res => res.json())
            .then(data => obj = data)
    }

    if('homepage' in obj){
        return obj.homepage;
    }else if('repository' in obj){
        return obj.repository.url.substring(4,obj.repository.url.length)
    }else{
        return "https://www.npmjs.com/package/" + searchTerm.split(".")[0];
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