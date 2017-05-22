import { Dialog, DialogType, DefaultButton } from "office-ui-fabric-react";
import * as React from "react";
import * as ReactDom from "react-dom";

interface IProject {
    id: string;
    name: string;
}

function getProject(): IProject | null {
    // tslint:disable-next-line:no-string-literal
    const context = window["__vssPageContext"];
    return context && context.webContext.project;
}

interface IWorkItemTypeColorIcon {
    workItemTypeName: string;
    color: string;
    icon: string;
}
interface IContributionResponse {
    data: {
        "ms.vss-work-web.new-workitem-data-provider": {
            workItemTypes: string[];
            colorAndIcons: { [lowerCaseName: string]: IWorkItemTypeColorIcon };
        };
    };
    resolvedProviders: [
        {
            "id": "ms.vss-work-web.new-workitem-data-provider";
        }
    ];
}

function getWorkItemTypes(success: (workitemTypes: string[]) => void, failure: (message: string) => void) {
    const project = getProject();
    if (!project) {
        failure("No project in current context");
        return;
    }
    $.post({
        url: "/_apis/Contribution/dataProviders/query",
        data: JSON.stringify({
            contributionIds: [
                "ms.vss-work-web.new-workitem-data-provider",
            ],
            context: {
                properties: {
                    pageSource: {
                        project,
                    },
                },
            },
        }),
        headers: {
            "Accept": "application/json;api-version=3.2-preview.1;excludeUrls=true",
            "Content-Type": "application/json",
        },
        success: (data: IContributionResponse, status: string, xhr: JQueryXHR) => {
            success(data.data["ms.vss-work-web.new-workitem-data-provider"].workItemTypes);
        },
        error: (data: any, status: string, errorThrown: string) => {
            failure(`Unable to get work item types ${errorThrown}`);
        },

    });
}

const dialogContainer = $("<div id=createWorkItemDialogContainer/>");
$("body").append(dialogContainer);

function generateHotkeys(workItemTypes: string[]): { [hotkeyOrWit: string]: string } {
    const mappings: { [hotkeyOrWit: string]: string } = {};
    for (const wit of workItemTypes) {
        for (const char of wit) {
            const lowerChar = char.toLowerCase();
            if (!(lowerChar in mappings) && lowerChar != " ") {
                mappings[lowerChar] = wit;
                mappings[wit] = lowerChar;
                break;
            }
        }
    }
    return mappings;
}

function newWorkItem(wit: string) {
    // TODO find another way to get this past the compiler
    // tslint:disable-next-line:no-eval
    eval(`
    require(
        ["WorkItemTracking/SharedScripts/WorkItemDialogShim"],
        (WITDialogShim) => {
            WITDialogShim.createNewWorkItem("${wit}");
        },
    );
    `);
}

export class SelectWorkItem extends React.Component<{ workItemTypes: string[] }, { isOpen: boolean }> {
    constructor() {
        super();
        this.state = { isOpen: true };
    }
    public render() {
        const hotkeys = generateHotkeys(this.props.workItemTypes);
        const witDivs = this.props.workItemTypes.map(wit =>
            <DefaultButton
                autoFocus={wit === this.props.workItemTypes[0]}
                onKeyDown={e => {
                    if (e.key in hotkeys) {
                        e.preventDefault();
                        e.stopPropagation();
                        newWorkItem(hotkeys[e.key]);
                        this.close();
                    }
                    console.log("Keypress", e.key);
                }}
                onClick={e => {
                    newWorkItem(wit);
                    this.close();
                }}
                style={{
                    display: "block",
                    marginBottom: 3
                }}
            >
                {`(${hotkeys[wit]}) ${wit}`}
            </DefaultButton>
        );
        return <Dialog
            isOpen={this.state.isOpen}
            type={DialogType.normal}
            title={"Complete key chord"}
            onDismiss={() => this.close()}
            isBlocking={false}
        >
            {witDivs}
        </Dialog>;
    }
    private close() {
        this.setState({isOpen: false}, () =>{
           dialogContainer.html("");
        });
    }
}

export function openCreateWorkItemMenu() {
    getWorkItemTypes((workItemTypes) => {
        console.log("Success", workItemTypes);
        ReactDom.render(<SelectWorkItem workItemTypes={workItemTypes} />, dialogContainer[0]);
    }, (message) => {
        console.log("failure", message);
    });
}
