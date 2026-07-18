using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Encodings.Web;
using System.Text.Json.Serialization;
using System.Xml;
using System.Xml.Linq;

namespace Core_graph_api.Data
{
    public class _Node
    {
        public int Id { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("contraseña")]
        public string Contraseña { get; set; } = string.Empty;


    }

    public class _Edge
    {
        public int Id { get; set; }

        [JsonPropertyName("friend")]
        public List<int> Friend {  get; set; } = new List<int>();
    }

    public class LoadData
    {
        private string pathNode;
        private string jsonNode = string.Empty;

        private string pathEdge;
        private string jsonEdge = string.Empty;

        public _Node? GetNodeById(int id)
        {
            if (!File.Exists(pathNode))
                return null;

            string jsonNode = File.ReadAllText(pathNode);

            var opciones = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            List<_Node>? list = JsonSerializer.Deserialize<List<_Node>>(jsonNode, opciones);

            return list?.FirstOrDefault(n => n.Id == id);
        }

        public LoadData()
        {
            string rutaProyecto = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "Data"));

            pathNode = Path.Combine(rutaProyecto, "data_users.json");
            pathEdge = Path.Combine(rutaProyecto, "data_friendships.json");
        }

        public void LoadNode(Action<int, string, string, string, string> Servicio)
        {
            try
            {
                if (!File.Exists(pathNode)) { Console.WriteLine($"[LoadNode] No existe el archivo en: {pathNode}"); return; }

                string jsonNode = File.ReadAllText(pathNode);
                var opciones = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                if (string.IsNullOrWhiteSpace(jsonNode) || jsonNode == "[]") return;

                List<_Node>? list = JsonSerializer.Deserialize<List<_Node>>(jsonNode, opciones);
                if (list == null) return;

                foreach (_Node u in list)
                {
                    Servicio(u.Id, u.Name, u.LastName, u.Email, u.Contraseña);
                }
                Console.WriteLine($"[LoadNode] Se cargaron {list.Count} nodos al grafo.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Error LoadNode]: {ex.Message}");
            }
        }

        public void LoadEdge(Action<int, int> Servicio)
        {
            try
            {
                if (!File.Exists(pathEdge)) { Console.WriteLine($"[LoadEdge] No existe el archivo en: {pathEdge}"); return; }

                string jsonEdge = File.ReadAllText(pathEdge);
                var opciones = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                if (string.IsNullOrWhiteSpace(jsonEdge) || jsonEdge == "[]") return;

                List<_Edge>? list = JsonSerializer.Deserialize<List<_Edge>>(jsonEdge, opciones);
                if (list == null) return;

                int contadorAristas = 0;
                foreach (_Edge u in list)
                {
                    foreach (int id in u.Friend)
                    {
                        Servicio(u.Id, id);
                        contadorAristas++;
                    }
                }
                Console.WriteLine($"[LoadEdge] Se cargaron {contadorAristas} aristas al grafo.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Error LoadEdge]: {ex.Message}");
            }
        }
    }

    public class SaveData
    {
        private readonly string pathNode;
        private readonly string pathEdge;
        private string jsonNode = string.Empty;
        private string jsonEdge = string.Empty;

        public SaveData()
        {
            string rutaProyecto = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "Data"));

            pathNode = Path.Combine(rutaProyecto, "data_users.json");
            pathEdge = Path.Combine(rutaProyecto, "data_friendships.json");
        }

        public void SaveNode(_Node n)
        {
            jsonNode = File.Exists(pathNode) ? File.ReadAllText(pathNode) : "[]";

            var opciones = new JsonSerializerOptions
            {
                    PropertyNameCaseInsensitive = true
            };

            if (string.IsNullOrWhiteSpace(jsonNode))
            {
                Console.WriteLine("¡El string JSON está vacío o no se leyó correctamente!");
                jsonNode = "[]";
            }

            List<_Node>? list = JsonSerializer.Deserialize<List<_Node>>(jsonNode, opciones);

            if (list == null) { list = new List<_Node>(); }

            list.Add(n);
            var opcionesEscritura = new JsonSerializerOptions { WriteIndented = true };
            jsonNode = JsonSerializer.Serialize(list, opcionesEscritura);


            File.WriteAllText(pathNode, jsonNode);

        }

        public void SaveEdge(_Edge n)
        {
            jsonEdge = File.Exists(pathEdge) ? File.ReadAllText(pathEdge) : "[]";

            var opciones = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            if (string.IsNullOrWhiteSpace(jsonEdge))
            {
                Console.WriteLine("¡El string JSON está vacío o no se leyó correctamente!");
                jsonEdge = "[]";
            }

            List<_Edge>? list = JsonSerializer.Deserialize<List<_Edge>>(jsonEdge, opciones);

            if (list == null) { list = new List<_Edge>(); }

            var usuarioExistente = list.FirstOrDefault(e => e.Id == n.Id);
            if (usuarioExistente == null)
            {
                // Si no existía, agregamos el objeto _Edge completo
                list.Add(n);
            }
            else
            {
                // Si ya existía, fusionamos los amigos nuevos evitando duplicados
                foreach (int amigoId in n.Friend)
                {
                    if (!usuarioExistente.Friend.Contains(amigoId))
                    {
                        usuarioExistente.Friend.Add(amigoId);
                    }
                }
            }

            var opcionesEscritura = new JsonSerializerOptions { WriteIndented = true };
            jsonEdge = JsonSerializer.Serialize(list, opcionesEscritura);

            File.WriteAllText(pathEdge, jsonEdge);

        }
    }
}
