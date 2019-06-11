using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.IO;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Todos.Bll.Models;

namespace Todos.Bll.Blls
{
    public class TodoBll
    {
        Context.DatabaseContext _context = new Context.DatabaseContext();

        public async Task<IEnumerable<Todo>> obtenerTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task<IEnumerable<Todo>> filtrarTodos(int? id, string descripcion, bool? estaResuelta)
        {
            return await _context.Todos
            .WhereIf(id != null, x => x.Id == id)
            .WhereIf(!string.IsNullOrEmpty(descripcion), x => x.Descripcion.ToLower().StartsWith(descripcion.ToLower().Trim()))
            .WhereIf(estaResuelta != null, x => x.EstaResuelta == estaResuelta)
            .ToListAsync();
        }

        public async Task<Todo> obtenerTodo(int id)
        {
            Todo unTodo = await _context.Todos.FindAsync(id);
            return unTodo;
        }

        public async Task<Todo> crearTodo(Todo nuevoTodo)
        {
            if (esImagen(nuevoTodo.Archivo))
            {
                var contexto = new ValidationContext(nuevoTodo, serviceProvider: null, items: null);
                var resultados = new List<ValidationResult>();
                var esValido = Validator.TryValidateObject(nuevoTodo, contexto, resultados);

                if (esValido)
                {
                    _context.Todos.Add(nuevoTodo);
                    await _context.SaveChangesAsync();
                    return nuevoTodo;
                }
                else
                {
                    throw new System.ArgumentException(resultados[0].ErrorMessage);
                }
            }
            else
            {
                throw new System.ArgumentException("El archivo adjunto al Todo debe ser una imagen");
            }
        }

        public async Task editarTodo(Todo unTodo)
        {
            if (esImagen(unTodo.Archivo))
            {
                var contexto = new ValidationContext(unTodo, serviceProvider: null, items: null);
                var resultados = new List<ValidationResult>();
                var esValido = Validator.TryValidateObject(unTodo, contexto, resultados);
                if (esValido)
                {
                    _context.Entry(unTodo).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new System.ArgumentException(resultados[0].ErrorMessage);
                }
            }
            else
            {
                throw new System.ArgumentException("El archivo adjunto al Todo debe ser una imagen");
            }
        }

        public bool esImagen(byte[] data)
        {
            var esImagen = false;
            using (var imageReadStream = new MemoryStream(data))
            {
                try
                {
                    using (var posibleImagen = Image.FromStream(imageReadStream))
                    {
                    }
                    esImagen = true;
                }
                catch (Exception)
                {
                    esImagen = false;
                }
            }

            return esImagen;
        }

    }

}