// import {resetAuthError} from "./../user-handler";

// Grab container for contents
const container = document.querySelector("#project-container");

// Create overlay for modal menu
const overlay = document.createElement("div");
overlay.setAttribute("class", "overlay");

// Create container for modal form
const modalLogin = document.createElement("div");
modalLogin.setAttribute("class", "modal-menu");

const modalSignup = document.createElement("div");
modalSignup.setAttribute("class", "modal-menu");

// Login Form
const loginForm = document.createElement("form");
loginForm.setAttribute("class", "modal-form");
loginForm.setAttribute("id", "login-form");

const loginHeader = document.createElement("div");
loginHeader.setAttribute("class", "menu-header");
loginHeader.innerHTML = "<div class='menu-title'>Login</div>";

modalLogin.appendChild(loginHeader);

// SignUp Form
const signUpForm = document.createElement("form");
signUpForm.setAttribute("class", "modal-form");
signUpForm.setAttribute("id", "signup-form");

const signupHeader = document.createElement("div");
signupHeader.setAttribute("class", "menu-header");
signupHeader.innerHTML = "<div class='menu-title'>Sign Up</div>";

modalSignup.appendChild(signupHeader);

// Login form html
loginForm.innerHTML = "<label for='login-email'>Email : </label>" + 
                      "<input type='text' id='login-email' name='login-email'>" + 
                      "<label for='login-password'>Password : </label>" + 
                      "<input type='password' id='login-password' name='login-password'>" +    
                      "<div class='form-buttons'>" + 
                        "<button class='submit' id='login' type='submit'>Login</button>" +  
                        "<button class='cancel' type='reset'>Cancel</button>" +  
                      "</div>";
                        

// SignUp form html                      
signUpForm.innerHTML = "<label for='signup-username'>Username : </label>" + 
                       "<input type='text' id='signup-username' name='signup-username'>" + 
                       "<label for='signup-email'>Email : </label>" + 
                       "<input type='text' id='signup-email' name='signup-email'>" + 
                       "<label for='signup-password'>Password : </label>" + 
                       "<input type='password' id='signup-password' name='signup-password'>" +    
                       "<div class='form-buttons'>" + 
                        "<button class='submit' id='signup' type='submit'>Sign Up</button>" +  
                        "<button class='cancel' type='reset'>Cancel</button>" +  
                       "</div>";                      

modalLogin.appendChild(loginForm);
modalSignup.appendChild(signUpForm);

container.appendChild(overlay);
container.appendChild(modalLogin);
container.appendChild(modalSignup);

for(let e of document.querySelectorAll(".cancel")) {
    e.addEventListener("click", hideUserForm);
}

export function hideUserForm() {
    // resetAuthError();
    overlay.style.display = "none";
    modalLogin.style.display = "none";
    modalSignup.style.display = "none";
}

export function showLoginForm() {
    overlay.style.display = "block";
    modalLogin.style.display = "flex";
}

export function showSignUpForm() {
    overlay.style.display = "block";
    modalSignup.style.display = "flex";
}

