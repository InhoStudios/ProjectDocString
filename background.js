import searchPip from './pip';
import searchNpm from './npm-funcs';

chrome.omnibox.setDefaultSuggestion({
    description: "Search any .js or .py library"
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    if (!text.includes(".")) {
        searchNpm(text).then(data => {
            if (!data.url.length) {
                suggest([]);
            } else {
                suggest([
                    {
                        content: text + ".js",
                        description: text + ".js: " + data.description + ". <url>" + data.url + "</url>"
                    }
                ])
            }
        });
        searchNpm(text).then(data => {
            if (!data.url.length) {
                suggest([]);
            } else {
                suggest([
                    {
                        content: text + ".py",
                        description: text + ".py: " + data.description + ". <url>" + data.url + "</url>"
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
        searchNpm(query).then(data => chrome.tabs.update({ url: data.url }));
    }
});
