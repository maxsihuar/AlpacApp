using System.ComponentModel.DataAnnotations;

namespace Core_graph_api.Dtos
{
    // Core-graph-api/Dtos/FriendshipRequestDto.cs
    namespace Core_graph_api.Dtos
    {
        public class FriendshipRequestDto
        {
            [Required]
            public int SourceId { get; set; }
            [Required] // Obligatorio
            public int TargetId { get; set; }
        }
    }
}
