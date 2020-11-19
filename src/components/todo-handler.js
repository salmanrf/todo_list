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

    if(user) { 
        projectForm.removeEventListener("submit", throwError);
        projectForm.addEventListener("submit", submitProject);

        // Get this user's projects ref
        const projectsRef = database.ref(`users/${user.uid}/projects`);
        console.log(user.uid);
        // Use once() to get value from this ref only once
        projectsRef.once("value", data => {
            // data.exist() checks if any data exist in this reference
            if(!data.exists()) {
                // If not, immediately closes the loading screen and...
                loadingScreen.hide();
                // Register a listener on this ref
                projectsRef.on("child_added", data => {
                    new Promise(resolve => {
                        loadingScreen.show();
                        appendProject(data.val());
                        console.log("ashiaap");
                        resolve();
                    }).then(loadingScreen.hide);
                    // Promise.resolve(appendProject(data.val()))
                    //     .then(loadingScreen.hide);
                })
            } else {
                // If data exist, invoke appendProject() to create and... 
                // append dom node for each data (the user's projects)
                projectsRef.on("child_added", data => {
                    new Promise(resolve => {
                        loadingScreen.show();
                        appendProject(data.val());
                        console.log("anjalathi");
                        resolve();
                    }).then(loadingScreen.hide);
                    // Promise.resolve(appendProject(data.val()))
                    //     .then(loadingScreen.hide);
                })
            }
        })
    } else {
        removeProjectAll()
        projectForm.removeEventListener("submit", submitProject);
        projectForm.addEventListener("submit", throwError);
        loadingScreen.hide();
    }
})

function submitProject(event) {
    event.preventDefault();

    // Show loading screen on form
    loadingScreen.showOn(projectForm);

    // // Disables submit button while processing current submission
    const submitBtn = document.querySelector("#create-project");
    submitBtn.disabled = true;

    const projectsRef = database.ref(`users/${auth.currentUser.uid}/projects/`);

    // Reset and remove any errors, if any
    resetSubmitError();

    let title = projectForm["project_title"].value;
    let description = projectForm["project_description"].value;
    let duedate = projectForm["project_duedate"].value;
    let priority = projectForm["project_priority"].value;

    // Push new project to user's project list
    projectsRef.push({title, description, duedate, priority})
        .then(() => {
            // Enables sumbit button
            submitBtn.disabled = false;
            
            // Clear input fields
            projectForm.reset();
            
            // Wait for authentication process then hide the loading screen
            loadingScreen.hide();

            // Close modal form
            hideTaskForm();
    }).catch(error => {
        submitBtn.disabled = false;
        throwError(event, error);
        loadingScreen.hide();
    })

}

function throwError(event, error) {
    event.preventDefault();
    event.target.appendChild(submitErrorMsg);

    if(error) 
        submitErrorMsg.textContent = error.message;
    else 
        submitErrorMsg.textContent = "You are not logged in";
}

export function resetSubmitError() {
    submitErrorMsg.textContent = "";
    submitErrorMsg.remove();
}