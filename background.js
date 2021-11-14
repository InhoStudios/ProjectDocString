import searchPip from './pip';
import searchNpm from './npm-funcs';

chrome.omnibox.onInputEntered.addListener((text) => {
    var ext = text.substring(text.length - 3);
    var query = text.substring(0, text.length - 3);
    if (ext == ".py") {
        let searchURL = searchPip(query);
        chrome.tabs.update({ url: searchURL })
    } else if (ext == ".js") {
        let searchURL = searchNpm(query);
        chrome.tabs.update({ url: searchURL });
    }
});
