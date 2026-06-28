using Core_graph_api.Models;
using Microsoft.AspNetCore.Mvc;


//Documentacion: https://learn.microsoft.com/es-es/aspnet/core/web-api/?view=aspnetcore-10.0
namespace Core_graph_api.Controllers
{
    [ApiController]
    [Route("api/graph")]
    public class Controller_Graph : ControllerBase
    {
        private readonly Graph _graph;

        public Controller_Graph(Graph graph)
        {
            _graph = graph;
        }

        [HttpPost]
        [ProducesResponseType<Node>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult PostAddNewUser([FromBody] Node nodo)
        {
            return CreatedAtAction("GetUser", new {Id });
        }

    }
}
