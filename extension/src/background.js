chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: "https://2codedaily.com/authenticate-extension" // your login page
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'STORE_EMAIL') {
      chrome.storage.local.set({ email: message.payload }).then(() => {
        sendResponse({ success: true });
      });
      return true;
    }
  
    if (message.type === 'GET_EMAIL') {
      chrome.storage.local.get('email').then((result) => {
        sendResponse({ email: result.email });
      });
      return true;
    }
  });
  