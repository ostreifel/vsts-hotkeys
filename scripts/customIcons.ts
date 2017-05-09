for (const iconElem of $.makeArray($(".work-item-type-icon:not(.custom-icon)"))) {
    const iconJquery = $(iconElem);
    iconJquery.addClass("custom-icon");
    iconJquery.click(() => alert("test"));
}
