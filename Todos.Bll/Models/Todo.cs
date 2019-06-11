using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore;
using Newtonsoft.Json;

namespace Todos.Bll.Models
{
    public class Todo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "La descripcion es requerida")]
        [JsonProperty(PropertyName = "descripcion")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "El estado es requerido")]
        [JsonProperty(PropertyName = "estaResuelta")]
        public bool EstaResuelta { get; set; }

        [Required(ErrorMessage = "El archivo es requerido")]
        [JsonProperty(PropertyName = "archivo")]
        public byte[] Archivo { get; set; }
    }

}