using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

public class TodoCrearViewModel
{
    public int Id { get; set; }
    [Required]
    [JsonProperty(PropertyName = "descripcion")]
    public string Descripcion { get; set; }
}