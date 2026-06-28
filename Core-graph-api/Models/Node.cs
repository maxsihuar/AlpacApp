namespace Core_graph_api.Models
{
    public class Node
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Node(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
