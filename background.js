import searchPip from './pip';
import searchNpm from './npm-funcs';

import { debounce } from 'debounce';

chrome.omnibox.setDefaultSuggestion({
    description: "Search any .js or .py library"
});

function handleOnInputChanged(text, suggest) {
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
}
chrome.omnibox.onInputChanged.addListener(debounce(handleOnInputChanged, 200));

chrome.omnibox.onInputEntered.addListener((text) => {
    var query = text.split(".")[0];
    var ext = text.split(".")[1];
    if (ext == "py") {
        searchPip(text).then(data => chrome.tabs.update({ url: data.url }));
    } else if (ext == "js") {
        searchNpm(query).then(data => chrome.tabs.update({ url: data.url }));
    }
});