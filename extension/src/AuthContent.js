window.addEventListener("message", (event) => {
  if (event.source !== window) return; // Ensure it's from the same page
  if (event.data.type === "EMAIL_FOR_EXTENSION" && event.data.email) {
    chrome.storage.local.set({ userEmail: event.data.email }, () => {
    });
  }
});
