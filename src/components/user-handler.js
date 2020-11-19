import {auth, database} from "./firebase-setup";
import {hideUserForm} from "./form/user-form";
import loadingScreen from "./loading-screen";

// Grab the logout button and add an event listener
const logout = document.querySelector("#logout-btn");
logout.addEventListener("click", () => {
    loadingScreen.show();
    auth.signOut().then(loadingScreen.hide);
});

// Listens for authentication state changes
auth.onAuthStateChanged(user => {
    if(user) {
        document.querySelector("#login-btn").style.display = "none";
        document.querySelector("#signup-btn").style.display = "none";
        document.querySelector("#logout-btn").style.display = "inline";
    } else {
        document.querySelector("#login-btn").style.display = "inline";
        document.querySelector("#signup-btn").style.display = "inline";
        document.querySelector("#logout-btn").style.display = "none";
    }
});

// Container for displaying authentication errors
const authError = document.createElement("p");
authError.setAttribute("class", "auth-error");

// Grab the login form and handles login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", event => {
    // Prevent page refresh from submit event
    event.preventDefault();

    // Reset last auth error, if any
    resetAuthError();

    // Show loading screen
    loadingScreen.showOn(loginForm);

    let email = loginForm["login-email"].value;
    let password = loginForm["login-password"].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Close modal form
            hideUserForm();

            // Wait for authentication process then hide the loading screen
            loadingScreen.hide();

            // Clear input fields
            event.target.reset();
        }).catch(error => {
            throwError(loginForm, error);
            loadingScreen.hide();
        })

})

// Grab the signup form and handles signup
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", event => {
    // Prevent page refresh from submit event
    event.preventDefault();

    // Reset last auth error, if any
    resetAuthError();

    // Show loading screen
    loadingScreen.showOn(signUpForm);

    let user_name = signUpForm["signup-username"].value;
    let email = signUpForm["signup-email"].value;
    let password = signUpForm["signup-password"].value;
    
    auth.createUserWithEmailAndPassword(email, password)
        // Wait for signing up process then create a reference for new user
        .then(({user}) => {
            database.ref(`users/${user.uid}/`).set({
                username: user_name,
            })
            .then(() => {
                    auth.signOut()
                        .then(() => {
                            loadingScreen.hide();

                            // Close modal form
                            hideUserForm();
        
                            // Clear input fields
                            event.target.reset();
                        })
            })
        }).catch(error => {
            throwError(signUpForm, error);
            loadingScreen.hide();
        })
})

function throwError(form, error) {
    form.appendChild(authError);
    authError.textContent = error.message;
}

export function resetAuthError() {
    authError.textContent = "";
    authError.remove();
}