import {showLoginForm, showSignUpForm} from "./form/user-form";

// Grab the hamburger menu
const hamburg = document.querySelector(".hamburger-menu");

// Grab the login and signup buttons (logout is handled in "user-handler.js")
const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener("click", showLoginForm);

const signUpBtn = document.querySelector("#signup-btn");
signUpBtn.addEventListener("click", showSignUpForm);

