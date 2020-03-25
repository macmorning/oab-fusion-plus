const context = {
    projectCodes: localStorage.projectCodes || {}, // collection of objects: projectCode: { show: bool, new: bool, desc: string, order: integer }
    observer: false
}

chrome.storage.local.get(["projectCodes"], (result) => {
    console.log("Loaded projectCodes from storage");
    context.projectCodes = JSON.parse(result.projectCodes);
    console.log(context.projectCodes);
});
/**
 * Saves the options into storage
 */
const saveCodes = () => {
    try {
        chrome.storage.local.set({
            "projectCodes": JSON.stringify(context.projectCodes)
        }, function () {
            console.log("Saved projects to storage");
        });
    } catch (e) {
        console.log(e);
    }
};

const resizeTable = () => {
    let timecardsHeadersTable = document.querySelectorAll("table.x1nz")[1];
    let timecardsTable = document.querySelector("table.x1nq.x1oe");

    let projectCodes = document.querySelectorAll('input[role="combobox"]');
    [].forEach.call(projectCodes, (el) => {
        if (context.projectCodes[el.value] === undefined) {
            context.projectCodes[el.value] = { show: true, new: true, desc: "", order: 999 };
        }
    });
    saveCodes();

    if (timecardsHeadersTable) {
        timecardsHeadersTable.style.width = "100%";
        timecardsHeadersTable.style.tableLayout = "auto";
        timecardsHeadersTable.querySelector("th").style.minWidth = "300px";
    }

    if (timecardsTable) {
        timecardsTable.style.width = "100%";
        timecardsTable.style.tableLayout = "auto";

        innerTables = timecardsTable.querySelectorAll("table:not([role='presentation'])");
        [].forEach.call(innerTables, (el) => {
            el.style.tableLayout = "auto";
            el.style.width = "100%";
            el.querySelector("td").style.minWidth = "300px"; // first td child is project code
        });
    }
};

const initListener = () => {
    if (window.location.search.indexOf("fndGlobalItemNodeId=timecards")) {
        let baseElement = document.querySelector("div"); // First div of document is what we're looking for
        if (baseElement) {
            // Create an observer instance linked to the callback function
            context.observer = new MutationObserver(resizeTable);
            // Start observing the target node for configured mutations
            const config = { attributes: false, childList: true, subtree: true };
            context.observer.observe(baseElement, config);
        }
    } else if (context.observer) {
        // Nothing to observe here, disconnect
        context.observer.disconnect();
    }
};
window.addEventListener("load", initListener);
window.addEventListener("hashchange", initListener);
