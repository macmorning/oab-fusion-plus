const context = {
    projectCodes: localStorage.projectCodes || {}, // collection of objects: projectCode: { show: bool, new: bool, desc: string, order: integer }
    selected: null
}

/**
 * Removes all children of given element
 * @param {Object} elt parent node
 */
const removeChildren = (elt) => {
    while (elt.lastChild) {
        elt.removeChild(elt.lastChild);
    }
};

/**
 * Generates the list of projects
 */
const refreshList = () => {
    let projectsEl = document.getElementById("project-list");
    removeChildren(projectsEl);
    for (let key in context.projectCodes) {
        let templateInstance = document.getElementById("project-row-template");
        projectsEl.innerHTML += templateInstance.innerHTML.toString().replace("{{title}}",key);
    }

    let elements = {};
    elements = document.querySelectorAll("[name=\"project-row\"]");
    [].forEach.call(elements, (el) => {
        el.addEventListener("dragend", dragEnd);
        el.addEventListener("dragover", dragOver);
        el.addEventListener("dragstart", dragStart);
    });    
}

function dragOver( e ) {
  if ( isBefore( context.selected, e.target ) ) e.target.parentNode.insertBefore( context.selected, e.target )
  else e.target.parentNode.insertBefore( context.selected, e.target.nextSibling )
}

function dragEnd() {
    context.selected = null
}

function dragStart( e ) {
  e.dataTransfer.effectAllowed = "move"
  e.dataTransfer.setData( "text/plain", null )
  context.selected = e.target
}

function isBefore( el1, el2 ) {
  var cur
  if ( el2.parentNode === el1.parentNode ) {
    for ( cur = el1.previousSibling; cur; cur = cur.previousSibling ) {
      if (cur === el2) return true
    }
  } else return false;
}

chrome.storage.local.get(["projectCodes"], (result) => {
    console.log("Loaded projectCodes from storage");
    console.log(result);
    try {
        context.projectCodes = JSON.parse(result.projectCodes);
    } catch(e) {
        console.error(e);
        context.projectCodes = {};
    }
    console.log(context.projectCodes);
    refreshList();
});