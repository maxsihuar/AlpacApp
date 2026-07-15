namespace Core_graph_api.Models
{
    public class Node
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string LastName { get; set; }
        public string Email { get; set; }


        public string Contraseña { get; set; }

        public Node(int id, string name, string last, string email,string contraseña)
        {
            Id = id;
            Name = name;
            LastName = last;
            Email = email;
            Contraseña = contraseña;
        }
    }
}
