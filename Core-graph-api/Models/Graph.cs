namespace Core_graph_api.Models
{
    public class Graph
    {
        // Ahora la clave es el ID del usuario origen, 
        // y el valor es la lista de ARISTAS (Edges) que salen de él.
        private Dictionary<int, List<Edge>> adjacencyList;

        public Graph()
        {
            adjacencyList = new Dictionary<int, List<Edge>>();
        }

        // 1. Agregar un usuario (Nodo) al grafo
        public void AddNode(Node node)
        {
            if (!adjacencyList.ContainsKey(node.Id))
            {
                adjacencyList[node.Id] = new List<Edge>();
            }
        }

        // 2. Crear una relación direccionada usando la clase Edge de verdad
        public void AddEdge(Node sourceNode, Node targetNode)
        {
            if (adjacencyList.ContainsKey(sourceNode.Id))
            {
                // Verificamos si ya existe esta arista para no duplicarla
                bool exists = adjacencyList[sourceNode.Id].Any(edge => edge.Target.Id == targetNode.Id);

                if (!exists)
                {
                    // Instanciamos el objeto Edge físicamente
                    Edge newEdge = new Edge(sourceNode, targetNode);

                    // Lo guardamos en la lista del nodo origen
                    adjacencyList[sourceNode.Id].Add(newEdge);
                }
                
            }
        }

        // 3. Método auxiliar para obtener los "vecinos" (amigos a los que apunta)
        public List<Node> GetNeighbors(int userId)
        {
            if (!adjacencyList.ContainsKey(userId)) return new List<Node>();

            // Transformamos la lista de Edges en una lista de Nodes (los destinos)
            return adjacencyList[userId].Select(edge => edge.Target).ToList();
        }
        public Node? GetNode(int userId)
        {
            if (!adjacencyList.ContainsKey(userId)) return null;
            

            Edge? uwu = adjacencyList[userId].FirstOrDefault();

            if (uwu == null) return null;

            return uwu.Source;

        }
        public Node? GetNodebyUser(string email, string pass)
        {
            foreach(List<Edge> l in adjacencyList.Values)
            {
                if (l[0].Source.Email == email && l[0].Source.Contraseña == pass)
                {
                    return l[0].Source;
                }
            }
            return null;
        }

        public List<Node> GetFriends(int id)
        {
            List<Node> list = new List<Node>();

            foreach(Edge e in adjacencyList[id])
            {
                list.Add(e.Target);
            }
            return list;
        }

    } 

}
