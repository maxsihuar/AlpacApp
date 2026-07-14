namespace Core_graph_api.Models
{
    public class Node
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Contraseña { get; set; }

        public Node(int id, string name, string contraseña)
        {
            Id = id;
            Name = name;
            Contraseña = contraseña;
        }
    }
}
