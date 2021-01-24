using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiracleMileAPI.Model;

namespace MiracleMileAPI.Controllers
{
    [Route("miraclemile")]
    [ApiController]
    public class AnimalController : ControllerBase
    {
        // GET: api/Animal
        [HttpGet("getAnimalTypes")]
        public IEnumerable<string> GetAnimalTypes()
        {
         
            List<AnimalType> animalList = new List<AnimalType>();

            animalList.Add(new AnimalType() { Type = "Hund"});

            animalList.Add(new AnimalType() { Type = "Cat" });

            List<string> animalTypeList = new List<string>();


            foreach (AnimalType animal in animalList)
            {
                animalTypeList.Add(animal.Type);
            }

            return animalTypeList;
        }

        // GET: api/Animal/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Animal
        [HttpPost("getdog")]
        public void Post([FromBody] DogInfo value)
        {
           var test = value;
        }

        // PUT: api/Animal/5
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
