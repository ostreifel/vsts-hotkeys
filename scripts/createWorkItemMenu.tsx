
const jsonIsland = $("script.vss-web-page-data");
const workItemNames: string[] = [];

interface IProject {
    id: string;
    name: string;
}

function getProject(): IProject | null {
    const contextIsland = $('script:contains("var __vssPageContext")');
    if (contextIsland.length === 0) {
        return null;
    }
    const blobMatch = contextIsland.html().match(/(\{.*\});/);
    if (!blobMatch) {
        return null;
    }
    return JSON.parse(blobMatch[1]).webContext.project;
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

function initializeWorkItemTypes(success: (workitemTypes: string[]) => void, failure: (message: string) => void) {
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
            console.log("contribution response", data);
            success(data.data["ms.vss-work-web.new-workitem-data-provider"].workItemTypes);
        },
        error: (data: any, status: string, errorThrown: string) => {
            failure(`Unable to get work item types ${errorThrown}`);
        },

    });
}

export function openCreateWorkItemMenu() {
    initializeWorkItemTypes((workItemTypes) => {
        console.log("Success", workItemTypes);
    }, (message) => {
        console.log("failure", message);
    });
    // $('[command="ms.vss-work-web.work-hub-group"]').mouseover();
    // $('[command="all-work-items-hub-group-action"]').mouseover();
    // console.log("moused", $('[command="ms.vss-work-web.work-hub-group"]'),
    //     $('[command="all-work-items-hub-group-action"]'));
}
