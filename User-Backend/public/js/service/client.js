// Configuración dinámica del host de la API de C#
const CSHARP_API_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5225'  // Tu API local de C# (HTTP para evitar líos de certificados)
        : 'https://tu-api-csharp.onrender.com'; // URL de producción provista por Render

export async function RequestEntrar(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('#btn-login-submit');

    btn.disabled = true;



    const dForm = new FormData(form);
    const data = Object.fromEntries(dForm.entries());

    alert(`Datos enviados:\nUsuario: ${data.User}\nContraseña: ${data.Password}`);

    try {
        const response = await fetch(`${ CSHARP_API_URL }/api/Graph_Controllers/validate_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Escuchamos el 401 (No autorizado) en lugar del 404
            if (response.status === 401) {
                throw new Error('Usuario o contraseña incorrectos.');
            }
            // Si realmente es un 404, ahora sí sabemos que es un problema de ruta/servidor
            if (response.status === 404) {
                throw new Error('No se pudo conectar con el servidor (Ruta no encontrada).');
            }
            throw new Error('Ocurrió un error inesperado en el servidor.');
        }

        const isValidUser = await response.json();

        if (isValidUser) {
            alert('¡Validación exitosa!');
            // Aquí puedes redirigir al usuario, por ejemplo:
            // window.location.href = '/dashboard';
        }

    } catch (error) {
        btn.disabled = false;

        console.error('Error en la petición de ingreso:', error);
        alert(error.message);
    }
}