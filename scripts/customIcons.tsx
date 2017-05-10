import { Dialog, DialogFooter, DialogType } from "OfficeFabric/components/Dialog";
import * as React from "react";
import * as ReactDom from "react-dom";

const dialogContainer = $("<div></div>");
$("body").append(dialogContainer[0]);

class SelectIconDialog extends React.Component<{}, {}> {
    public render() {
        return <div>{this.props.children}</div>;
    }
}
ReactDom.render(<SelectIconDialog />, dialogContainer[0]);
function inputIcon(classes) {
    ReactDom.render(<SelectIconDialog>{`Icon Clicked ${classes}`}</SelectIconDialog>, dialogContainer[0]);
}

for (const iconElem of $.makeArray($(".work-item-type-icon:not(.custom-icon)"))) {
    const iconJquery = $(iconElem);
    iconJquery.addClass("custom-icon");
    iconJquery.click((e) => {
        alert("test");
        inputIcon(e.currentTarget.className);
    });
}
