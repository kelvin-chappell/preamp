function logBid(details) {
    console.log('******************* 1');
    console.log(details);

    const filter = browser.webRequest.filterResponseData(details.requestId);
    const decoder = new TextDecoder("utf-8");

    filter.ondata = event => {
        const str = decoder.decode(event.data, {stream: true});
        filter.disconnect();
        console.log('********************* 4');
        console.log(str);
        console.log('******************* 5');
        const sending = browser.tabs.sendMessage(details.tabId, str);
        // const sending =
        //     browser.tabs.sendMessage(details.tabId, "*** testing 123 ***");
        console.log(sending);
    };

    return {};
}

function logAdCall(details) {
    console.log('******************* 2');
    console.log(details.url);
    console.log(details.responseHeaders);
//  browser.tabs.sendMessage()
}

browser.webRequest.onBeforeRequest.addListener(
    logBid,
    {urls: ["https://prebid.adnxs.com/*"]},
    ["blocking"]
);

browser.webRequest.onCompleted.addListener(
    logAdCall,
    {urls: ["https://securepubads.g.doubleclick.net/*"]},
    ["responseHeaders"]
);
