import {LoginForm, Navbar , OffCanvas, MainChat, OffCanvasChat_activo, OffCanvasChat_inactivo} from "./components.js"; 
import { RequestEntrar } from "../service/client.js";
function cargarNavbar() {
    const header = document.querySelector("header");
    if (header) {
        header.innerHTML = Navbar;
    }
}

function cargarLoginForm() {
    const body = document.querySelector("body");
    if (body) {
        body.innerHTML += LoginForm;
    }

    const formulario = document.getElementById('login-form');

    if (formulario) {
        formulario.addEventListener('submit', RequestEntrar);
    } else {
        console.error("No se pudo encontrar el formulario 'login-form' en el DOM.");
    }

}

function cargarAside() {
    const aside = document.getElementById("aside");
    if (aside) {
        aside.innerHTML = OffCanvas;
    }
}

function cargarAsideChats(){
    const listaChats = document.getElementById("list-chats");
    if (listaChats) {
        listaChats.innerHTML = OffCanvasChat_activo + OffCanvasChat_inactivo;
    }
    else {
        console.warn("AlpacApp Warning: No se encontró la etiqueta <div id='list-chats'> en el DOM actual.");
    }
}
function cargarMainChat() {
    const main = document.getElementById("main");
    if (main) {
        main.innerHTML = MainChat;
    } else {
        console.warn("AlpacApp Warning: No se encontró la etiqueta <main> en el DOM actual.");
    }
}

// Evento unificado: Corre todo en orden secuencial estricto
document.addEventListener("DOMContentLoaded", () => {
    //cargarNavbar();
    cargarLoginForm();
    //cargarAside();
    //cargarAsideChats();
    //cargarMainChat();

    // TRUCO EXTRA: Forzar a Bootstrap a escuchar los nuevos componentes inyectados
    if (typeof bootstrap !== 'undefined') {
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => new bootstrap.Dropdown(el));
        document.querySelectorAll('[data-bs-toggle="offcanvas"]').forEach(el => new bootstrap.Offcanvas(el));
    }
});