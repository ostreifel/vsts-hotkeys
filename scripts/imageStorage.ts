export function saveFile(cssClass: string, fileUrl: string) {
    if (fileUrl) {
        const blob = {};
        blob[cssClass] = fileUrl;
        chrome.storage.sync.set(blob, () => {
            console.log("image saved for ", cssClass, chrome.runtime.lastError);
        });
    } else {
        chrome.storage.sync.remove(cssClass, () => {
            console.log("image removed", chrome.runtime.lastError)
        });
    }
}

export function getFiles(callback: (data: { [cssClass: string]: string }) => void): void {
    chrome.storage.sync.get(callback);
}
