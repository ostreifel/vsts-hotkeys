import { DefaultButton, PrimaryButton } from "OfficeFabric/components/Button";
import { Dialog, DialogFooter, DialogType } from "OfficeFabric/components/Dialog";
import * as React from "react";
import * as ReactDom from "react-dom";
import { saveFile, getFiles } from "./imageStorage";

const dialogContainer = $("<div></div>");
$("body").append(dialogContainer[0]);

class SelectIconDialog extends React.Component<{ cssClass: string }, { hasUrl: boolean }> {
    constructor() {
        super();
        this.state = { hasUrl: false };
        getFiles(data => {
            console.log("data retrieved", data, chrome.runtime.lastError);
        });
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
                        className="icon-image-url"
                        placeholder="Paste image url..."
                        onChange={this.filesChanged.bind(this)}
                        style={{ width: "100%" }}
                    />
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this._save.bind(this)}
                            text={this.state.hasUrl ? "Set" : "Clear"}
                        />
                        <DefaultButton onClick={closeDialog} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }

    private filesChanged(e: JQueryEventObject) {
        const hasUrl = $(".icon-image-url").val().length > 0;
        if (hasUrl !== this.state.hasUrl) {
            this.setState({ hasUrl });
        }
    }

    private _save() {
        saveFile(this.props.cssClass, $(".icon-image-url").val());
        closeDialog();
    }
}

function closeDialog() {
    ReactDom.render(<div />, dialogContainer[0]);
}

function showDialog(cssClass: string) {
    ReactDom.render(<SelectIconDialog cssClass={cssClass} />, dialogContainer[0]);
}

function iconClicked(e: JQueryEventObject) {
    const [symbolClass] = e.currentTarget.className.split(" ")
        .filter((s) => s.indexOf("bowtie-symbol") === 0);
    showDialog(symbolClass);
}

$("body").delegate(".work-item-type-icon-control", "click", iconClicked);
