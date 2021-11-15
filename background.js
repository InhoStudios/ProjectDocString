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
                        description: text + ".js: " + data.description + " <url>" + data.url + "</url>"
                    }
                ])
            }
        });
        searchPip(text).then(data => {
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
    } else {
        var query = text.split(".")[0];
        var ext = text.split(".")[1];
        if (ext == "py") {
            searchPip(text).then(data => {
                if (!data.url.length) {
                    suggest([]);
                } else {
                    suggest([
                        {
                            content: text + ".py",
                            description: text + ": " + data.description + ". <url>" + data.url + "</url>"
                        }
                    ])
                }
            });
            searchPip(query).then(data => {
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
        } else if (ext == "js") {
            searchNpm(query).then(data => {
                if (!data.url.length) {
                    suggest([]);
                } else {
                    suggest([
                        {
                            content: text + ".js",
                            description: text + ".js: " + data.description + " <url>" + data.url + "</url>"
                        }
                    ])
                }
            });
        }
    }
})

chrome.omnibox.onInputEntered.addListener((text) => {
    var query = text.split(".")[0];
    var ext = text.split(".")[1];
    if (ext == "py") {
        searchPip(text).then(data => chrome.tabs.update({ url: data.url }));
        searchPip(query).then(data => chrome.tabs.update({ url: data.url }));
    } else if (ext == "js") {
        searchNpm(query).then(data => chrome.tabs.update({ url: data.url }));
    }
});
