function injectScript(file, node) {
    const element = document.getElementsByTagName(node)[0];
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", file);
    element.appendChild(script);
}
injectScript( chrome.extension.getURL("/dist/vstsHotkeys.js"), "body");
