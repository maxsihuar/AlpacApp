using Core_graph_api.Models;
using Core_graph_api.Services;
using Core_graph_api.Dtos;
using Microsoft.AspNetCore.Mvc;


//Documentacion: https://learn.microsoft.com/es-es/aspnet/core/web-api/?view=aspnetcore-10.0
namespace Core_graph_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Graph_Controllers : ControllerBase
    {

        private readonly Graph_Services _graph_services;

        public Graph_Controllers(Graph_Services graph_services)
        {
            _graph_services = graph_services;
        }

        // POST: Petición interna (usualmente desde Node) para CREAR formalmente la arista en el grafo
        [HttpPost("connect_nodes")]
        public IActionResult PostConnectNodes([FromBody] FriendshipDto relation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // C# se limita a su especialidad: conectar los nodos en memoria/grafo
            _graph_services.ConnectNodes(relation.UserSourceId, relation.UserTargetId);

            return StatusCode(StatusCodes.Status201Created);
        }

        //POST: Peticiion para recibir y crear un nuevo nodo en el grafo
        [HttpPost("new_user")]
        [ProducesResponseType<Node>(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult PostAddNewUser([FromBody] Node newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _graph_services.AddNode(newUser);

            return StatusCode(StatusCodes.Status201Created);
        }

        //GET: Peticion para obtener un usuario existente
        [HttpGet("user/{Id}")]
        public ActionResult<Node> GetUser(int Id)
        {
            Node user = _graph_services.SearchUser(Id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //POST: Peticion para agregar un nuevo amigos(arista)
        [HttpPost("add_friend")]
        [ProducesResponseType<Node>(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult<Node> PostAddFriend([FromBody] int Id_user, int Id)
        {

        }

        //POST: Peticion para aceptar un nuevo amigos(arista)
        [HttpPost("accept_frien")]
        [ProducesResponseType<Node>(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult<Node> PostAcceptFriend([FromBody] int Id_user, int Id)
        {

        }
    }
}
