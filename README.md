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
├── CoreGraphApi/             # [C# / .NET] Backend del Grafo
│   ├── Controllers/          # Endpoints para algoritmos (Recomendaciones, Caminos)
│   ├── Models/               # Estructuras del Grafo (Node, Edge, DirectedGraph)
│   ├── Services/             # Lógica matemática y algoritmos (BFS, DFS)
│   └── Program.cs
│
└── UserBackend/              # [Node.js / Express] Backend de Usuario y Frontend
    ├── src/
    │   ├── controllers/      # Gestión de sesiones, login, registro
    │   ├── middlewares/      # Autenticación (JWT) y validaciones
    │   └── app.js            # Servidor Express principal (Promesas/Callbacks)
    ├── public/               # Frontend de la aplicación
    │   ├── css/              # Estilos personalizados y Bootstrap
    │   ├── js/               # Lógica del cliente e interacción asíncrona (Fetch)
    │   └── index.html        # Vista principal de la Red Social
    └── package.json
