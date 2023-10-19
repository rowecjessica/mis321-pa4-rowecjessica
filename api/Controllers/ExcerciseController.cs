using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Model;
using pa4;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcerciseController : ControllerBase
    {
        // GET: api/Excercise
        [HttpGet]
        public List<Excercise> Get()
        {
            ExcerciseUtility utility = new ExcerciseUtility();
            return utility.GetAllExcercises();
        }



        // GET: api/Excercise/5
        [HttpGet("{id}", Name = "Get")]
        public Excercise Get(int id)
        {
            ExcerciseUtility utility = new ExcerciseUtility();
            List<Excercise> myExcercises = utility.GetAllExcercises();
            foreach(Excercise excercise in myExcercises)
            {
                if(excercise.ExceId == id)
                {
                    return excercise;
                }
            }
            return new Excercise();
        }

        // POST: api/Excercise
        [HttpPost]
        public void Post([FromBody] Excercise value)
        {    
            System.Console.WriteLine(value.Type);

        }




        // PUT: api/Excercise/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }





        // DELETE: api/Excercise/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            System.Console.WriteLine(id);
        }
    }
}
