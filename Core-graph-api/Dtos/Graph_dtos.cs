using System.ComponentModel.DataAnnotations;

namespace Core_graph_api.Dtos
{
    public class FriendshipRequestDto
    {
        [Required]
        public int SourceId { get; set; }

        [Required]
        public int TargetId { get; set; }
    }

    public class DataUserLogin
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class DataUserRegister
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}