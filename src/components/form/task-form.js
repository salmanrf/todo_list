import {format} from "date-fns";
// import {resetSubmitError} from "./../todo-handler";

// Grab container for contents
const container = document.querySelector("#app");

// Create overlay for modal menu
const overlay = document.createElement("div");
overlay.setAttribute("class", "overlay");

// Create container for project form
const projectModal = document.createElement("div");
projectModal.setAttribute("class", "modal-menu");

// Create container for task form
const taskModal = document.createElement("div");
taskModal.setAttribute("class", "modal-menu");

// Header for project modal
const projectHeader = document.createElement("div");
projectHeader.setAttribute("class", "menu-header");
projectHeader.innerHTML = "<div class='menu-title'>New Project</div>";

// Header for project modal
const taskHeader = document.createElement("div");
taskHeader.setAttribute("class", "menu-header");
taskHeader.innerHTML = "<div class='menu-title'>New Task</div>";

const projectForm = document.createElement("form");
projectForm.setAttribute("class", "modal-form");
projectForm.setAttribute("id", "project-form");

// Project form html
projectForm.innerHTML = "<label for='project-title'>TITLE : </label>" + 
                      "<input type='text' id='project-title' name='project_title' required='required'>" + 
                      "<label for='project-description'>DESCRIPTION : </label>" + 
                      "<textarea id='project-description' name='project_description'></textarea>" + 
                      "<label for='project-duedate'>DUE DATE : </label>" + 
                      "<input type='date' id='project-duedate' name='project_duedate' min="+`${format(new Date(), "yyyy-MM-dd")}`+">" +                    
                      "<p class='radio-group-prompt'>PRIORITY :</p>" + 
                      "<div class='radio-group'>" + 
                        "<input type='radio' id='priority-low' value='1' name='project_priority'>" + 
                        "<label for='priority-low'>Low</label>" +
                        "<input type='radio' id='priority-medium' value='2' name='project_priority'>" + 
                        "<label for='priority-medium'>Medium</label>" +
                        "<input type='radio' id='priority-high' value='3' name='project_priority'>" + 
                        "<label for='priority-high'>High</label>" +                                 
                      "</div>" +
                      "<div class='form-buttons'>" + 
                        "<button class='submit' id='create-project' type='submit'>CREATE</button>" +
                        "<button class='cancel' id='cancel-project' type='reset'>CANCEL</button>" +     
                      "</div>";

const taskForm = projectForm.cloneNode(true);
taskForm.setAttribute("class", "modal-form");
taskForm.setAttribute("id", "task-form");                

projectModal.appendChild(projectHeader);
projectModal.appendChild(projectForm);

taskModal.appendChild(taskHeader);
taskModal.appendChild(taskForm);

container.appendChild(overlay);
container.appendChild(projectModal);
container.appendChild(taskModal);

for(let e of document.querySelectorAll(".cancel")) {
  e.addEventListener("click", hideTaskForm);
}

export function hideTaskForm() {
  // resetSubmitError();
  overlay.style.display = "none";
  projectModal.style.display = "none";
  taskModal.style.display = "none";
}

export function showProjectForm() {
  overlay.style.display = "block";
  projectModal.style.display = "flex";
}

export function showTaskForm() {
  overlay.style.display = "block";
  taskModal.style.display = "flex";
}

export {format};