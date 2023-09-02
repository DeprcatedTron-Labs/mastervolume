console.log("Content script running");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "set_global_volume") {
        let volumeLevel = request.volumeLevel;
        changeVolume(volumeLevel);
    } else if (request.message === "mute_tab") {
        muteTab();
    }
});

const changeVolume = (volumeLevel) => {
    console.log(`Attempting to set volume to ${volumeLevel}`);

    let mediaElements = document.querySelectorAll("audio, video");
    console.log(`Found ${mediaElements.length} media elements.`);

    mediaElements.forEach((element, index) => {
        console.log(`Setting volume for media element ${index + 1}`);
        element.volume = volumeLevel;
    });

    // Special case for YouTube
    let ytVideo = document.querySelector('video.html5-main-video');
    if (ytVideo) {
        console.log("YouTube video found. Overriding volume.");
        ytVideo.volume = volumeLevel;
    } else {
        console.log("No YouTube video found.");
    }
};

const muteTab = () => {
    console.log("Muting tab...");

    // Toggle mute state for regular media elements
    let mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach(element => {
        element.muted = !element.muted;
        console.log(`Setting mute status for media element: ${element.muted}`);
    });

    // Special case for YouTube
    let ytVideo = document.querySelector('video.html5-main-video');
    if (ytVideo) {
        // Set YouTube video volume to 0 to simulate muting
        ytVideo.volume = 0;
        console.log("YouTube video found. Muted using alternative method.");
    }

    isMuted = !isMuted;
    console.log(`Tab is ${isMuted ? 'muted' : 'unmuted'}`);
};


