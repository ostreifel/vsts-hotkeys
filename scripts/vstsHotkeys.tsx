import { hotkeyMappings } from "./commandMappings";

for (const selector in hotkeyMappings) {
    const hotkey = `Hotkey: ${hotkeyMappings[selector]}`;
    $("body").on("load ready mouseover", selector, (e) => {
        e.currentTarget.setAttribute("title", hotkey);
    });
}
