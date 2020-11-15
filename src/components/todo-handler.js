import {auth, database} from "./firebase-setup";
import loadingScreen from "./loading-screen";
import {hideTaskForm} from "./form/task-form";
import {appendProject, removeProjectAll} from "./sidebar";

const projectForm = document.querySelector("#project-form");
const taskForm = document.querySelector("#task-form");

const submitErrorMsg = document.createElement("p");
submitErrorMsg.setAttribute("class", "auth-error");

auth.onAuthStateChanged(user => {
    loadingScreen.show();

    const submitWrapper = event => {
        event.preventDefault();
        submitProject();
    }

    const errorWrapper = event => {
        event.preventDefault();
        throwError(projectForm, null);       
    }

    if(user) { 
        Promise.resolve((function() {
            projectForm.removeEventListener("submit", errorWrapper);
            projectForm.addEventListener("submit", submitWrapper);
        })())
        .then(() => {
            database.ref(`users/${user.uid}/projects`).once("value", data => {
                if(!data.exists()) {
                    loadingScreen.hide();
                    database.ref(`users/${user.uid}/projects`).on("child_added", data => {
                        Promise.resolve(appendProject(data.val()))
                            .then(() => loadingScreen.hide());
                    })
                } else {
                    // Needs to refresh after submitting project to be activate this callback
                    database.ref(`users/${user.uid}/projects`).on("child_added", data => {
                        Promise.resolve(appendProject(data.val()))
                            .then(() => loadingScreen.hide());
                    })
                }
            })
        })
    } else {
        Promise.resolve((function() {
            removeProjectAll()
            projectForm.removeEventListener("submit", submitWrapper);
            projectForm.addEventListener("submit", errorWrapper);
        })())
        .then(() => loadingScreen.hide());
    }
})

// Convert a user's projects object and converts it to array
// function createProjectList(projects) {
//     const projectIds = Object.keys(projects);
//     const projectList = [];

//     for(let i = 0; i < projectIds.length; i++) {
//         projectList.push({
//             title: projects[projectIds[i]].title,
//             description: projects[projectIds[i]].description,
//             duedate: projects[projectIds[i]].duedate,
//             priority: projects[projectIds[i]].priority,
//         })
//     }

//     return projectList;
// }

function submitProject() {
    // Show loading screen on form
    loadingScreen.showOn(projectForm);

    // // Disables submit button while processing current submission
    const submitBtn = document.querySelector("#create-project");
    submitBtn.disabled = true;

    if(!auth.currentUser.uid) {
        throwError(projectForm, error);
        loadingScreen.hide();
        
        return null;
    }

    const newProjectRef = database.ref(`users/${auth.currentUser.uid}/projects/`).push();

    // Reset and remove any errors, if any
    resetSubmitError();

    let title = projectForm["project_title"].value;
    let description = projectForm["project_description"].value;
    let duedate = projectForm["project_duedate"].value;
    let priority = projectForm["project_priority"].value;

    // Push new project to user's project list
    newProjectRef.set({title, description, duedate, priority})
        .then(() => {
            submitBtn.disabled = false;
            // Wait for authentication process then hide the loading screen
            loadingScreen.hide();

            // Enables sumbit button
            // submitBtn.setAttribute("disabled", false);

            // Close modal form
            hideTaskForm();

            // Clear input fields
            projectForm.reset();
    }).catch(error => {
        submitBtn.disabled = false;
        throwError(projectForm, error);
        loadingScreen.hide();
        // submitBtn.setAttribute("disabled", false);
    })
    submitBtn.setAttribute("disabled", false);
}

function throwError(form, error) {
    form.appendChild(submitErrorMsg);

    if(error) 
        submitErrorMsg.textContent = error.message;
    else 
        submitErrorMsg.textContent = "You are not logged in";
}

export function resetSubmitError() {
    submitErrorMsg.textContent = "";
    submitErrorMsg.remove();
}