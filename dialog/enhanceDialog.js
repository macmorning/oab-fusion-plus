const context = {
    projectCodes: localStorage.projectCodes || {}, // collection of objects: projectCode: { show: bool, new: bool, desc: string, order: integer }
    projectCodesArray: [],
    selected: null
}
let projectsEl;

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
  if (Object.keys(context.projectCodes).length === 0) {
    return false;
  }
  projectsEl = document.getElementById("project-list");
  removeChildren(projectsEl);
  context.projectCodesArray.forEach((project) => {
    if (project.projectId !== "") {
      let key = project.projectId;
      let templateInstance = document.getElementById("project-row-template");
      projectsEl.innerHTML += templateInstance.innerHTML.toString().replace(/\{\{title\}\}/g,key).replace("{{description}}",context.projectCodes[key].description || "");
    }
  });

  let elements = {};
  elements = document.querySelectorAll("[name=\"project-row\"]");
  [].forEach.call(elements, (el) => {
      el.addEventListener("dragend", dragEnd);
      el.addEventListener("dragover", dragOver);
      el.addEventListener("dragstart", dragStart);
  });

  elements = document.querySelectorAll("[title=\"change description\"]");
  [].forEach.call(elements, (el) => {
    el.addEventListener("click", changeDescription);
  });

  elements = document.querySelectorAll("[title=\"remove\"]");
  [].forEach.call(elements, (el) => {
    el.addEventListener("click", removeProjectCode);
  });

  elements = document.querySelectorAll("[title=\"copy code\"]");
  [].forEach.call(elements, (el) => {
    el.addEventListener("click", (e) => {
      let projectCode = e.target.parentNode.getAttribute("project-id");
      navigator.clipboard.writeText(projectCode).then(() => {
        console.log("copied! > " + projectCode);
      }, () => {
        console.warn("error!");
      });    
    });
  });
  // Instance name edition
  elements = document.querySelectorAll("[name='project-description']");
  [].forEach.call(elements, (el) => {
      el.addEventListener("keydown", (e) => {
          if (e.keyCode === 13) {
              e.preventDefault();
              e.target.blur();
          }
      });
      el.addEventListener("blur", (e) => {
          e.preventDefault();
          e.target.setAttribute("contenteditable", "false");
          let newText = e.target.innerText.trim();
          let projectId = e.target.parentNode.getAttribute("project-id");
          context.projectCodes[projectId].description = newText;
          saveProjects();
      });
  });
}

const changeDescription = (evt) => {
  let projectDescription = evt.target.parentNode.querySelector("[name='project-description']");
  if (!projectDescription) { return false; }
  projectDescription.setAttribute("contenteditable", "true");
  projectDescription.focus();
};

const removeProjectCode = (evt) => {
  let projectEl = evt.target.parentNode;
  if (!projectEl) { return false; }
  let projectId = projectEl.getAttribute("project-id");
  if (!projectId) { return false; }
  delete context.projectCodes[projectId];
  projectEl.parentNode.removeChild(projectEl);
  saveProjects();
};

function dragOver( e ) {
  e.preventDefault();
  if (e.target.nodeName !== "LI") { return false; }
  e.dataTransfer.effectAllowed = "move";
  if ( isBefore( context.selected, e.target ) ) e.target.parentNode.insertBefore( context.selected, e.target );
  else e.target.parentNode.insertBefore( context.selected, e.target.nextSibling );
}

function dragEnd() {
    context.selected = null;
    let projectsEls = projectsEl.querySelectorAll("li");
    console.log(projectsEls);
    let order = 0;
    [].forEach.call(projectsEls, (project) => {
      order += 10;
      let id = project.getAttribute("project-id");
      console.log(id +  ">" + order);
      context.projectCodes[id].order = order;
    });
    console.log(context.projectCodes);
    saveProjects();
}

function dragStart( e ) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData( "text/plain", null );
  context.selected = e.target;
}

function isBefore( el1, el2 ) {
  var cur
  if ( el2.parentNode === el1.parentNode ) {
    for ( cur = el1.previousSibling; cur; cur = cur.previousSibling ) {
      if (cur === el2) return true;
    }
  } else return false;
}

/**
 * Saves the options into storage
 */
const saveProjects = () => {
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


chrome.storage.local.get(["projectCodes"], (result) => {
    console.log("Loaded projectCodes from storage");
    try {
        context.projectCodes = JSON.parse(result.projectCodes);
    } catch(e) {
        console.error(e);
        context.projectCodes = {};
    }
    context.projectCodesArray = [];
    Object.keys(context.projectCodes).forEach((projectId) => {
      context.projectCodesArray.push({'projectId': projectId, 'order': context.projectCodes[projectId].order});
    });
    context.projectCodesArray.sort((a, b) => parseInt(a.order) - parseInt(b.order));
    refreshList();
});