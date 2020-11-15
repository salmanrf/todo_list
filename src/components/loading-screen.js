import liskarm from "./../img/liskarm-unscreen.gif";

const appContainer = document.querySelector("#app");

const loadingScreen = document.createElement("div");
loadingScreen.setAttribute("class", "loading-screen");

const loadingImg = document.createElement("img");
loadingImg.setAttribute("class", "loading-image");
loadingImg.setAttribute("src", liskarm);

loadingScreen.appendChild(loadingImg);

function show(background) {
    appContainer.appendChild(loadingScreen);

    if(background != null && background != "")
        loadingScreen.style.background = background;
    
    loadingScreen.style.display = "block";
    loadingImg.style.display = "block";
}

function showOn(parent, background) {
    parent.appendChild(loadingScreen);

    if(background != null && background != "")
        loadingScreen.style.background = background;
    
    loadingScreen.style.display = "block";
    loadingImg.style.display = "block";
}

function hide() {
    loadingScreen.remove();
    loadingScreen.style.display = "none";
    loadingImg.style.display = "none";
}

export default {show, showOn, hide};