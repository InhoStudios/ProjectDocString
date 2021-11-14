chrome.omnibox.onInputEntered.addListener((text) => {
  // Encode user input for special characters , / ? : @ & = + $ #
  let newURL = 'https://pypi.org/search/?q=' + encodeURIComponent(text);
  chrome.tabs.update({ url: newURL });
});
