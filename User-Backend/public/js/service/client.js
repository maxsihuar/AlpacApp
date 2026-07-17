// Configuración dinámica del host de la API de C#
const CSHARP_API_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5225'  // Tu API local de C# (HTTP para evitar líos de certificados)
        : 'https://tu-api-csharp.onrender.com'; // URL de producción provista por Render

const NODE_API_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'  // Puerto habitual de Node.js (Express)
        : 'https://tu-api-node.onrender.com';

export async function RequestEntrar(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('#btn-login-submit');

    btn.disabled = true;



    const dForm = new FormData(form);
    const data = Object.fromEntries(dForm.entries());

    alert(`Datos enviados:\nEmail: ${data.Email}\nContraseña: ${data.Password}`);

    try {
        const response = await fetch(`${CSHARP_API_URL}/api/Graph_Controllers/validate_user`, {
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

        if (isValidUser.estado) {
            localStorage.setItem("Session", "true");
            localStorage.setItem("User", isValidUser.id)
            return true;
            // Aquí puedes redirigir al usuario, por ejemplo:
            // window.location.href = '/dashboard';
        }

    } catch (error) {
        console.error('Error en la petición de ingreso:', error);
        alert(error.message);
        return false
    } finally {
        btn.disabled = false;
    }
}

export async function RequestRegistrar(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('#btn-registrar');

    btn.disabled = true;


    const dForm = new FormData(form);
    const data = Object.fromEntries(dForm.entries());

    alert(`Datos enviados:\nName: ${data.Name}\nLastName: ${data.LastName} \nContraseña: ${data.Password}` );

    try {
        const response = await fetch(`${CSHARP_API_URL}/api/Graph_Controllers/new_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Escuchamos el 401 (No autorizado) en lugar del 404
            if (response.status === 400) {
                throw new Error('Formato no valido.');
            }
            // Si realmente es un 404, ahora sí sabemos que es un problema de ruta/servidor
            if (response.status === 404) {
                throw new Error('No se pudo conectar con el servidor (Ruta no encontrada).');
            }
            throw new Error('Ocurrió un error inesperado en el servidor.');
        }

        if (response.status == 201) {
            alert('¡Usuario registrado exitosamente!');
            const responseData = await response.json();
            localStorage.setItem("User", responseData.id)
            return true;
        }

    } catch (error) {
        console.error('Error en la petición de ingreso:', error);
        alert(error.message);
        return false;
    } finally {
        btn.disabled = false;
    }
}

export async function RequestAmigos(e) {
    const user = localStorage.getItem("User");
    try {
        const response = await fetch(`${CSHARP_API_URL}/api/Graph_Controllers/friends/${user}`);

        if (!response.ok) {
            // Escuchamos el 401 (No autorizado) en lugar del 404
            if (response.status === 400) {
                throw new Error('Formato no valido.');
            }
            // Si realmente es un 404, ahora sí sabemos que es un problema de ruta/servidor
            if (response.status === 404) {
                return [];
            }
            throw new Error('Ocurrió un error inesperado en el servidor.');
        }

        const amigos = await response.json();
        return amigos
    } catch (error) {
        console.error('Error en la petición de ingreso:', error);
        alert(error.message);
        return false;
    }
}

export async function RequesteLastMessage(idSender, idReceiver) {
    try {
        const response = await fetch(`${NODE_API_URL}/messages/ultimo/${idSender}/${idReceiver}`);

        if (!response.ok) {
            throw new Error('Ocurrió un error inesperado en el servidor.');
        }

        const lastMessage = response.json();
        return lastMessage;
    } catch(error) {
        console.log("Error en la peticion : ", error);
    }
}

export async function RequesteConversation(idSender, idReceiver) {
    try {
        const response = await fetch(`${NODE_API_URL}/messages/conversation/${idSender}/${idReceiver}`);

        if (!response.ok) {
            throw new Error('Ocurrió un error inesperado en el servidor.');
        }

        const lastMessage = response.json();
        return lastMessage;
    } catch (error) {
        console.log("Error en la peticion : ", error);
    }
}