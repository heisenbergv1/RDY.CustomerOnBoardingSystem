using System.Text;
using Microsoft.AspNetCore.Http;
using Serilog.Context;

namespace Infrastructure.Middleware;

public sealed class SerilogRequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private const int MaxBodyLength = 10_000; // 10 KB safety cap

    public SerilogRequestLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        // Request basics
        var request = context.Request;

        var method = request.Method;
        var path = request.Path.Value;
        var queryString = request.QueryString.Value;
        var ipAddress = context.Connection.RemoteIpAddress?.ToString();
        var userAgent = request.Headers["User-Agent"].ToString();

        // Headers (selective example)
        var headers = request.Headers
            .Where(h => !h.Key.Equals("Authorization", StringComparison.OrdinalIgnoreCase))
            .ToDictionary(h => h.Key, h => h.Value.ToString());

        // Body (safe read)
        string? body = null;

        if (request.ContentLength > 0 &&
            request.ContentType?.Contains("application/json") == true)
        {
            request.EnableBuffering();

            using var reader = new StreamReader(
                request.Body,
                Encoding.UTF8,
                detectEncodingFromByteOrderMarks: false,
                leaveOpen: true);

            body = await reader.ReadToEndAsync();

            if (body.Length > MaxBodyLength)
                body = body[..MaxBodyLength] + "…(truncated)";

            request.Body.Position = 0;
        }

        // Push everything into Serilog context
        using (LogContext.PushProperty("HttpMethod", method))
        using (LogContext.PushProperty("Path", path))
        using (LogContext.PushProperty("QueryString", queryString))
        using (LogContext.PushProperty("ClientIP", ipAddress))
        using (LogContext.PushProperty("UserAgent", userAgent))
        using (LogContext.PushProperty("Headers", headers, destructureObjects: true))
        using (LogContext.PushProperty("Middleware_RequestBody", body))
        {
            await _next(context);
        }
    }
}