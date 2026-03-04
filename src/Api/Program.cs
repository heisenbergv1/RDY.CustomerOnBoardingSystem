using Api.Middleware;
using Infrastructure;
using Infrastructure.Extensions;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAppSerilog(serviceName: "API", minimumLevel: LogEventLevel.Information);
builder.Host.UseSerilog();
builder.Services.AddHttpContextAccessor();

// Add infrastructure (EF Core + SQLite)
builder.Services.AddInfrastructure(builder.Configuration, builder.Environment.ContentRootPath);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddInfrastructureSwagger("API", "v1");

var app = builder.Build();

// Add as the first middleware after builder.Build() for APIs
app.UseMiddleware<GlobalExceptionMiddleware>();

// Ensure database is created on first run
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAppSerilog();
app.UseHttpsRedirection();

app.UseAuthorization();

app.UseInfrastructureSwagger(
    version: "v1",
    routePrefix: "swagger",
    displayName: "API v1");

app.MapControllers();

app.Run();
