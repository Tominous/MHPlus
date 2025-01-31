function loadStyle(url) {
    const style = document.createElement("link");
    style.href = chrome.runtime.getURL(`css/${url}`);
    style.type = "text/css";
    style.rel = "stylesheet";
    document.head.appendChild(style);
}

function loadCustomStyle({ customStyle }) {
    const { backgroundColor, foregroundColor, primaryColor, selectColor, textColor, dangerColor } = customStyle;
    const root = document.querySelector(":root");
    root.style.setProperty("--mh-background-base", backgroundColor);
    root.style.setProperty("--mh-blob-base", foregroundColor);
    root.style.setProperty("--mh-primary-base", primaryColor);
    root.style.setProperty("--mh-select-base", selectColor);
    root.style.setProperty("--mh-text-base", textColor);
    root.style.setProperty("--mh-danger-base", dangerColor);
}

loadStyle("common.css");

function storageCallback(items) {
    if (items.style !== "default" && items.style !== "undefined" && items.style !== "custom")
        loadStyle(`${items.style}.css`);
    else if (items.style === "custom")
        loadCustomStyle(items);
}

chrome.storage.sync.get([
    "style",
    "customStyle",
], storageCallback);

// Remove video player
(document.querySelector(".slg-video-player-container") ?? [])[0]?.remove();