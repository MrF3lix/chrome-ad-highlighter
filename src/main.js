const setBackgroundOfChildNodes = (element, config) => {
    if (element.style) {
        element.style.backgroundColor = config.color;
        element.style.boxSizing = 'border-box';
        const childNodes = element.childNodes;

        childNodes.forEach(node => {
            setBackgroundOfChildNodes(node, config);
        });
    }
}

const getAds = config => {
    if (config.isActive === false) return;
    let ads = document.querySelectorAll('.ads-ad');
    ads.forEach(ad => {
        ad.style.padding = '5px';
        let linkContainer = ad.querySelector('ul');
        if (linkContainer) {
            linkContainer.style.width = '100%';
        }
        setBackgroundOfChildNodes(ad, config);
    });
}

chrome.storage.sync.get(['color', 'isActive'], (config) => {
    getAds(config)
});