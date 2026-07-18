namespace Core_graph_api.Models
{
    public class FriendRequest
    {
        public int SourceId { get; set; }
        public int TargetId { get; set; }

        public FriendRequest(int sourceId, int targetId)
        {
            SourceId = sourceId;
            TargetId = targetId;
        }
    }
}
