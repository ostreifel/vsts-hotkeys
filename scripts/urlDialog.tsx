import { DefaultButton, PrimaryButton } from "OfficeFabric/components/Button";
import { Dialog, DialogFooter, DialogType } from "OfficeFabric/components/Dialog";
import * as React from "react";
import * as ReactDom from "react-dom";
import { beginUpdateStyling } from "./iconStyling";
import { getFile, getFiles, saveFile } from "./imageStorage";

const dialogContainer = $("<div></div>");
$("body").append(dialogContainer[0]);

interface IDialogProperties {
    initialValue: string;
    cssClass: string;
}
class SelectIconDialog extends React.Component<IDialogProperties, { hasUrl: boolean }> {
    constructor(props: IDialogProperties) {
        super();
        this.state = { hasUrl: Boolean(props.initialValue) };
        getFiles((data) => {
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
                        defaultValue={this.props.initialValue}
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
        saveFile(this.props.cssClass, $(".icon-image-url").val(), beginUpdateStyling);
        closeDialog();
    }
}

export function closeDialog() {
    ReactDom.render(<div />, dialogContainer[0]);
}

export function showDialog(cssClass: string) {
    getFile(cssClass, (data) => {
        const url = data[cssClass];
        ReactDom.render(<SelectIconDialog cssClass={cssClass} initialValue={url} />, dialogContainer[0]);
    });
}
