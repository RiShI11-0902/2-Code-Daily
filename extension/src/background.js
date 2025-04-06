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
  