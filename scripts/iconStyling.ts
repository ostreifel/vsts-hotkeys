import { getFiles } from "./imageStorage";


const styling = $("<style/>");
$("body").append(styling);
export function beginUpdateStyling() {
    getFiles(updateStyling);
}
function updateStyling(data: {[cssClass: string]: string}) {
    let styleContent = "";
    for (let cssClass in data) {
        const url = data[cssClass];
        styleContent += `
            .${cssClass}::before {
                content: "";
            }
            .${cssClass} {
                background-image: url(${url});
                background-size: 16px;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
            }
        `;
    }
    styling.html(styleContent);
}

