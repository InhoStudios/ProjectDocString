(()=>{"use strict";const t=async function(t){var r;let e="https://stormy-tor-99017.herokuapp.com/https://pypi.org/pypi/"+t+"/json";return await fetch(e).then((t=>t.json())).then((t=>r=t)),function(t){let r,e=t.info.project_urls.Documentation,n=t.info.project_urls.Homepage;return r=null!==e?e:n,{url:r,description:t.info.summary}}(r)},r=async function(t,r=!0){var e;"discord"==t&&(t+=".js");let n="https://stormy-tor-99017.herokuapp.com/https://registry.npmjs.org/"+t;return await fetch(n).then((t=>t.json())).then((t=>e=t)),"homepage"in e?{description:e.description,url:e.homepage}:"repository"in e?{description:e.description,url:e.repository.url.replace("git+","")}:"error"in e?{description:"",url:"https://www.npmjs.com/package/"+t.split(".")[0]}:{description:e.description.endsWith(".")?e.description:e.description+".",url:"https://www.npmjs.com/package/"+t.split(".")[0]}};chrome.omnibox.setDefaultSuggestion({description:"Search any .js or .py library"}),chrome.omnibox.onInputChanged.addListener(((e,n)=>{if(e.includes(".")){var i=e.split(".")[0],o=e.split(".")[1];"py"==o?(t(e).then((t=>{t.url.length?n([{content:e+".py",description:e+": "+t.description+". <url>"+t.url+"</url>"}]):n([])})),t(i).then((t=>{t.url.length?n([{content:e+".py",description:e+".py: "+t.description+". <url>"+t.url+"</url>"}]):n([])}))):"js"==o&&r(i).then((t=>{t.url.length?n([{content:e+".js",description:e+".js: "+t.description+" <url>"+t.url+"</url>"}]):n([])}))}else r(e).then((t=>{t.url.length?n([{content:e+".js",description:e+".js: "+t.description+" <url>"+t.url+"</url>"}]):n([])})),t(e).then((t=>{t.url.length?n([{content:e+".py",description:e+".py: "+t.description+". <url>"+t.url+"</url>"}]):n([])}))})),chrome.omnibox.onInputEntered.addListener((e=>{var n=e.split(".")[0],i=e.split(".")[1];"py"==i?(t(e).then((t=>chrome.tabs.update({url:t.url}))),t(n).then((t=>chrome.tabs.update({url:t.url})))):"js"==i&&r(n).then((t=>chrome.tabs.update({url:t.url})))}))})();