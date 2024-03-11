using Microsoft.AspNetCore.Mvc;
using Toasted.Api;
using Toasted.Data;
using Newtonsoft.Json;
using Toasted.Data;

namespace Toasted.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IRepository _repo;

        public UserController(IRepository repo, ILogger<UserController> logger)
        {
            this._logger = logger;
            this._repo = repo;
        }

        [HttpGet("/api/users")] //returns USER by username
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _repo.GetAllUsersAsync();
        }

        [HttpPost("/api/user")] //adds a user
        public async Task<ActionResult<User>> AddUserAsync([FromQuery] string username, [FromQuery] string password, [FromQuery] string firstName, [FromQuery] string lastName, [FromQuery] string email, [FromQuery] string location)
        {
            var loc = JsonConvert.DeserializeObject<Location>(location);

            User user = new User(username, password, firstName, lastName, 0, email, JsonConvert.SerializeObject(loc, Formatting.None));
            bool result = await _repo.AddUserAsync(user);
            if (result)
            {
                return Ok(await _repo.GetUserAsync(username));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("/api/user/{username}")] //returns USER by username
        public async Task<ActionResult<User>> GetUserAsync(string username)
        {
            User user = await _repo.GetUserAsync(username);
            
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("/api/user/login")] //returns USER by username
        public async Task<ActionResult<User>> LoginAsync([FromQuery] string username, [FromQuery] string password)
        {
            User user = await _repo.LoginAsync(username, password);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }





    }
}
