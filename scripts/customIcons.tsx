import { Dialog, DialogFooter, DialogType } from "OfficeFabric/components/Dialog";
import * as React from "react";
import * as ReactDom from "react-dom";

const dialogContainer = $("<div></div>");
$(document).append(dialogContainer);

class SelectIconDialog extends React.Component<{}, {}> {
    public render() {
        return <div>{this.props.children}</div>;
    }
}
ReactDom.render(<SelectIconDialog />, dialogContainer[0]);
function inputIcon() {
    ReactDom.render(<SelectIconDialog>Icon Clicked</SelectIconDialog>, dialogContainer[0]);
}

for (const iconElem of $.makeArray($(".work-item-type-icon:not(.custom-icon)"))) {
    const iconJquery = $(iconElem);
    iconJquery.addClass("custom-icon");
    iconJquery.click(() => alert("test"));
}
