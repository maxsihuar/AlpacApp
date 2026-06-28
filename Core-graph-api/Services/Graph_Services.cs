using Core_graph_api.Models;
namespace Core_graph_api.Services
{
    public class Graph_Services
    {
        private readonly Graph _graph;

        public Graph_Services(Graph graph) 
        {
            _graph = graph;
        }

        public List<Node> BFS_Graph(int startId)
        {
            Queue<int> cola = new Queue<int>();
            HashSet<int> visitados = new HashSet<int>();
            List<Node> recorrido = new List<Node>();

            cola.Enqueue(startId);
            visitados.Add(startId);

            while (cola.Count > 0)
            {
                int actual = cola.Dequeue();

                recorrido.Add(_graph.GetNode(actual));

                foreach (Node vecino in _graph.GetNeighbors(actual))
                {
                    if (!visitados.Contains(vecino.Id))
                    {
                        visitados.Add(vecino.Id);
                        cola.Enqueue(vecino.Id);
                    }
                }
            }

            return recorrido;
        }
    }
}
