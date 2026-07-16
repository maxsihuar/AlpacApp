import { cargarLoginForm, cargarRegisterForm } from "../components/render.js";
import { cargarMainPage } from "../components/render.js"
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
    }
};

function router() {
    let rutaActual = window.location.hash.replace("#", "");

    if (rutaActual === "") {
        rutaActual = "/login";
    }

    limpiarBodyConservandoScripts();

    if (rutas[rutaActual]) {
        rutas[rutaActual]();
    } else {
        routeToLogin();
    }
}


function routeToRegister() {
    window.location.hash = "/register"; }

function routeToLogin() {
    window.location.hash = "/login"; }

function routeToMain() {
    window.location.hash = "/main";
}

function initializeVars() {
    if (localStorage.getItem("Session") === null) {
        localStorage.setItem("Session", "false");
        localStorage.setItem("User", "");
    }

    const Session = localStorage.getItem("Session");
    if (Session === "false") {

        if (!window.location.hash || window.location.hash === "") {
            window.location.hash = "/login";
        }
        router();
    }
}


window.addEventListener("hashchange", () => {
    console.log("El hash de la URL cambió, re-evaluando vista...");
    console.log("Hash actual:", window.location.hash);
    router();
});

// Arrancamos
initializeVars();