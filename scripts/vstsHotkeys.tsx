import { hotkeyMappings } from "./commandMappings";

for (const command in hotkeyMappings) {
    const selector = `[command="${command}"]`;
    const hotkey = `Hotkey: ${hotkeyMappings[command]}`;
    $("body").on("load ready mouseover", selector, (e) => {
        e.currentTarget.setAttribute("title", hotkey);
    });
}
