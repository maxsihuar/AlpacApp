// Configuración dinámica del host de la API de C#
const CSHARP_API_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5225'  // Tu API local de C# (HTTP para evitar líos de certificados)
        : 'https://tu-api-csharp.onrender.com'; // URL de producción provista por Render

const NODE_API_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'  // Puerto habitual de Node.js (Express)
        : 'https://tu-api-node.onrender.com';

let socketInstance = null;

export async function RequestUser(id) {
    try {
        const response = await fetch(`${CSHARP_API_URL}/api/Graph_Controllers/user/${id}`);

        if (!response.ok) {
            throw new Error('Ocurrió un error inesperado en el servidor.');
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.log("Error en la peticion : ", error);
    }
}

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

        const lastMessage = await response.json();
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

        const lastMessage = await response.json();
        return lastMessage;
    } catch (error) {
        console.log("Error en la peticion : ", error);
    }
}

export function ConnectWebSocket(onMessageCallback) {
    if (socketInstance && (socketInstance.readyState === WebSocket.OPEN || socketInstance.readyState === WebSocket.CONNECTING)) {
        console.log("Reutilizando conexión WebSocket existente. Actualizando el callback de mensajes.");

        socketInstance.onmessage = (e) => {
            try {
                const response = JSON.parse(e.data);
                console.log("¡Mensaje recibido para pintar en pantalla!", response);
                if (onMessageCallback) {
                    onMessageCallback(response);
                }
            } catch (error) {
                console.log("Error en el WebSocket", error);
            }
        };

        return socketInstance;
    }

    const userId = localStorage.getItem("User");
    if (!userId) { console.error("No se pudo extraer el id del usuario"); return; }

    const wsTargetUrl = NODE_API_URL.replace(/^http/, 'ws');
    socketInstance = new WebSocket(`${wsTargetUrl}/messages/live?userId=${userId}`);

    socketInstance.onopen = () => { console.log("Conectado correctamente"); }

    socketInstance.onmessage = (e) => {
        try {
            const response = JSON.parse(e.data);
            console.log("¡Mensaje recibido para pintar en pantalla!", response);
            if (onMessageCallback) {
                onMessageCallback(response);
            }
        } catch (error) {
            console.log("Error en el WebSocket", error);
        }
    };

    socketInstance.onclose = (event) => {
        console.warn(`WebSocket desconectado. Código: ${event.code}. Razón: ${event.reason}`);
        socketInstance = null;
    };

    socketInstance.onerror = (error) => {
        console.error("Error en el WebSocket:", error);
    };

    return socketInstance;
}

export function RequestSendMessage(receiverId, content) {
    if (!socketInstance || socketInstance.readyState !== WebSocket.OPEN) {
        console.error("No se pudo conectar con la instancia del WebSocket");
        return false;
    }

    const payload = {
        receiverId: receiverId,
        content: content
    };

    socketInstance.send(JSON.stringify(payload));
    return true;
}
