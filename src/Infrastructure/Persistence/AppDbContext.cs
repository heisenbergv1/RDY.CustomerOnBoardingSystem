using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Add DbSet<TEntity> properties here as your domain model grows, for example:
    public DbSet<Customer> Customers { get; set; } = null!;
}

