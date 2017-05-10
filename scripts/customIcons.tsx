import { Dialog, DialogFooter, DialogType } from "OfficeFabric/components/Dialog";
import { PrimaryButton, DefaultButton } from "OfficeFabric/components/Button";
import * as React from "react";
import * as ReactDom from "react-dom";

const dialogContainer = $("<div></div>");
$("body").append(dialogContainer[0]);

class SelectIconDialog extends React.Component<{}, { showDialog: boolean }> {
    constructor() {
        super();
        this.state = {
            showDialog: true
        };
    }

    public render() {
        return (
            <div>
                <Dialog
                    isOpen={this.state.showDialog}
                    type={DialogType.normal}
                    onDismiss={this._closeDialog.bind(this)}
                    title='All emails together'
                    subText='Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
                    isBlocking={false}
                    containerClassName='ms-dialogMainOverride'
                >
                    {this.props.children}
                    <DialogFooter>
                        <PrimaryButton onClick={this._closeDialog.bind(this)} text="Save" />
                        <DefaultButton onClick={this._closeDialog.bind(this)} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }

    private _showDialog() {
        this.setState({ showDialog: true });
    }

    private _closeDialog() {
        this.setState({ showDialog: false });
    }
}
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
