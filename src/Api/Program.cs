using Infrastructure;
using Infrastructure.Persistence;
using Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add infrastructure (EF Core + SQLite)
builder.Services.AddInfrastructure(builder.Configuration, builder.Environment.ContentRootPath);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddInfrastructureSwagger("API", "v1");

var app = builder.Build();

// Ensure database is created on first run
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseInfrastructureSwagger(
    version: "v1",
    routePrefix: "swagger",
    displayName: "API v1");

app.MapControllers();

app.Run();
