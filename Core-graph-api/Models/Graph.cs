namespace Core_graph_api.Models
{
    public class Graph
    {
        // Diccionario: ID de Usuario -> Lista de usuarios a los que envió solicitud/sigue
        private Dictionary<int, List<Node>> adjacencyList;

        public Graph()
        {
            adjacencyList = new Dictionary<int, List<Node>>();
        }

        // 1. Agregar un usuario al sistema
        public void AddNode(Node node)
        {
            if (!adjacencyList.ContainsKey(node.Id))
            {
                adjacencyList[node.Id] = new List<Node>();
            }
        }

        // 2. Crear una relación direccionada (Enviar solicitud de amistad)
        public void AddEdge(int sourceId, Node targetNode)
        {
            if (adjacencyList.ContainsKey(sourceId))
            {
                // Evitamos duplicar la arista de ida
                if (!adjacencyList[sourceId].Exists(n => n.Id == targetNode.Id))
                {
                    adjacencyList[sourceId].Add(targetNode);
                }
            }
        }
    }
}
