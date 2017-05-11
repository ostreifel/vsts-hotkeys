import { beginUpdateStyling } from "./iconStyling";
import { showDialog } from "./urlDialog";

function iconClicked(e: JQueryEventObject) {
    const [symbolClass] = e.currentTarget.className.split(" ")
        .filter((s) => s.indexOf("bowtie-symbol") === 0);
    showDialog(symbolClass);
}
beginUpdateStyling();
$("body").delegate(".work-item-type-icon-control", "click", iconClicked);
