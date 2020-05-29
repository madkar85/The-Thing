using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiracleMileAPI.Model;
using Newtonsoft.Json;

namespace MiracleMileAPI.Controllers
{
    [Route("miraclemile")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IWebHostEnvironment _hostingEnvironment;

 
        public UserController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
           
        }

        // GET: api/User
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody] Register register)
        {
            if(register.Email != null && register.Password != null)
            {
                var newId = Guid.NewGuid().GetHashCode();
                var user = new User
                {
                    Id = newId,
                    Email = register.Email,
                    Password = register.Password,
                    AgreeMarketing = true,
                    ReceiveNotificationsByMail = true
                };

                List<User> jsonList = getUsers();

                jsonList.Add(user);
                //write string to file

                var jsonData = JsonConvert.SerializeObject(jsonList);
                var contentRootPath = _hostingEnvironment.ContentRootPath;
                var file = $@"{contentRootPath}/JsonDB/User.json";
                System.IO.File.WriteAllText(file, jsonData);
                return Ok(register);

            }
            else
            {

                return BadRequest(new ResponseMessage{Error = true, Code = "1" , Message = "objektet som tagits emot är tom" });
            }

            
        }

        private List<User> getUsers()
        {
            var contentRootPath = _hostingEnvironment.ContentRootPath;
            var file = $@"{contentRootPath}/JsonDB/User.json";
            var userList = System.IO.File.ReadAllText(file);
            List<User> jsonObject = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(userList);
            return jsonObject;
        }


        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
