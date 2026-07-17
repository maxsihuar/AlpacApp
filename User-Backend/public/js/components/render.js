import { Navbar } from "./components.js"; 
import { OffCanvas, MainChat, ContainerChat, OffCanvasChat } from "./components.js";
import { LoginForm } from "./components.js";
import { RegisterFomr} from "./components.js";
import { ContainerCards, CardPeople } from "./components.js";

import { RequestEntrar } from "../service/client.js";
import { RequestRegistrar } from "../service/client.js";
import { RequestAmigos} from "../service/client.js"
function cargarNavbar() {
    const body = document.querySelector("body");
    if (body) {
        body.insertAdjacentHTML("afterbegin", Navbar)
    } 
}

async function cargarChats(idActivo = null) {
    const listaChats = document.getElementById("list-chats");
    if (listaChats) {
        const amigos = await RequestAmigos();
        listaChats.innerHTML = "";

        amigos.forEach(amigo => {
            const nuevoChat = {
                id: amigo.id,
                name: amigo.name,
                time: '14:32',
                message: '¡Dale, nos vemos luego!',
                active: amigo.id == idActivo
            };
            listaChats.innerHTML += OffCanvasChat(nuevoChat);
        })
    } else {
        console.warn("AlpacApp Warning: No se encontró la etiqueta <div id='list-chats'> en el DOM actual.");
    }
}

async function cargarMensajes(idAmigo = null) {
    const main = document.getElementById("main");
    if (main) {
        main.innerHTML = MainChat;
    } else {
        console.warn("AlpacApp Warning: No se encontró la etiqueta <main> en el DOM actual.");
    }
}

export function cargarLoginForm(onNavigateToRegister, onNavigateToMain) {
    const body = document.querySelector("body");
    if (body) {
        body.insertAdjacentHTML("afterbegin",LoginForm);
    }

    const formulario = document.getElementById('login-form');

    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            const estado = await RequestEntrar(e);
            if (estado) {
                if (typeof onNavigateToMain === "function") {
                    onNavigateToMain();
                }
            }
        });
        
    } else {
        console.error("No se pudo encontrar el formulario 'login-form' en el DOM.");
    }

    const btn = document.getElementById('btn-register');
    if (btn && typeof onNavigateToRegister === "function") {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            onNavigateToRegister();
        });
    }
    else {
        console.error("No se pudo encontrar el botón 'btn-register' en el DOM o la función onNavigateToRegister no es válida.");
    }
}
export function cargarRegisterForm(onNavigateToLogin) {
    const body = document.querySelector("body");
    if (body) {
        body.insertAdjacentHTML("afterbegin", RegisterFomr);
    }

    const formulario = document.getElementById('register-form');
    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            const estado = await RequestRegistrar(e);
            if (estado) {
                if (typeof onNavigateToLogin === "function") {
                    onNavigateToLogin();
                }
            }
        } );
    } else {
        console.error("No se pudo encontrar el formulario 'register-form' en el DOM.");
    }
}

export function cargarMainPage() {
    const body = document.querySelector("body");
    if (body) {
        body.insertAdjacentHTML("afterbegin", Navbar)
    }
}

export function cargarChatPage(idAmigo = null) {
    cargarNavbar();

    const navbar = document.querySelector('header');
    if (navbar) {
        navbar.insertAdjacentHTML("afterend", ContainerChat);
    }

    const aside = document.getElementById("aside");
    if (aside) {
        aside.innerHTML = OffCanvas;
    }
    
    cargarChats(idAmigo);
    cargarMensajes(idAmigo)
}


export function cargarContainerSearch() {
    const navbar = document.querySelector('header');
    if (navbar) {
        navbar.insertAdjacentHTML("afterend", ContainerCards);
    }
}

export function cargarCardPeople() {
    const container = document.getElementById("container-cards");
    if (container) {
        for (let i = 0; i < 10; i++) {
            container.insertAdjacentHTML("afterbegin", CardPeople);
        }
        
    }
}

// Evento unificado: Corre todo en orden secuencial estricto
document.addEventListener("DOMContentLoaded", () => {


    //cargarContainerSearch();
    //cargarCardPeople();

    //cargarRegisterForm();
    //cargarLoginForm();

    // TRUCO EXTRA: Forzar a Bootstrap a escuchar los nuevos componentes inyectados
    if (typeof bootstrap !== 'undefined') {
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => new bootstrap.Dropdown(el));
        document.querySelectorAll('[data-bs-toggle="offcanvas"]').forEach(el => new bootstrap.Offcanvas(el));
    }
});