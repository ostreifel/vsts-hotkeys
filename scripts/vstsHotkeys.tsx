import * as mouse from "mousetrap";
import { extensionHotkeys, hotkeyMappings } from "./commandMappings";

for (const selector in hotkeyMappings) {
    const hotkey = `Hotkey: ${hotkeyMappings[selector]}`;
    $("body").on("load ready mouseover", selector, (e) => {
        e.currentTarget.setAttribute("title", hotkey);
    });
}

function isInputElement({ nodeName, classList }: Element) {
    return nodeName === "INPUT" || nodeName === "TEXTAREA" || classList.contains("richeditor-container");
}

for (const { selector, hotkey, onCommand } of extensionHotkeys) {
    mouse.bind(hotkey, (e, combo) => {
        if (!isInputElement(e.srcElement)) {
            if (onCommand) {
                onCommand();
            } else if ($(selector).length > 0) {
                $(selector).click();
                e.stopPropagation();
                e.preventDefault();
            }
        }
    });
}
