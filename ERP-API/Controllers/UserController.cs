using ERP_API.Models.Request;
using ERP_API.Models.Response;
using ERP_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ERP_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] AuthRequest model)
        {
            Respuesta respuesta = new Respuesta();
            var userResponse = _userService.Auth(model);

            if(userResponse == null)
            {
                respuesta.Exito = 0;
                respuesta.Mensaje = "User or password incorrect!";
                return BadRequest(respuesta);
            }
            respuesta.Exito=1; 
            respuesta.Data = userResponse;

            return Ok(respuesta);
        }
    }
}