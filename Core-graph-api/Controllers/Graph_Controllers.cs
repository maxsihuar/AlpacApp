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

        //POST: Peticiion para recibir y crear un nuevo nodo en el grafo
        [HttpPost("new_user")]
        [ProducesResponseType<Node>(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult PostAddNewUser([FromBody] DataUserRegister newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            int id = _graph_services.Add_User(newUser.Name, newUser.LastName, newUser.Email, newUser.Password);

            var id_json = new { ID = id };

            return StatusCode(StatusCodes.Status201Created, id_json);
        }

        //POst: Peticion para validar un usuario existente en el grafo
        [HttpPost("validate_user")]
        [ProducesResponseType<Node>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult PostValidateUser([FromBody] DataUserLogin user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Tuple<bool, int> flag = _graph_services.ValidarEdge(user.Email, user.Password);
            if (flag.Item1 == false)
            {
                // 401 Unauthorized es el código estándar para credenciales incorrectas
                return Unauthorized(new { message = "Usuario o contraseña incorrectos." });
            }
            return Ok(new {estado = flag.Item1, id = flag.Item2});
        }

        //GET: Peticion para obtener un usuario existente
        [HttpGet("user/{Id}")]
        public ActionResult<Node> GetUser(int Id)
        {
            Node? user = _graph_services.Search_User(Id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //GET: Peticion para obtener todos los amigos de un usuario existente
        [HttpGet("friends/{Id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<Node>> GetFriends(int id)
        {
            List<Node> friends = _graph_services.Get_Friends(id);
            if (friends == null || friends.Count == 0)
            {
                return NotFound();
            }
            return Ok(friends);
        }

        //POST: Peticion para agregar un nuevo amigos(arista)
        [HttpPost("add_friend")]
        [ProducesResponseType<Node>(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult PostAddFriend([FromBody] FriendshipRequestDto dt)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            _graph_services.Add_Edge(dt.SourceId, dt.TargetId);
            return StatusCode(StatusCodes.Status201Created);
        }

        //POST: Peticion para aceptar un nuevo amigos(arista)
        [HttpPost("accept_frien")]
        [ProducesResponseType<Node>(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult PostAcceptFriend([FromBody] FriendshipRequestDto dt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _graph_services.Add_Edge(dt.SourceId, dt.TargetId);
            return StatusCode(StatusCodes.Status201Created);
        }
    }
}
