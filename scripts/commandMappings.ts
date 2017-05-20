export const hotkeyMappings: {[command: string]: string} = {
    // Global
    '[command="ms.vss-web.home-hub-group"]': "g h",
    '[command="ms.vss-work-web.work-hub-group"]': "g w",
    '[command="ms.vss-code-web.code-hub-group"]': "g c",
    '[command="ms.vss-build-web.build-hub-group"]': "g b",
    '[command="ms.vss-build-web.build-release-hub-group"]': "g b",
    '[command="ms.vss-test-web.test-hub-group"]': "g t",
    '[command="ms.vss-wiki-web.wiki-hub-group"]': "g k",
    "#multi-entity-search-box": "s",
    // Work Specific
    '[command="ms.vss-work-web.agile-hub"]': "b for board, l for backlog",
    '[command="ms.vss-work-web.work-hub"]': "q",
    '[data-id="board"]': "b",
    '[data-id="backlog"]': "l",
    '[command="fullscreen-toggle"]': "z",
    '[command="toggle-full-screen"]': "z",
    // Work/query specific
    '[command="new-query"]': "n q",
    '[command="refresh-work-items"]': "n q",
    '[command="navigate-back"]': "n q",
    // Work/Board specific
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
