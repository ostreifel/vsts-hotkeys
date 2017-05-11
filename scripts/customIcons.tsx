import { DefaultButton, PrimaryButton } from "OfficeFabric/components/Button";
import { Dialog, DialogFooter, DialogType } from "OfficeFabric/components/Dialog";
import * as React from "react";
import * as ReactDom from "react-dom";
import {saveFile} from "./imageStorage";

const dialogContainer = $("<div></div>");
$("body").append(dialogContainer[0]);

class SelectIconDialog extends React.Component<{cssClass: string}, { validFile: boolean }> {
    constructor() {
        super();
        this.state = { validFile: false };
    }

    public render() {
        return (
            <div>
                <Dialog
                    isOpen={true}
                    type={DialogType.normal}
                    onDismiss={closeDialog}
                    title={"Select a new icon"}
                    isBlocking={false}
                    containerClassName="ms-dialogMainOverride"
                >
                    {`Update ${this.props.cssClass}`}
                    <input
                        type="file"
                        name="fileupload"
                        id="icon-image-file"
                        onChange={this.filesChanged.bind(this)}
                        accept="image/*"
                    />
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this._save.bind(this)}
                            text="Save"
                            disabled={!this.state.validFile}
                        />
                        <DefaultButton onClick={closeDialog} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }

    private filesChanged(e: JQueryEventObject) {
        const input = $("#icon-image-file")[0] as HTMLInputElement;
        const files = input.files;
        const validFile = files && files.length === 1;
        if (validFile !== this.state.validFile) {
            this.setState({validFile});
        }
    }

    private _save() {
        const input = $("#icon-image-file")[0] as HTMLInputElement;
        const imageFile = input.files[0];
        saveFile(this.props.cssClass, imageFile);
        closeDialog();
    }
}

function closeDialog() {
    ReactDom.render(<div />, dialogContainer[0]);
}

function showDialog(cssClass: string) {
    ReactDom.render(<SelectIconDialog cssClass={cssClass}/>, dialogContainer[0]);
}

function iconClicked(e: JQueryEventObject) {
    const [symbolClass] = e.currentTarget.className.split(" ")
        .filter((s) => s.indexOf("bowtie-symbol") === 0);
    showDialog(symbolClass);
}

$("body").delegate(".work-item-type-icon-control", "click", iconClicked);
