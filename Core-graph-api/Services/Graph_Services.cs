using System.Text;
using System;
using Core_graph_api.Models;
using Core_graph_api.Data;
namespace Core_graph_api.Services
{
    public class Graph_Services
    {
        private readonly Graph _graph;
        private readonly SaveData _data;

        public Graph_Services(Graph graph) 
        {
            _graph = graph;
            _data = new SaveData();
        }
        private int UniqueHash(string texto)
        {
            if (string.IsNullOrEmpty(texto)) return 0;

            unchecked
            {
                int hash = 23; // Semilla fija inicial
                foreach (char c in texto.ToLower().Trim()) 
                {
                    hash = (hash * 31) + c;
                }
                return Math.Abs(hash); // Retornamos siempre el número en positivo
            }
        }

        public void Load_Node(int id, string name, string lastname, string email, string password)
        {
            _graph.AddNode(new Node(id, name, lastname, email, password));
            _graph.AddEdge(new Node(id, name, lastname, email, password), new Node(id, name, lastname, email, password));
        }
        public void Load_Edge(int id,int id_friend)
        {
            Node? user = _graph.GetNode(id);
            Node? friend = _graph.GetNode(id_friend);
            _graph.AddEdge(user, friend);
        }

        public int Add_User(string name, string lastname, string email, string password)
        {
            Node uwu = new Node(UniqueHash(name+email), name, lastname, email, password);
            _graph.AddNode(uwu);
            _graph.AddEdge(uwu, uwu); // Agregar una arista desde el nodo hacia sí mismo

            _data.SaveNode(new Data._Node { Id = uwu.Id, Name = uwu.Name, LastName =  uwu.LastName, Email = uwu.Email, Contraseña =  uwu.Contraseña });
            _data.SaveEdge(new Data._Edge { Id = uwu.Id, Friend = new List<int> { uwu.Id } });
            return uwu.Id;
        }
        public Node? Search_User(int starrId)
        {
            return _graph.GetNode(starrId);
        }
        public Edge Add_Edge(int sourceId, int targetId)
        {
            Node? sourceNode = _graph.GetNode(sourceId);
            Node? targetNode = _graph.GetNode(targetId);
            if (sourceNode == null || targetNode == null)
            {
                Console.WriteLine("Esta ingresandose mal el nodo");
            }
            _graph.AddEdge(sourceNode, targetNode);
            _data.SaveEdge(new Data._Edge { Id = sourceId, Friend = new List<int> { targetId } });
            return new Edge(sourceNode, targetNode);
        }

        public Tuple<bool, int> ValidarEdge(string email, string password)
        {
            Node? u = _graph.GetNodebyUser(email, password);

            if(u != null) { return new Tuple<bool, int> (true, u.Id);
            }
            return new Tuple<bool, int>(false, 0);
        }

        public List<Node> Get_Friends(int id)
        {
            List<Node> friends = _graph.GetFriends(id);

            return friends;
        }

        public List<Node?> BFS_Graph(int startId)
        {
            Queue<(int id, int nivel)> cola = new Queue<(int, int)>();
            HashSet<int> visitados = new HashSet<int>();
            List<Node?> recorrido = new List<Node?>();

            // El nodo inicial está en el nivel 0
            cola.Enqueue((startId, 0));
            visitados.Add(startId);

            while (cola.Count > 0)
            {
                var (actual, nivel) = cola.Dequeue();

                recorrido.Add(_graph.GetNode(actual));

                // Si ya estamos en el segundo nivel, no seguimos expandiendo
                if (nivel == 2)
                    continue;

                List<Node> vecinos = _graph.GetNeighbors(actual);

                foreach (Node vecino in vecinos)
                {
                    if (!visitados.Contains(vecino.Id))
                    {
                        visitados.Add(vecino.Id);
                        cola.Enqueue((vecino.Id, nivel + 1));
                    }
                }
            }
            return recorrido;
        }
    }
}
