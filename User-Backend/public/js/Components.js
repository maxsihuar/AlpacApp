<<<<<<< HEAD
function Navbar() {
    const header = document.querySelector('header');
    if(header==null){
        return;
    }
    header.innerHTML = `
<nav class="navbar sticky-top navbar-expand-lg bg-dark p-3" data-bs-theme="dark" >
    <div class="container-fluid ps-4">
        <a class="navbar-brand pe-4 text-center" href="#">
            <img src="image/AlpacAPP_Logo-removebg-preview.png" alt="Logo" width="60" height="60" class="d-inline-block align-text-center">
                AlpacApp
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
=======
export const Navbar = `
        <nav class="navbar sticky-top navbar-expand-lg bg-dark p-3" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand text-center" href="#">
                    <img src="image/AlpacAPP_Logo-removebg-preview.png" alt="Logo" width="60" height="60" class="d-inline-block align-text-center">
                    AlpacApp
                </a>
>>>>>>> 85fa74f (Agregando mas componentes)

                <div class="d-flex align-items-center order-lg-last">
                    <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="dropdown ps-4">
                        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="image/AlpacAPP Usuario.svg" width="50" height="50" alt="Usuario" />
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end text-small shadow">
                            <li><a id="dropdown-perfil" class="dropdown-item" href="#">Perfil</a></li>
                            <li><a id="dropdown-ajustes" class="dropdown-item" href="#">Ajustes</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a id="dropdown-salir" class="dropdown-item" href="#">Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </div>

                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav me-auto my-2 my-lg-0">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        <a class="nav-link" href="#">Features</a>
                        <a class="nav-link" href="#">Pricing</a>
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </div>

                    <form class="d-flex mt-2 mt-lg-0" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

            </div>
        </nav>
`;

<<<<<<< HEAD
function LoginForm() {
    const main = document.querySelector('main');
    if (main==null){
        return;
    }
    main.innerHTML = `
=======
export const LoginForm = `
>>>>>>> 85fa74f (Agregando mas componentes)
        <main class=" min-vh-100">
        <div class="row g-0 min-vh-100 w-100 m-0">
            <div class="bg-login col-12 col-md-6 d-flex justify-content-center align-items-center p-4 p-md-5">

                <!-- TARJETA LOGIN (Separada de la columna) -->
                <div class="login w-100 p-4 p-sm-5 text-center text-white overflow-hidden" style="max-width: 500px;">
                    <div>
                        <img src="image/AlpacAPP Logo Secundario.svg" class="img-fluid logo-app h-50" />
                    </div>
                    <section class="mt-4 mb-5">
                        <h2>Bienvenidos a AlpacApp</h2>
                        <span>La mejor aplicaci&oacute;n de mensajer&iacute;a de Alcapas</span>
                    </section>
                    <div class="mb-4 row" data-bs-theme="dark">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                        </div>
                    </div>
                    <div class="mb-3 row" data-bs-theme="dark">
                        <label for="inputPassword" class="col-sm-3 col-form-label pe-3">Password</label>
                        <div class="col-sm-9">
                            <input type="password" class="form-control" id="inputPassword">
                        </div>
                    </div>
                    <div class="d-flex justify-content-center gap-2">
                        <button type="submit" id="btn-login-submit" class="btn btn-login">Entrar</button>
                        <button type="button" id="btn-registrar" class="btn btn-login">Registrarse</button>
                    </div>
                </div>

            </div>

            <div class="col img-login w-100 d-flex justify-content-center align-items-center text-center overflow-hidden">
                <img src="image/AlpacAPP Carga.svg" class=" w-100 h-100 img-fluid" alt="AlpacApp" />
            </div>
        </div>
    </main>`;

<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', LoginForm);
document.addEventListener('DOMContentLoaded', Navbar);
=======
export const MainChat = `
<div class="w-100 bg-light h-100">
    <div class="d-flex flex-column h-100">
        <!-- Cabecera del chat -->
        <div class="p-3 bg-white border-bottom shadow-sm">
            <h5 class="mb-0">Soporte AlpacApp</h5>
        </div>

        <!-- Espacio para los mensajes -->
        <div class="flex-grow-1 p-3 overflow-auto">
            <!-- Corregido el texto con entidades HTML para evitar los rombos -->
            <p class="text-muted text-center my-4">Aqu&iacute; se cargar&aacute;n tus mensajes...</p>
        </div>

        <!-- Footer con el input -->
        <div class="p-3 bg-white border-top">
            <form class="d-flex">
                <input type="text" class="form-control me-2" placeholder="Escribe un mensaje...">
                <button class="btn btn-success" type="submit">Enviar</button>
            </form>
        </div>
    </div>
</div>`;

export const OffCanvas = `
        <!-- El botón vive dentro del componente y solo se ve en móviles -->
        <button class="btn btn-success d-lg-none position-fixed start-0 ms-3 z-3 shadow-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#asideChats" aria-controls="asideChats" style="bottom: 75px !important;">
            Ver Chats
        </button>

        <!-- El menú lateral: En móviles (menor a lg) usa el sistema offcanvas flotante. En PC (lg) se vuelve un bloque normal -->
        <aside class="offcanvas-lg offcanvas-start bg-dark border-end text-white p-0 h-100 w-100" tabindex="-1" id="asideChats" aria-labelledby="asideChatsLabel" style="height: 100%;">

            <div class="offcanvas-header bg-dark border-bottom d-lg-none">
                <h5 class="offcanvas-title" id="asideChatsLabel">Mis Conversaciones</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" data-bs-target="#asideChats" aria-label="Close"></button>
            </div>

            <!-- Cuerpo del Aside -->
            <div class="d-flex flex-column h-100">

                <!-- Buscador de chats interno -->
                <div class="p-3 border-bottom">
                    <input type="text" class="form-control form-control-sm bg-secondary text-white border-0" placeholder="Buscar chat...">
                </div>

                <!-- Lista de contactos con scroll propio -->
                <div id="list-chats" class="list-group list-group-flush flex-grow-1 overflow-auto">

                </div>
            </div>
        </aside>
`;

export const OffCanvasChat_activo = `
                    <a href="#" class="list-group-item list-group-item-action bg-secondary text-white d-flex align-items-center p-3 border-bottom border-secondary active">
                        <img src="image/AlpacAPP Usuario.svg" width="40" height="40" class="rounded-circle me-3" alt="Avatar">
                        <div class="w-100 overflow-hidden">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1 text-truncate">Soporte AlpacApp</h6>
                                <small class="text-white-50 flex-shrink-0">1:05 PM</small>
                            </div>
                            <p class="mb-0 small text-white-50 text-truncate">¿Viste el nuevo logo?</p>
                        </div>
                    </a>
`;

export const OffCanvasChat_inactivo = `
                    <a href="#" class="list-group-item list-group-item-action bg-dark text-white d-flex align-items-center p-3 border-bottom border-secondary">
                        <img src="image/AlpacAPP Usuario.svg" width="40" height="40" class="rounded-circle me-3" alt="Avatar">
                        <div class="w-100 overflow-hidden">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1 text-truncate">Juan Pérez</h6>
                                <small class="text-muted flex-shrink-0">Ayer</small>
                            </div>
                            <p class="mb-0 small text-muted text-truncate">¡Dale, nos vemos luego!</p>
                        </div>
                    </a>`;
>>>>>>> 85fa74f (Agregando mas componentes)
