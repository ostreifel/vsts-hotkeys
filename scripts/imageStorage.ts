export function saveFile(cssClass: string, file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => saveFileContents(fileReader, e, cssClass);
    fileReader.readAsDataURL(file);
}

function saveFileContents(fileReader: FileReader, e: Event, cssClass: string) {
    chrome.storage.sync.set({cssClass: fileReader.result}, () => {
        console.log("image saved for ", cssClass);
    });
}

export function getFiles(callback: () => {[cssClass: string]: string}): void {
    chrome.storage.sync.get(callback);
}
