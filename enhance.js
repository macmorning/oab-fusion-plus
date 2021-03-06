const context = {
    projectCodes: localStorage.projectCodes || {}, // collection of objects: projectCode: { show: bool, new: bool, desc: string, order: integer }
    observer: false
}

chrome.storage.local.get(["projectCodes"], (result) => {
    context.projectCodes = JSON.parse(result.projectCodes);
    chrome.storage.onChanged.addListener(storageEvent);
});

/**
 * Handles a change event coming from storage
 * @param {Object} objChanged an object that contains the items that changed with newValue and oldValue
 * @param {String} area Storage area
 */
function storageEvent (objChanged, area) {
    // FF doesn't check if there is an actual change between new and old values
    if (objChanged.projectCodes && objChanged.projectCodes.newValue !== objChanged.projectCodes.oldValue) {
        context.projectCodes = JSON.parse(objChanged.projectCodes.newValue);
    }
}

/**
 * Saves the options into storage
 */
const saveCodes = () => {
    try {
        chrome.storage.local.set({
            "projectCodes": JSON.stringify(context.projectCodes)
        }, function () {});
    } catch (e) {
        console.warn(e);
    }
};

const resizeTable = () => {
    let timecardsHeadersTable = document.querySelectorAll("table.x1nz")[1];
    let timecardsTable = document.querySelector("table.x1nq.x1oe");

    let projectCodes = document.querySelectorAll('input[role="combobox"]');
    [].forEach.call(projectCodes, (el) => {
        if (!el.value || el.value === "") { return true; }
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
    console.log("initListener " + window.location.search.indexOf("fndGlobalItemNodeId=timecards"));
    if (window.location.search.indexOf("fndGlobalItemNodeId=timecards") > -1) {
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
window.setTimeout(initListener, 1000); // check if we are on a timesheet page and add listeners
window.addEventListener("load", initListener);