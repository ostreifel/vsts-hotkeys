import { openCreateWorkItemMenu } from "./createWorkItemMenu";

export interface IHotKey {
    readonly description: string;
    readonly hotkey: string;
    readonly selector?: string;
    readonly onCommand?: () => void;
}

/** Hotkeys that this extension adds to the product */
export const extensionHotkeys: IHotKey[] = [
    {
        description: "toggle fullscreen mode on the work item dialog",
        hotkey: "z",
        selector: ".ui-dialog .full-screen-button",
    },
    {
        description: "create new workitem",
        hotkey: "c w",
        selector: '[command="all-work-items-hub-group-action"]',
        onCommand: openCreateWorkItemMenu,
    },
];

/** Ui elements to label the hotkeys of */
export const hotkeyMappings: { [command: string]: string } = {
    // Global
    '[command="ms.vss-web.home-hub-group"]': "g h",
    '[command="ms.vss-work-web.work-hub-group"]': "g w",
    '[command="ms.vss-code-web.code-hub-group"]': "g c",
    '[command="ms.vss-build-web.build-hub-group"]': "g b",
    '[command="ms.vss-build-web.build-release-hub-group"]': "g b",
    '[command="ms.vss-test-web.test-hub-group"]': "g t",
    '[command="ms.vss-wiki-web.wiki-hub-group"]': "g k",
    "#multi-entity-search-box": "s",
    // Work
    '[command="ms.vss-work-web.agile-hub"]': "b for board, l for backlog",
    '[command="ms.vss-work-web.work-hub"]': "q",
    '[data-id="board"]': "b",
    '[data-id="backlog"]': "l",
    '[command="fullscreen-toggle"]': "z",
    '[command="toggle-full-screen"]': "z",
    // Work/query
    '[command="new-query"]': "c q",
    '[command="refresh-work-items"]': "r",
    '[command="navigate-back"]': "alt+q",
    // Work/Board
    ".board-add-card": "n",
    ".add-item-text": "c",
    '[command="add-child"]': "c",
    // Code
    '[command="ms.vss-code-web.files-hub-git"]': "e",
    '[command="ms.vss-code-web.history-hub"]': "h",
    '[command="ms.vss-code-web.branches-hub"]': "b",
    '[command="ms.vss-code-web.pull-request-hub"]': "q",
    ".new-pr-button-container": "c p",
    // Code/files
    ".path-editing-div": "t",
    ".vc-branches-container": "w",
    '.views [data-id="contents"]': "1",
    '.views [data-id="history"]': "2",
};

// Make sure to label extension hotkeys
for (const { hotkey, selector } of extensionHotkeys) {
    hotkeyMappings[selector] = hotkey;
}
