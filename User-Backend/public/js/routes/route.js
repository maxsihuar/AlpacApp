import { cargarLoginForm, cargarRegisterForm } from "../components/render.js";
import { cargarMainPage } from "../components/render.js"
import { cargarChatPage } from "../components/render.js"
import { cargarContainerSearch } from "../components/render.js"
import { cargarProfilePage } from "../components/render.js";
import { cargarGraph } from "../components/render.js";
function limpiarBodyConservandoScripts() {
    const body = document.querySelector("body");
    if (!body) return;

    Array.from(body.children).forEach(elemento => {
        if (elemento.tagName !== 'SCRIPT') {
            elemento.remove();
        }
    });

    body.className = "";
    body.removeAttribute("style");

    // Limpieza de fondos oscuros (backdrops) huérfanos de Bootstrap
    const backdrop = document.querySelector('.modal-backdrop, .offcanvas-backdrop');
    if (backdrop) backdrop.remove();
}

const rutas = {
    "/login": () => {
        cargarLoginForm(routeToRegister, routeToMain);
    },
    "/register": () => {
        cargarRegisterForm(routeToLogin);
    },
    "/main": () => {
        cargarMainPage();
    },
    "/chats": () => {
        cargarChatPage();
    },
    "/profile": () => {
        cargarProfilePage(localStorage.getItem("User"));
    },
    "/graph": () => {
        cargarGraph();
    },
    "/search": () => {
        cargarContainerSearch();
    }
};

function router() {
    const hashActual = window.location.hash;
    let rutaActual = window.location.hash.replace("#", "");

    if (rutaActual === "") {
        rutaActual = "/login";
    }

    limpiarBodyConservandoScripts();

    if (hashActual.startsWith("#/chats/")) {
        const idAmigo = hashActual.replace("#/chats/", "");

        cargarChatPage(idAmigo);
        return;
    }
    if (hashActual.startsWith("#/profile/")) {
        const idUsuario = hashActual.replace("#/profile/", "");

        cargarProfilePage(idUsuario);
        return;
    }

    if (rutas[rutaActual]) {
        rutas[rutaActual]();
    } else {
        if (localStorage.getItem("Session") === "true") {
            routeToMain();
        } else {
            routeToLogin();
        }
    }
}


function routeToRegister() {
    window.location.hash = "/register"; }

function routeToLogin() {
    window.location.hash = "/login"; }

function routeToMain() {
    window.location.hash = "/main"; }
function routeToProfile() {
    window.location.hash = "/profile";
}
function routeToChats() {
    window.location.hash = "/chats";}

function routeToGraph() {
    window.location.hash = "/graph";}
function routeToSearch() {
    window.location.hash = "/search";}

function initializeVars() {
    if (localStorage.getItem("Session") === null) {
        localStorage.setItem("Session", "false");
        localStorage.setItem("User", "");
    }

    const Session = localStorage.getItem("Session");
    const HashActual = window.location.hash;
    if (Session === "false") {

        if (!HashActual || HashActual === "") {
            routeToLogin();
        } else {
            router();
        }
        
    }

    if (Session === "true") {
        if (!HashActual || HashActual === "") {
            routeToMain();
        } else {
            router();
        }
    }
}


window.addEventListener("hashchange", () => {
    console.log("El hash de la URL cambió, re-evaluando vista...");
    console.log("Hash actual:", window.location.hash);
    router();
});

document.addEventListener("DOMContentLoaded", initializeVars);