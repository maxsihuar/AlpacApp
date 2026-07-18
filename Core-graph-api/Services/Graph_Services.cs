using Core_graph_api.Data;
using Core_graph_api.Models;
using System;
using System.Collections.Generic;
using System.Text;
namespace Core_graph_api.Services
{
    public class Graph_Services
    {
        private readonly Graph _graph;
        private readonly SaveData _data;
        private List<FriendRequest> _friendRequests;
        private readonly LoadData _loadData;
        public Graph_Services(Graph graph) 
        {
            _graph = graph;
            _data = new SaveData();
            _friendRequests = new List<FriendRequest>();
            _loadData = new LoadData();
        }
        public bool SendFriendRequest(int sourceId, int targetId)
        {
            Console.WriteLine($"Solicitud recibida: {sourceId} -> {targetId}");

            if (_loadData.GetNodeById(sourceId) == null ||
                _loadData.GetNodeById(targetId) == null)
            {
                Console.WriteLine("Uno de los usuarios no existe.");
                return false;
            }

            if (sourceId == targetId)
            {
                Console.WriteLine("No puedes enviarte una solicitud a ti mismo.");
                return false;
            }

            bool existe = _friendRequests.Any(r =>
                r.SourceId == sourceId &&
                r.TargetId == targetId);

            if (existe)
            {
                Console.WriteLine("La solicitud ya existe.");
                return false;
            }

            _friendRequests.Add(new FriendRequest(sourceId, targetId));

            Console.WriteLine($"Solicitud agregada. Total: {_friendRequests.Count}");

            return true;
        }
        public List<Node> GetFriendRequests(int targetId)
        {
            List<Node> requests = new List<Node>();

            foreach (FriendRequest fr in _friendRequests)
            {
                if (fr.TargetId == targetId)
                {
                    Node? user = _graph.GetNode(fr.SourceId);

                    if (user != null)
                    {
                        requests.Add(user);
                    }
                }
            }

            return requests;
        }
        public bool AcceptFriendRequest(int sourceId, int targetId)
        {
            FriendRequest? request = _friendRequests.FirstOrDefault(fr =>
                fr.SourceId == sourceId &&
                fr.TargetId == targetId);

            if (request == null)
                return false;

            Add_Edge(sourceId, targetId);
            Add_Edge(targetId, sourceId);

            _friendRequests.Remove(request);

            return true;
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

        public List<Node>? Search_UserbyName(string name)
        {
            return _graph.GetNodebyName(name);
        }

        public Edge Add_Edge(int sourceId, int targetId)
        {
 

            Node? sourceNode = _graph.GetNode(sourceId);
            Node? targetNode = _graph.GetNode(targetId);

          

            if (sourceNode == null || targetNode == null)
            {
                Console.WriteLine("Está ingresándose mal el nodo");
               
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

        public List<Node> BFS_Graph(int startId)
        {
            Queue<(int id, int nivel)> cola = new Queue<(int, int)>();
            HashSet<int> visitados = new HashSet<int>();
            List<Node> recorrido = new List<Node>();

            cola.Enqueue((startId, 0));
            visitados.Add(startId);

            while (cola.Count > 0)
            {
                var (actual, nivel) = cola.Dequeue();

                // Solo agregamos los nodos del segundo nivel
                if (nivel == 2)
                {
                    Node? nodo = _graph.GetNode(actual);

                    if (nodo != null)
                    {
                        recorrido.Add(nodo);
                    }

                    continue;
                }

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

        public Dictionary<string, List<string>>? BFS_Graph_all(int startId)
        {
            Queue<int> cola = new Queue<int>();
            HashSet<int> visitados = new HashSet<int>();
            Dictionary<string, List<string>> recorrido = new Dictionary<string, List<string>>();

            // El nodo inicial está en el nivel 0
            cola.Enqueue(startId);
            visitados.Add(startId);

            while (cola.Count > 0)
            {
                var actual = cola.Dequeue();
                Node? nodoActual = _graph.GetNode(actual);
                if (nodoActual == null || string.IsNullOrEmpty(nodoActual.Name))
                {
                    continue;
                }

                if (!recorrido.ContainsKey(nodoActual.Name))
                {
                    recorrido[nodoActual.Name] = new List<string>();
                }

                List<Node> vecinos = _graph.GetNeighbors(actual);
                if (vecinos == null) continue;

                foreach (Node vecino in vecinos)
                {
                    if (!visitados.Contains(vecino.Id))
                    {
                        recorrido[nodoActual.Name].Add(vecino.Name);
                        visitados.Add(vecino.Id);
                        cola.Enqueue(vecino.Id);
                    }
                }
            }
            return recorrido;
        }
    }
}
