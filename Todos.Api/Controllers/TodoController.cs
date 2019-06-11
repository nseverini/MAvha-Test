using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Todos.Bll.Models;
using Todos.Bll.Blls;

namespace Todos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        TodoBll todoBll = new TodoBll();

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> obtenerTodos()
        {
            try
            {
                return Ok(await todoBll.obtenerTodos());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // GET: api/Todo/5
        [HttpGet]
        [Route("filtrarTodos")]
        public async Task<ActionResult<Todo>> filtrarTodos(int? id, string descripcion, string estaResuelta)
        {
            try
            {
                bool? estaResueltaBooleano;

                if (estaResuelta == "null")
                    estaResueltaBooleano = null;
                else if (estaResuelta == "true")
                    estaResueltaBooleano = true;
                else
                    estaResueltaBooleano = false;

                return Ok(await todoBll.filtrarTodos(id, descripcion, estaResueltaBooleano));
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // POST: api/Todo
        [HttpPost]
        public async Task<ActionResult<Todo>> crearTodo(IFormFile archivo)
        {
            try
            {
                var todoCrearViewModel = JsonConvert.DeserializeObject<TodoCrearViewModel>(Request.Form["nuevoTodo"]);

                var nuevoTodo = new Todo
                {
                    Descripcion = todoCrearViewModel.Descripcion,
                    EstaResuelta = false
                };
                using (var memoryStream = new MemoryStream())
                {
                    await archivo.CopyToAsync(memoryStream);
                    nuevoTodo.Archivo = memoryStream.ToArray();
                }

                Todo todoCreado = await todoBll.crearTodo(nuevoTodo);
                return Ok(todoCreado);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<ActionResult> editarTodo(int id, Todo unTodo)
        {
            if (id != unTodo.Id)
            {
                return BadRequest();
            }

            try
            {
                await todoBll.editarTodo(unTodo);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

    }
}