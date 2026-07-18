import {
    // Páginas y Contenedores Estructurales
    MainPage,
    MainSearch,
    ProfilePage,
    Navbar,
    OffCanvas,
    MediaContainer,
    LoginForm,
    RegisterFomr,
    ProfileInfo,

    MainChat,
    ContainerChat,
    OffCanvasChat,
    MessageSender,
    MessageReceiver,

    FriendsContainer,
    FriendRequestsContainer,
    FriendRequestCard,
    CardPeople,

    // Vista del Gráfico (Sigma.js)
    MainGraph
} from "./components.js";

import {
    RequestRegistrar,
    RequestEntrar,
    RequestUser,

    RequestAmigos,
    RequestSuggestedFriends,
    RequestFriendRequests,
    RequesteSearchUser,
    RequestSendFriendRequest,
    RequestAcceptFriendRequest,
    RequestGraph,

    RequesteConversation,
    RequesteLastMessage,
    RequestSendMessage,

    ConnectWebSocket
} from "../service/client.js";
function cargarNavbar() {
    const body = document.querySelector("body");
    if (body) {
        body.insertAdjacentHTML("afterbegin", Navbar)
    }
    const exit = document.getElementById("dropdown-salir");
    exit.addEventListener("click", () => {
        localStorage.setItem("Session", false);
        localStorage.setItem("User", "");
    });

    const form = document.getElementById("search");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        window.location.hash = "/search";
        try {
            const input = document.getElementById("search-input");
            const nombreBuscado = input.value.trim();

            const users = await RequesteSearchUser(nombreBuscado);
            const container = document.getElementById("friends-cards");

            const txt = document.getElementById("txt-search");
            if (users.length === 0) { txt.textContent = "No se encontraron usuarios con ese nombre"; }
            else { txt.textContent = "Usuarios encontrados"; }

            users.forEach(user => {
                container.insertAdjacentHTML(
                    "beforeend",
                    CardPeople(user)
                );
            });
        }
        catch (error) {
            console.log("Erroe al hacer la peticion -render-", error);
        }
    });
}

async function cargarChats(idActivo = null) {
    const listaChats = document.getElementById("list-chats");
    if (!listaChats) {
        console.warn("AlpacApp Warning: No se encontró la etiqueta <div id='list-chats'> en el DOM actual.");
    }

    const user = localStorage.getItem("User");
    const amigos = await RequestAmigos();
    listaChats.innerHTML = "";

    const promesasChats = amigos.map(async (amigo) => {
        let time = 'Nuevo';
        let message = '¡Di hola por primera vez!';
            
        try {
            const last = await RequesteLastMessage(user, amigo.id);

            if (last && last.content) {
                time = last.sentAt || 'Ahora';
                message = last.content;
            }
        } catch (error) {
            console.warn(`No se pudo obtener el último mensaje para el ID ${amigo.id}:`, error);
        }

        return {
            id: amigo.id,
            name: amigo.name,
            time: time,
            message: message,
            active: amigo.id == idActivo
        };
    });

    const chatsListos = await Promise.all(promesasChats);

    chatsListos.forEach(nuevoChat => {
        listaChats.innerHTML += OffCanvasChat(nuevoChat);
    });
}

async function cargarMensajes(idAmigo = null) {
    const main = document.getElementById("main");
    try {
        if (idAmigo == null) {
            return;
        }
        const amigo = await RequestUser(idAmigo);
        if (main) {
            main.innerHTML = MainChat(amigo.name+ " " + amigo.lastName);
        } else {
            console.warn("AlpacApp Warning: No se encontró la etiqueta <main> en el DOM actual.");
        }
    } catch {
        console.log("Error al cargar informacion de un amigo")
    }
    

    const container = document.getElementById("container-chats");
    const user = localStorage.getItem("User");

    try {
        const conversation = await RequesteConversation(user, idAmigo);

        conversation.forEach((mensaje) => {

            if (mensaje.senderId == user) {
                container.insertAdjacentHTML("beforeend", MessageSender ({
                    time: mensaje.sentAt,
                    message: mensaje.content
                }));

            } else {
                container.insertAdjacentHTML("beforeend", MessageReceiver ({
                    time: mensaje.sentAt,
                    message: mensaje.content
                }));
                container.scrollTop = container.scrollHeight;
            }
        });
    } catch (error) {
        console.warn(`No se pudo obtener la conversacion para el ID ${idAmigo}:`, error);
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

export async function cargarChatPage(idAmigo = null) {
    cargarNavbar();

    const navbar = document.querySelector('header');
    if (navbar) {
        navbar.insertAdjacentHTML("afterend", ContainerChat);
    }

    const aside = document.getElementById("aside");
    if (aside) {
        aside.innerHTML = OffCanvas;
    }    
    await cargarChats(idAmigo);
    await cargarMensajes(idAmigo);

    ConnectWebSocket((response) => {
        const container = document.getElementById("container-chats");
        const user = localStorage.getItem("User");

        if (!container) return;

        if (response.event === "new_message" || response.event === "message_sent") {
            const mensaje = response.data;

            const msgSenderStr = String(mensaje.senderId);
            const msgReceiverStr = String(mensaje.receiverId);
            const idAmigoStr = String(idAmigo);
            const userLogueadoStr = String(user);

            // Si el mensaje es mío y va para el amigo activo
            if (msgSenderStr === userLogueadoStr && msgReceiverStr === idAmigoStr) {
                container.insertAdjacentHTML("beforeend", MessageSender({
                    time: mensaje.createdAt ? new Date(mensaje.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Ahora',
                    message: mensaje.content
                }));
                container.scrollTop = container.scrollHeight;
                cargarChats(idAmigo);
            }
            // Si el mensaje viene del amigo activo hacia mí
            else if (msgSenderStr === idAmigoStr) {
                container.insertAdjacentHTML("beforeend", MessageReceiver({
                    time: mensaje.createdAt ? new Date(mensaje.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Ahora',
                    message: mensaje.content
                }));
                container.scrollTop = container.scrollHeight;
                cargarChats(idAmigo);
            }
            else {
                cargarChats(idAmigo);
            }
        }
    });


    const txtInput = document.getElementById("send-txt");
    const btn = document.getElementById("send-msg");

    function procesarEnvio() {
        const txt = txtInput.value;
        if (txt.trim() !== "") {
            RequestSendMessage(idAmigo, txt);
            txtInput.value = "";
        }
    }

    // Escuchar el click en el botón
    if (btn) {
        btn.addEventListener("click", procesarEnvio);
    }

    if (txtInput) {
        txtInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                procesarEnvio();
            }
        });
    }
}

export async function cargarMainPage() {

    cargarNavbar();

    const navbar = document.querySelector("header");

    if (navbar) {
        navbar.insertAdjacentHTML("afterend", MainPage);
    }
    const friendRequests = document.getElementById("friend-requests-section");

    if (friendRequests) {
        friendRequests.innerHTML = FriendRequestsContainer;
    } else {
        console.warn("No se encontró friend-requests-section");
    }
    await cargarFriendRequests();
    const friends = document.getElementById("friends-section");

    if (friends) {
        friends.innerHTML = FriendsContainer;
    } else {
        console.warn("No se encontró friends-section");
    }
    await cargarCardPeople();
    document.querySelectorAll(".btn-ver-profile").forEach(btn => {

        btn.addEventListener("click", () => {

            window.location.hash = `#/profile/${btn.dataset.id}`;

        });

    });
    document.querySelectorAll(".btn-add-friend").forEach(btn => {

        btn.addEventListener("click", async () => {

            const enviado = await RequestSendFriendRequest(btn.dataset.id);

            if (enviado) {

                btn.disabled = true;
                btn.textContent = "Solicitud enviada";

            } else {

                alert("No se pudo enviar la solicitud.");

            }

        });

    });

    const media = document.getElementById("media-section");

    if (media) {
        media.innerHTML = MediaContainer;
    } else {
        console.warn("No se encontró media-section");
    }

    

}
export async function cargarContainerSearch() {
    cargarNavbar();
    const navbar = document.querySelector("header");

    if (navbar) {
        navbar.insertAdjacentHTML("afterend", MainSearch);
    }

    const friends = document.getElementById("friends-section");

    if (friends) {
        friends.innerHTML = FriendsContainer;
    } else {
        console.warn("No se encontró friends-section");
    }

    const txt = document.getElementById("txt-search");
    if (txt) {
        txt.textContent = "Debes usar la barra de busqueda tilin";
    } else {
        alert("Pipilin");
    }
    
  
}

export async function cargarFriendRequests() {

    const container = document.getElementById("friend-request-cards");

    if (!container) return;

    container.innerHTML = "";

    try {

        const users = await RequestFriendRequests();

        console.log("Solicitudes recibidas:", users);

        users.forEach(user => {
            container.insertAdjacentHTML(
                "beforeend",
                FriendRequestCard(user)
            );
        });
        document.querySelectorAll(".btn-accept-request").forEach(btn => {

            btn.addEventListener("click", async () => {

                const sourceId = btn.dataset.id;

                const ok = await RequestAcceptFriendRequest(sourceId);

                if (ok) {

                    alert("Solicitud aceptada.");

                    cargarFriendRequests();
                    cargarCardPeople();

                } else {

                    alert("No se pudo aceptar la solicitud.");

                }

            });

        });

    } catch (error) {
        console.error(error);
    }

}

export async function cargarCardPeople() {

    const container = document.getElementById("friends-cards");

    if (!container) return;

    container.innerHTML = "";

    try {

        const users = await RequestSuggestedFriends();

        users.forEach(user => {
            container.insertAdjacentHTML(
                "beforeend",
                CardPeople(user)
            );
        });
        document.querySelectorAll(".btn-add-friend").forEach(btn => {

            btn.addEventListener("click", async () => {

                const receiverId = btn.dataset.id;

                const ok = await RequestSendFriendRequest(receiverId);

                if (ok) {

                    alert("Solicitud enviada.");

                    btn.disabled = true;
                    btn.textContent = "Enviada";

                } else {

                    alert("No se pudo enviar la solicitud.");

                }

            });

        });

    } catch (error) {
        console.error(error);
    }
}
export function cargarProfilePage(idUsuario) {

    cargarNavbar();

    const navbar = document.querySelector("header");

    if (navbar) {
        navbar.insertAdjacentHTML("afterend", ProfilePage);
    }

    const miId = localStorage.getItem("User");
    const esMiPerfil = Number(miId) === Number(idUsuario);

    // Temporal, hasta conectar el backend
    const esAmigo = false;

    const profileInfo = document.getElementById("profile-info");

    if (profileInfo) {
        profileInfo.innerHTML = ProfileInfo(esMiPerfil, esAmigo);
    }
}

export async function cargarGraph() {
    cargarNavbar();
    const navbar = document.querySelector('header');
    if (navbar) {
        navbar.insertAdjacentHTML("afterend", MainGraph);
    }

    const graph = new graphology.Graph();
    try {
        const graph_AlpacApp = await RequestGraph();

        if (graph_AlpacApp && typeof graph_AlpacApp === "object") {
            Object.entries(graph_AlpacApp).forEach(([origen, vecinos]) => {
                if (!graph.hasNode(origen)) {
                    graph.addNode(origen, {
                        label: origen,
                        x: Math.random() * 50,
                        y: Math.random() * 50,
                        size: 15,
                        color: "#3b82f6"
                    });
                }

                vecinos.forEach((vecino) => {
                    if (!graph.hasNode(vecino)) {
                        graph.addNode(vecino, {
                            label: vecino,
                            x: Math.random() * 50,
                            y: Math.random() * 50,
                            size: 10,
                            color: "#10b981"
                        });
                    }
                    if (!graph.hasEdge(origen, vecino)) {
                        graph.addEdge(origen, vecino, {
                            size: 3,
                            color: "#9ca3af"    // Línea gris de conexión
                        });
                    }
                });
            });
        }
    } catch (error) {
        console.log("Error al hacer la peticion del grafo", error);
    }
    
    const container = document.getElementById("container-graph");
    if (container == null) { console.log("No se encontro el contenedor del grafo"); }
        const renderer = new Sigma(graph, container, {
        allowInvalidContainer: true,
        defaultNodeColor: "#6b7280",
        defaultEdgeColor: "#e5e7eb"
    });
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