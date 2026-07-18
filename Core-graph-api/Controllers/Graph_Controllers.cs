using Core_graph_api.Dtos;
using Core_graph_api.Models;
using Core_graph_api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


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
        //POST: Solicitudes
        [HttpPost("accept_friend_request")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AcceptFriendRequest([FromBody] FriendshipRequestDto dt)
        {
            bool aceptada = _graph_services.AcceptFriendRequest(dt.SourceId, dt.TargetId);

            if (!aceptada)
            {
                return BadRequest("No se pudo aceptar la solicitud.");
            }

            return Ok("Solicitud aceptada correctamente.");
        }

        [HttpGet("friend_requests/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetFriendRequests(int id)
        {
            return Ok(_graph_services.GetFriendRequests(id));
        }

        [HttpPost("send_friend_request")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult SendFriendRequest([FromBody] FriendshipRequestDto dt)
        {
            bool enviado = _graph_services.SendFriendRequest(dt.SourceId, dt.TargetId);
            if (!enviado)
            {
                return BadRequest("No se pudo enviar la solicitud");
            }
            return Ok("solicitud enviada correctamente");
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

        [HttpPost("search_user")]
        [ProducesResponseType<List<Node>>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult PostDataUser([FromBody]  UserSearchRequest nombre)
        {
            if (!ModelState.IsValid || nombre == null || string.IsNullOrWhiteSpace(nombre.Nombre))
            {
                return BadRequest("El nombre es requerido.");
            }
            List<Node>? usuarios = _graph_services.Search_UserbyName(nombre.Nombre);
            if (usuarios == null || !usuarios.Any())
            {
                return NotFound();
            }
            return Ok(usuarios);
        }

        //GET: Peticion para obtener un usuario existente
        [HttpGet("user/{Id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

        [HttpGet("graph/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Dictionary<string, List<string>>> GetGraph(int id)
        {
            Dictionary<string, List<string>> graph = _graph_services.BFS_Graph_all(id);
            if (graph == null)
            {
                return NotFound();
            }
            return Ok(graph);
        }

        // GET: Obtener sugerencias de amistad
        [HttpGet("suggested_friends/{id}")]
        public ActionResult<List<Node>> GetSuggestedFriends(int id)
        {
            List<Node> sugerencias = _graph_services.BFS_Graph(id);

            return Ok(sugerencias);
        }
    }
}
