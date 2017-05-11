export function saveFile(cssClass: string, fileUrl: string, callback: () => void) {
    if (fileUrl) {
        const blob = {};
        blob[cssClass] = fileUrl;
        chrome.storage.sync.set(blob, () => {
            console.log("image saved for ", cssClass, chrome.runtime.lastError);
            if (callback) {
                callback();
            }
        });
    } else {
        chrome.storage.sync.remove(cssClass, () => {
            console.log("image removed", chrome.runtime.lastError)
            if (callback) {
                callback();
            }
        });
    }
}

export function getFiles(callback: (data: { [cssClass: string]: string }) => void): void {
    chrome.storage.sync.get(callback);
}

export function getFile(cssClass: string, callback: (data: { [cssClass: string]: string }) => void) {
    chrome.storage.sync.get(cssClass, callback);
}
