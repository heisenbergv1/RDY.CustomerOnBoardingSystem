using Infrastructure.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;

namespace Infrastructure.Extensions;

/// <summary>
/// Middleware & logging helpers for Serilog in ASP.NET Core apps.
/// </summary>
public static class SerilogApplicationBuilderExtensions
{
    /// <summary>
    /// Configures Serilog logger and adds request logging middleware with enriched context.
    /// Intended to be called early in Program.cs before app.Run().
    /// </summary>
    /// <param name="app">Application builder.</param>
    /// <param name="logDirectory">Directory to store log files (default "Logs").</param>
    /// <param name="retainedFileCountLimit">Number of daily log files to keep (default 30).</param>
    /// <returns>The application builder for chaining.</returns>
    public static IApplicationBuilder UseAppSerilog(
        this IApplicationBuilder app)
    {
        //app.UseSerilogRequestLogging(options =>
        //{
        //    options.MessageTemplate = "[CUSTOM][HTTP] {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";

        //    options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
        //    {
        //        diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
        //        diagnosticContext.Set("RequestPath", httpContext.Request.Path);
        //        diagnosticContext.Set("RequestQueryString", httpContext.Request.QueryString.Value);

        //        if (httpContext.Connection.RemoteIpAddress != null)
        //        {
        //            diagnosticContext.Set(
        //                "ClientIP",
        //                httpContext.Connection.RemoteIpAddress.ToString());
        //        }

        //        diagnosticContext.Set(
        //            "UserAgent",
        //            httpContext.Request.Headers["User-Agent"].ToString());
        //    };
        //});

        // Request body can be added in the log here:
        app.UseMiddleware<SerilogRequestLoggingMiddleware>();

        return app;
    }

    /// <summary>
    /// Configures Serilog with console and rolling file sinks.
    /// Separates logs into different files per level (Info, Warning, Error).
    /// </summary>
    public static IServiceCollection AddAppSerilog(
        this IServiceCollection services,
        string serviceName,
        string logDirectory = "Logs",
        LogEventLevel minimumLevel = LogEventLevel.Debug,
        int retainedFileCountLimit = 30)
    {
        if (string.IsNullOrWhiteSpace(serviceName))
            throw new ArgumentException("Service name must be provided.", nameof(serviceName));

        Directory.CreateDirectory(logDirectory);

        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Is(minimumLevel)
            .Enrich.FromLogContext()
            .Enrich.WithProperty("Service", serviceName)
            .WriteTo.Console()
            // Main service log (all levels)
            .WriteTo.File(
                path: $"{logDirectory}/{serviceName}_.log",
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: retainedFileCountLimit,
                outputTemplate:
                    "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
            // Info logs only
            .WriteTo.File(
                path: $"{logDirectory}/{serviceName}_Info_.log",
                restrictedToMinimumLevel: LogEventLevel.Information,
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: retainedFileCountLimit,
                outputTemplate:
                    "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
            // Warning logs only
            .WriteTo.File(
                path: $"{logDirectory}/{serviceName}_Warning_.log",
                restrictedToMinimumLevel: LogEventLevel.Warning,
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: retainedFileCountLimit,
                outputTemplate:
                    "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
            // Error and Fatal logs only
            .WriteTo.File(
                path: $"{logDirectory}/{serviceName}_Error_.log",
                restrictedToMinimumLevel: LogEventLevel.Error,
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: retainedFileCountLimit,
                outputTemplate:
                    "{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
            .CreateLogger();

        services.AddLogging(builder =>
        {
            builder.ClearProviders();
            builder.AddSerilog(dispose: true);
        });

        return services;
    }
}
