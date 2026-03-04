using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration, string contentRootPath)
    {
        var dataDirectory = Path.Combine(contentRootPath, "Data");
        Directory.CreateDirectory(dataDirectory);

        var databasePath = Path.Combine(dataDirectory, "app.db");
        var connectionString = $"Data Source={databasePath}";

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(connectionString));

        // Register repository implementations here in the future, for example:
        // services.AddScoped<ICustomerRepository, CustomerRepository>();

        return services;
    }
}

