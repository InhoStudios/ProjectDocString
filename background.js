import searchPip from './pip';
import searchNpm from './npm-funcs';

chrome.omnibox.setDefaultSuggestion({
    description: "Search any .js or .py library"
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    if (text.includes(".")) {
        var query = text.split(".")[0];
        searchNpm(query).then(data => {
            if (!data.length) {
                suggest([]);
            } else {
                suggest([
                    {
                        content: data,
                        description: "Library found at <url>" + data + "</url>"
                    }
                ])
            }
        });
        searchNpm(text).then(data => {
            if (!data.length) {
                suggest([]);
            } else {
                suggest([
                    {
                        content: data,
                        description: "Library found at <url>" + data + "</url>"
                    }
                ])
            }
        });
    }
})

chrome.omnibox.onInputEntered.addListener((text) => {
    var ext = text.substring(text.length - 3);
    var query = text.substring(0, text.length - 3);
    if (ext == ".py") {
        let searchURL = searchPip(query);
        chrome.tabs.update({ url: searchURL })
    } else if (ext == ".js") {
        searchNpm(query).then(data => chrome.tabs.update({ url: data }));
        searchNpm(text).then(data => chrome.tabs.update({ url: data }));
    } else {
    }
});
