function Navbar() {
    const header = document.querySelector('header');
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


document.addEventListener('DOMContentLoaded', Navbar);