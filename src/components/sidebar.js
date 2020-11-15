import {showProjectForm} from "./form/task-form";

const sidebar = document.querySelector(".sidebar");

const today = document.querySelector("#today");
const upcoming = document.querySelector("#upcoming");
const projectBtn = document.querySelector("#project-list");

const addProject = document.querySelector("#add-project");
addProject.addEventListener("click", showProjectForm);


export function appendProject(project) {
    let projectColor = ["rgb(0, 255, 0, 90%)", "rgb(255, 255, 0, 90%)", "rgb(255, 0, 0, 90%)"];

    const projectItem = document.createElement("div");
    projectItem.setAttribute("class", "project-items");

    const projectTitle = document.createElement("div");
    projectTitle.setAttribute("class", "project-title");
    projectTitle.textContent = project.title;

    projectItem.appendChild(projectTitle);

    if(project.priority != "") {
        const projectPriority = document.createElement("div");
        projectPriority.setAttribute("class", "project-priority");
        projectPriority.style.background = projectColor[parseInt(project.priority) - 1];
        projectItem.appendChild(projectPriority);
    }

    sidebar.insertBefore(projectItem, addProject);
}

export function appendProjectAll(PROJECTS) {
    let projectColor = ["rgb(0, 255, 0, 90%)", "rgb(255, 255, 0, 90%)", "rgb(255, 0, 0, 90%)"];
    
    for(let project of PROJECTS) {
        const projectItem = document.createElement("div");
        projectItem.setAttribute("class", "project-items");

        const projectTitle = document.createElement("div");
        projectTitle.setAttribute("class", "project-title");
        projectTitle.textContent = project.title;

        projectItem.appendChild(projectTitle);

        if(project.priority != "") {
            const projectPriority = document.createElement("div");
            projectPriority.setAttribute("class", "project-priority");
            projectPriority.style.background = projectColor[parseInt(project.priority) - 1];
            projectItem.appendChild(projectPriority);
        }

        sidebar.insertBefore(projectItem, addProject);
    }
}

export function removeProjectAll() {
    let projectItems = document.querySelectorAll(".project-items");
    for(let pr of projectItems) {
        pr.remove();
    }
}
