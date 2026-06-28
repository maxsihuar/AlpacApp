# 🦙 AlpacApp - Red Social Basada en Grafos
Proyecto de Programación II

¡Bienvenido a **AlpacApp**! Una red social innovadora diseñada para conectar usuarios optimizando las relaciones mediante estructuras de datos avanzadas. El núcleo de la aplicación utiliza un modelo de **grafo direccionado** personalizado para gestionar las interacciones de manera altamente eficiente.

---

## 📐 Lógica del Grafo (Conectividad)

La arquitectura de relaciones en **alpacApp** se modela mediante un **Grafo Direccionado** ($G = (V, E)$), donde:
* **Nodos (Vértices):** Representan a los usuarios de la plataforma.
* **Aristas (Arcos):** Representan el estado de conexión o interacción entre dos usuarios.

### Reglas de Negocio en el Grafo:
1.  **Solicitud de Amistad Enviada:** Se representa mediante una única arista dirigida desde el emisor al receptor ($A \rightarrow B$).
2.  **Amistad Confirmada:** Se representa mediante la existencia de dos aristas bidireccionales ($A \rightleftarrows B$). Es decir, ambos usuarios se siguen mutuamente o aceptaron la solicitud.

---

## 🏗️ Arquitectura del Proyecto

El sistema está dividido en dos servicios principales independientes para separar el cómputo pesado de grafos de la gestión de usuarios:

```text
alpacApp/
├── alpacApp.sln              # Archivo de solución de Visual Studio
│
├── Core-graph-api/           # [C# / .NET] Backend del Grafo
│   ├── Controllers/          # Endpoints para algoritmos (Recomendaciones, Caminos)
│   ├── Models/               # Estructuras del Grafo (Node, Edge, DirectedGraph)
│   ├── Services/             # Lógica matemática y algoritmos (BFS, DFS)
│   └── Program.cs
│
└── User-Backend/             # [Node.js / Express] Backend de Usuario y Frontend
    ├── src/
    │   ├── controllers/      # Gestión de sesiones y orquestación (Llama a los services)
    │   ├── middlewares/      # Autenticación (JWT) y validaciones
    │   ├── services/         # ¡AQUÍ! Se hacen los fetch/llamadas a la API de C#
    │   └── app.js            # Servidor Express principal (Movido aquí dentro)
    ├── public/               # Frontend de la aplicación (Archivos estáticos)
    │   ├── css/              # Estilos personalizados y Bootstrap
    │   ├── js/               # Lógica del navegador (fetch hacia Node.js)
    │   └── index.html        # Vista principal de alpacApp
    └── package.json
```
---

## 📂 Descripción Detallada de la Estructura

Para mantener el proyecto limpio, escalable y con una clara **Separación de Responsabilidades**, el código se organiza de la siguiente manera:

### 🌐 1. Core-graph-api (Backend en C# / .NET)
Este servicio es el núcleo matemático de **alpacApp**. No maneja usuarios ni sesiones; se dedica exclusivamente a procesar el grafo direccionado en memoria con la máxima eficiencia.

* `📁 Controllers/`: Contiene los endpoints del API REST (ej. `GraphController.cs`). Reciben peticiones HTTP desde Node.js y exponen los resultados de los algoritmos de grafos.
* `📁 Models/`: Define la estructura matemática del grafo. Aquí se programan las clases fundamentales:
    * `Node.cs`: Representa a los usuarios como vértices del grafo.
    * `Edge.cs`: Representa las aristas direccionadas (relaciones de amistad o solicitudes).
    * `DirectedGraph.cs`: La estructura completa que gestiona la lista de adyacencia.
* `📁 Services/`: Contiene la lógica pura de los algoritmos de grafos. Aquí se implementan búsquedas como **BFS (Breadth-First Search)** o **DFS** para calcular recomendaciones de amigos o caminos de conectividad entre usuarios.
* `📄 Program.cs`: El punto de entrada de la aplicación de C# donde se configuran los servicios, la inyección de dependencias y el middleware del API.

---

### 🟢 2. User-Backend (Orquestador en Node.js / Express)
Es el cerebro orientado al usuario. Actúa como un intermediario ("API Gateway") que da la cara al cliente web, maneja la seguridad y orquesta las llamadas hacia el servicio de C#.

* `📁 src/`: Carpeta contenedora de todo el código fuente del backend de Node.js.
    * `📁 controllers/`: **Los Recepcionistas.** Se encargan de recibir las peticiones de la página web, validar que los datos de entrada sean correctos y enviar la respuesta final al cliente. Delegan toda la lógica pesada a los servicios.
    * `📁 middlewares/`: **La Seguridad.** Filtros intermedios que se ejecutan antes de llegar a los controladores. Aquí se verifica, por ejemplo, si el usuario tiene un token **JWT válido** para permitirle navegar por la red social.
    * `📁 services/`: **Los Especialistas.** Esta carpeta aloja la lógica de integración externa. Aquí es donde se programan las **Llamadas Asíncronas (Fetch / Promesas)** que viajan internamente hacia el API de C# para consultar el estado del grafo.
    * `📄 app.js`: El archivo principal de Node.js. Inicia el servidor Express, configura las rutas globales y conecta los middlewares.
* `📁 public/`: **El Frontend de alpacApp.** Carpeta de archivos estáticos que el servidor de Node.js sirve directamente al navegador del usuario.
    * `📁 css/`: Estilos visuales de la aplicación, incluyendo hojas de estilo personalizadas y los archivos de **Bootstrap**.
    * `📁 js/`: JavaScript que corre en el navegador. Se encarga de capturar los clics del usuario, modificar el DOM y hacer solicitudes asíncronas (`fetch`) hacia el backend de Node.js.
    * `📄 index.html`: La interfaz gráfica y vista principal de la red social diseñada de forma responsiva.
* `📄 package.json`: Archivo de configuración de Node.js donde se gestionan los scripts de arranque y las dependencias del proyecto (como `express`, `jsonwebtoken`, etc.).
