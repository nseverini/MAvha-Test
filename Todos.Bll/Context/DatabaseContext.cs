using Todos.Bll.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Todos.Bll.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base() { }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-0PCUUSP\\SQLEXPRESS;database=Todos;trusted_connection=true;");
        }

    }

}