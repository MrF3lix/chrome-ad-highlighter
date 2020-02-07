chrome.storage.sync.get(['isActive'], (config) => {
    chrome.storage.sync.set({ isActive: !config.isActive });
    location.reload();
});