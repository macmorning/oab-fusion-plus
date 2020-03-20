window.setInterval(() => {
    let timecardsHeadersTable = document.querySelectorAll("table[summary='This table contains column headers corresponding to the data body table below']")[1]
    timecardsHeadersTable.style.width = "100%";
    timecardsHeadersTable.style.minWidth = "1500px";
    timecardsHeadersTable.style.tableLayout = "auto";
    timecardsHeadersTable.querySelector("th").style.width = "25%";


    let timecardsTable = document.querySelector("table[summary='Time Card Entries']");
    timecardsTable.style.width = "100%";
    timecardsTable.style.minWidth = "1500px";

    innerTables = timecardsTable.querySelectorAll("table:not([role='presentation'])");
    [].forEach.call(innerTables, (el) => {
        el.style.tableLayout = "auto";
        el.style.width = "100%";
        el.style.minWidth = "400px";
        el.querySelector("td").style.width = "25%"; // first td child is project code
    });
}, 1000);