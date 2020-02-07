chrome.runtime.onInstalled.addListener(function () {

    chrome.storage.sync.set({ color: '#FFFCBD', isActive: true });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { schemes: ['https', 'http'] },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    chrome.pageAction.onClicked.addListener(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { file: 'src/toggle.js' }
            );
        });
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { file: 'src/main.js' }
                );
            });
        }
    })
});