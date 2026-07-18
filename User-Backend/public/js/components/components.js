export const Navbar = `
<header>
        <nav class="navbar fixed-top navbar-expand-lg bg-dark p-3" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand text-center" href="#">
                    <img src="image/AlpacAPP_Logo-removebg-preview.png" alt="Logo" width="60" height="60" class="d-inline-block align-text-center">
                    AlpacApp
                </a>

                <div class="d-flex align-items-center order-lg-last">
                    <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="dropdown ps-4">
                        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="image/AlpacAPP Usuario.svg" width="50" height="50" alt="Usuario" />
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end text-small shadow">
                            <li><a id="dropdown-perfil" class="dropdown-item" href="#/profile"><i class ="me-1 bi bi-person-circle"></i>Perfil</a></li>
                            <li><a id="dropdown-ajustes" class="dropdown-item" href="#">Ajustes</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a id="dropdown-salir" class="dropdown-item" href="#">Cerrar Sesi√≥n</a></li>
                        </ul>
                    </div>
                </div>

                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav me-auto my-2 my-lg-0">
                        <a class="me-2 nav-link active" aria-current="page" href="#/main"><i class="me-1 bi bi-house"></i>Hogar</a>
                        <a class="me-2 nav-link" href="#/chats"><i class="me-1 bi bi-chat"></i>Chats</a>
                        <a class="me-2 nav-link" href="#/graph"><i class="me-2 bi bi-bezier2"></i>Grafo</a>
                        <a class="me-2 nav-link disabled" aria-disabled="true">Disfrutalo</a>
                    </div>

                    <form class="d-flex mt-2 mt-lg-0" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn-navbar btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

            </div>
        </nav>
 </header>
`;

export const LoginForm = `
    <main class=" min-vh-100">
    <div class="row g-0 min-vh-100 w-100 m-0">
        <div class="bg-login col-12 col-md-6 d-flex justify-content-center align-items-center p-4 p-md-5">

            <!-- TARJETA LOGIN -->
            <div class="login w-100 p-4 p-sm-5 text-center text-white overflow-hidden" style="max-width: 500px;">
                <div>
                    <img src="image/AlpacAPP Logo Secundario.svg" class="img-fluid logo-app h-50" />
                </div>
                <section class="mt-4 mb-5">
                    <h2>Bienvenidos a AlpacApp</h2>
                    <span>La mejor aplicaci&oacute;n de mensajer&iacute;a de Alpacas</span>
                </section>

                <!-- 1. ENVOLVEMOS TODO EN UN <form> CON SU RESPECTIVO ID -->
                <form id="login-form">
                    
                    <div class="mb-4 row" data-bs-theme="dark">
                        <label for="inputUser" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                            <!-- 2. CAMBIADO: name="Email" (coincide con C#) y agregado "required" -->
                            <input type="text" class="form-control" id="inputUser" name="Email" placeholder="name@example.com">
                        </div>
                    </div>

                    <div class="mb-3 row" data-bs-theme="dark">
                        <label for="inputPassword" class="col-sm-3 col-form-label pe-3">Password</label>
                        <div class="col-sm-9">
                            <!-- 3. CAMBIADO: name="Password" (coincide con C#) y agregado "required" -->
                            <input type="password" class="form-control" id="inputPassword" name="Password" placeholder="Password" required>
                        </div>
                    </div>

                    <div class="d-flex justify-content-center gap-2">
                        <!-- El botÛn submit ahora sÌ enviar· el formulario -->
                        <button type="submit" id="btn-login-submit" class="btn btn-login">Entrar</button>
                        <button type="button" id="btn-register" class="btn btn-login">Registrarse</button>
                    </div>

                </form>

            </div>

        </div>

        <div class="col img-login w-100 d-flex justify-content-center align-items-center text-center overflow-hidden">
            <img src="image/AlpacAPP Carga.svg" class=" w-100 h-100 img-fluid" alt="AlpacApp" />
        </div>
    </div>
</main>`;

export const RegisterFomr = `
    <main class=" min-vh-100">
        <div class="row g-0 min-vh-100 w-100 m-0">
            <div class="col img-login w-100 d-flex justify-content-center align-items-center text-center overflow-hidden">
                <img src="image/AlpacApp Registrar.svg" class=" w-100 h-100 img-fluid" alt="AlpacApp" />
            </div>

            <div class="bg-login col-12 col-md-6 d-flex justify-content-center align-items-center p-4 p-md-5">

                <!-- TARJETA LOGIN -->
                <div class="login w-100 p-4 p-sm-5 text-center text-white overflow-hidden" style="max-width: 500px;">
                    <div>
                        <img src="image/AlpacAPP Logo Secundario.svg" class="img-fluid logo-app h-50" />
                    </div>
                    <section class="mt-4 mb-5">
                        <h2>Se parte de AlpacApp</h2>
                        <span>Unete a nuestra gran comunidad</span>
                    </section>

                    <!-- 1. ENVOLVEMOS TODO EN UN <form> CON SU RESPECTIVO ID -->
                    <form id="register-form">

                        <div class="mb-4 row" data-bs-theme="dark">
                            <label for="inputName" class="col-sm-3 col-form-label">Nombres</label>
                            <div class="col-sm-9">
                                <!-- 2. CAMBIADO: name="Name" (coincide con C#) y agregado "required" -->
                                <input type="text" class="form-control" id="inputName" name="Name" placeholder="Your name">
                            </div>
                        </div>

                        <div class="mb-4 row" data-bs-theme="dark">
                            <label for="inputAp" class="col-sm-3 col-form-label">Apellidos</label>
                            <div class="col-sm-9">
                                <!-- 2. CAMBIADO: name="LastName" (coincide con C#) y agregado "required" -->
                                <input type="text" class="form-control" id="inputAp" name="LastName" placeholder="Your last name">
                            </div>
                        </div>

                        <div class="mb-4 row" data-bs-theme="dark">
                            <label for="inputUser" class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                                <!-- 2. CAMBIADO: name="Email" (coincide con C#) y agregado "required" -->
                                <input type="text" class="form-control" id="inputUser" name="Email" placeholder="name@example.com">
                            </div>
                        </div>

                        <div class="mb-3 row" data-bs-theme="dark">
                            <label for="inputPassword" class="col-sm-3 col-form-label pe-3">Password</label>
                            <div class="col-sm-9">
                                <!-- 3. CAMBIADO: name="Password" (coincide con C#) y agregado "required" -->
                                <input type="password" class="form-control" id="inputPassword" name="Password" placeholder="Password" required>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center gap-2">
                            <!-- El botÛn submit ahora sÌ enviar· el formulario -->
                            <button type="submit" id="btn-registrar" class="btn btn-login">Registrarse</button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    </main>`;

export const ContainerChat = `
    <!-- Forzamos al contenedor principal a medir el alto exacto disponible debajo del navbar -->
    <div class="container-fluid p-0 overflow-hidden bg-light" style="height: calc(100vh - 100px); margin-top: 100px; display: flex; width: 100%;">
        
        <!-- En mÛviles este div medir· 0 de ancho, en PC tomar· el 25% (col-lg-3 equivalente) -->
        <div id="aside" class="col-0 col-lg-3 p-0 h-100 flex-shrink-0"></div>

        <!-- El contenedor del chat toma el 100% en mÛviles y el 75% en PC de forma fluida -->
        <div id="main" class="col-12 col-lg-9 p-0 h-100 flex-grow-1" style="position: relative; height: 100%;"></div>

    </div>`;

export const MainChat = (titulo) => {
    return `
<div class="w-100 bg-light h-100" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column;">
    <!-- Cabecera fija arriba -->
    <div class="p-3 bg-white border-bottom shadow-sm" style="flex-shrink: 0; width: 100%;">
        <h5 class="mb-0">${titulo}</h5>
    </div>

    <!-- Espacio intermedio para mensajes con scroll forzado -->
    <div id="container-chats" class="d-flex flex-column gap-2 p-3 overflow-auto" style="flex-grow: 1; min-height: 0; overflow-y: auto;">
        <!-- AquÌ entran los mensajes cargados por la API -->
    </div>

    <!-- Footer fijo abajo (No se puede desplazar m·s abajo del borde inferior) -->
    <div class="p-3 bg-white border-top" style="flex-shrink: 0; width: 100%;">
        <form class="d-flex">
            <input id="send-txt" type="text" class="form-control me-2" placeholder="Escribe un mensaje...">
            <button id="send-msg" class="btn-chat btn btn-success" type="submit">Enviar</button>
        </form>
    </div>
</div>`;
}

export const OffCanvas = `
        <button class="btn btn-success d-lg-none position-fixed start-0 ms-3 z-3 shadow-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#asideChats" aria-controls="asideChats" style="bottom: 75px !important;">
            Ver Chats
        </button>

        <!-- El men√∫ lateral: En m√≥viles (menor a lg) usa el sistema offcanvas flotante. En PC (lg) se vuelve un bloque normal -->
        
            <aside class="offcanvas-lg offcanvas-start bg-dark border-end text-white p-0" tabindex="-1" id="asideChats" aria-labelledby="asideChatsLabel" style="height: calc(100vh - 56px);">

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

export const MessageReceiver = ({ time, message }) => {
    return `<div  class="d-flex align-self-start max-w-75">
                <div id ="receiver" class="bg-primary text-white p-3 rounded-3 shadow-sm rounded-start-0">
                    <p class="mb-1">${message}</p>
                    <small class="text-white-50 d-block text-end" style="font-size: 0.75rem;">${time}</small>
                </div>
            </div>`;
};

export const MessageSender = ({ time, message }) => {
    return `
    <div class="d-flex align-self-end max-w-75">
        <div class="bg-secondary text-white p-3 rounded-3 shadow-sm rounded-end-0">
            <p class="mb-1">${message}</p>
            <small class="text-white-50 d-block text-end" style="font-size: 0.75rem;">${time}</small>
        </div>
    </div>`;
};

export const OffCanvasChat = ({ id, name, time, message, active = false }) => {
    const activeClass = active ? 'secondary' : 'dark';

    return `
    <a href="#/chats/${id}" 
       class="list-group-item list-group-item-action bg-${activeClass} text-white d-flex align-items-center p-3 border-bottom border-secondary">
        <img src="image/AlpacAPP Usuario.svg" width="40" height="40" class="rounded-circle me-3" alt="Avatar de ${name}">
        <div class="w-100 overflow-hidden">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1 text-truncate">${name}</h6>
                <small class="text-white-50 flex-shrink-0">${time}</small>
            </div>
            <p class="mb-0 small text-truncate text-white-50">${message}</p>
        </div>
    </a>`;
};

export const ContainerCards = `
    <div class="container-fluid px-3 px-md-5 py-3">
        <h3 id="Search_text" class="text-start">Personas encontradas
        </h3>
        <div id="container-cards" class="row mt-4">
        </div>
    </div>`;

export function CardPeople(user) {
    return `
    <div class="col-md-4 col-lg-3 mb-4">

        <div class="card h-100">

            <img
                src="/image/AlpacAPP-Media/logo info.jpg"
                class="card-img-top"
                alt="Foto de perfil">

            <div class="card-body text-center">

                <h5 class="card-title">
                    ${user.name} ${user.lastName}
                </h5>

                <p class="card-text">
                    ${user.email}
                </p>

                <button
                    class="btn btn-primary btn-sm button-color btn-ver-profile"
                    data-id="${user.id}">
                    Ver perfil
                </button>

                <button
                    class="btn btn-outline-primary btn-sm button-color btn-add-friend"
                    data-id="${user.id}">
                    Agregar
                </button>

            </div>

        </div>

    </div>
    `;
}
export const FriendsContainer = `
    <h3 class="fw-bold mb-3 title-color2">
        Sugerencias de Amistad
    </h3>

    <div id="friends-cards" class="row">

    </div>
`;
export const Carousel = `
<div id="carouselExampleIndicators"
class="carousel slide"
data-bs-ride="carousel"
data-bs-interval="3000">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/image/AlpacAPP-Media/logo unsaac.png" class="d-block w-100 logo-banner" alt="Banner1">
    </div>
    <div class="carousel-item">
      <img src="/image/AlpacAPP-Media/logo info.jpg" class="d-block w-100 logo-banner" alt="Banner2">
    </div>
    <div class="carousel-item">
      <img src="/image/AlpacAPP-Media/bob.jpg" class="d-block w-100" alt="Banner3">
    </div>
    <div class ="carousel-item">
        <img src = "/image/AlpacAPP-Media/miary zo.jpg" class = "d-block w-100" alt="Banner4">
    </div>
  </div>
</div>
`
export const MediaContainer = `
    <h3 class="fw-bold mb-3 title-color2">
        Lo mejor de Internet
    </h3>

    ${Carousel}
`;
export const MainPage = `
    <main class="main-page">

        <div class="container py-4">

            <section id="friends-section">

            </section>

            <section id="media-section">

            </section>

        </div>

</main >
`;
export const ProfilePage = `
<main class="profile-page mt-5">

    <div class="container py-5">

        <section id="profile-info">

        </section>

        <section id="profile-posts">

        </section>

    </div>

</main>
`;
export function ProfileInfo(esMiPerfil, esAmigo){
    return `
<div class="card shadow-sm border-0">

    <div class="card-body text-center">

        <img
            src="/image/AlpacAPP-Media/Yuri-san.jpeg"
            alt="Foto de perfil"
            class="rounded-circle border mb-3"
            width="170"
            height="170"
            style="object-fit: cover;">

        <h2
            id="profile-name"
            class="fw-bold title-color">
            Yuri-chan
        </h2>

        <p
            id="profile-description"
            class="text-muted mb-1">
            Mascufemenino
        </p>

        <p
            id="profile-email"
            class="mb-4">
            correo@correo.com
        </p>

        <div class="d-flex justify-content-center gap-3">

            ${
        esMiPerfil
            ? `
    <button class="btn btn-primary button-color">
        Modificar Perfil
    </button>
`
            : esAmigo
                ? `
    <button class="btn btn-outline-danger">
        Eliminar amigo
    </button>
`
                : `
    <button class="btn btn-primary button-color">
        Agregar amigo
    </button>
`
}
        </div>

    </div>

</div>
`;
}

export const ProfilePosts = `



`

export const MainGraph = `
    <div class="container-fluid p-0">
        <div id="container-graph" 
             class="pt-5" 
             style="width: 100%; height: calc(100vh - 60px); min-height: 500px; display: block;">
        </div>
    </div>
`;