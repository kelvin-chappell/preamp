function log(message) {
    console.log("PREAMP: " + message)
}

function sendToPage(tabId, message) {
    log("Sending message to tab " + tabId);
    console.log(message);
    const sending = browser.tabs.sendMessage(tabId, message);
    console.log(sending);
}

function logBid(details) {
    const filter = browser.webRequest.filterResponseData(details.requestId);
    const decoder = new TextDecoder("utf-8");

    filter.ondata = event => {
        log("Logging bid");
        const str = decoder.decode(event.data, {stream: true});
        filter.disconnect();
        sendToPage(details.tabId, JSON.parse(str));
    };

    return {};
}

function logAdCall(details) {
    log("Logging ad call");
    const lineItemId = details.responseHeaders.find(function (header) {
        return header.name === "google-lineitem-id";
    }).value;
    const creativeId = details.responseHeaders.find(function (header) {
        return header.name === "google-creative-id";
    }).value;
    sendToPage(details.tabId, {
        adDetails: {
            lineItemId: lineItemId,
            creativeId: creativeId
        }
    })
}

browser.webRequest.onBeforeRequest.addListener(
    logBid,
    {urls: ["https://prebid.adnxs.com/*"]},
    ["blocking"]
);

browser.webRequest.onCompleted.addListener(
    logAdCall,
    {urls: ["https://securepubads.g.doubleclick.net/gampad/*"]},
    ["responseHeaders"]
);
