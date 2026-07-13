import { Navbar , OffCanvas, MainChat, OffCanvasChat_activo, OffCanvasChat_inactivo} from "./components.js"; 

function cargarNavbar() {
    const header = document.querySelector("header");
    if (header) {
        header.innerHTML = Navbar;
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
    cargarNavbar();
    cargarAside();
    cargarAsideChats();
    cargarMainChat();

    // TRUCO EXTRA: Forzar a Bootstrap a escuchar los nuevos componentes inyectados
    if (typeof bootstrap !== 'undefined') {
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => new bootstrap.Dropdown(el));
        document.querySelectorAll('[data-bs-toggle="offcanvas"]').forEach(el => new bootstrap.Offcanvas(el));
    }
});