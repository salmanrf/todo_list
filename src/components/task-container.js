import {format, showTaskForm} from "./form/task-form";

// Display today's date (App starts on Today)
const topbarDate = document.querySelector("#topbar-date");
topbarDate.textContent = format(new Date(), "dd MMMM yyyy");

// Button for adding task
const addButton = document.querySelector(".add-task");
addButton.addEventListener("click", showTaskForm);