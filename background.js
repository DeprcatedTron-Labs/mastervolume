chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "request_media_info") {
        let mediaInfo = [];
        let mediaElements = document.querySelectorAll("audio, video");
        mediaElements.forEach(element => {
            mediaInfo.push({ id: element.id, title: element.title });
        });
        sendResponse({ mediaInfo });
    }
});
