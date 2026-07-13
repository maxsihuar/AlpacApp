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

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

            <div class="navbar-nav me-auto ">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                <a class="nav-link" href="#">Features</a>
                <a class="nav-link" href="#">Pricing</a>
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </div>

            <form class="d-flex" role="search" >
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>
`;
}

function LoginForm() {
    const main = document.querySelector('main');
    if (main==null){
        return;
    }
    main.innerHTML = `
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
                        <button type="button" class="btn btn-login">Entrar</button>
                        <button type="button" class="btn btn-login">Registrarse</button>
                    </div>
                </div>

            </div>

            <div class="col img-login w-100 d-flex justify-content-center align-items-center text-center overflow-hidden">
                <img src="image/AlpacAPP Carga.svg" class=" w-100 h-100 img-fluid" alt="AlpacApp" />
            </div>
        </div>
    </main>`;
}

document.addEventListener('DOMContentLoaded', LoginForm);
document.addEventListener('DOMContentLoaded', Navbar);
