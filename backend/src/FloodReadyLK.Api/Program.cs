using FloodReadyLK.Api.Middleware;
using FloodReadyLK.Application.Services;
using FloodReadyLK.Application.Validators;
using FloodReadyLK.Domain.Interfaces;
using FloodReadyLK.Infrastructure.Persistence;
using FloodReadyLK.Infrastructure.Persistence.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// --- Database Configuration (PostgreSQL / Supabase with InMemory Fallback) ---
var connectionString = builder.Configuration.GetConnectionString("SupabaseDb");
bool isPlaceholderDb = string.IsNullOrWhiteSpace(connectionString) || connectionString.Contains("YOUR_PROJECT_REF");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (isPlaceholderDb)
    {
        options.UseInMemoryDatabase("FloodReadyLK_InMemoryDb");
    }
    else
    {
        options.UseNpgsql(connectionString);
    }
});

// --- Repositories & Application Services ---
builder.Services.AddScoped<IDistrictRepository, DistrictRepository>();
builder.Services.AddScoped<IFloodReportRepository, FloodReportRepository>();
builder.Services.AddScoped<ISafetyGuideRepository, SafetyGuideRepository>();

builder.Services.AddScoped<IDistrictService, DistrictService>();
builder.Services.AddScoped<IFloodReportService, FloodReportService>();
builder.Services.AddScoped<ISafetyGuideService, SafetyGuideService>();
builder.Services.AddSingleton<CreateFloodReportValidator>();

// --- Auth Setup (Supabase Asymmetric JWT with JWKS validation & fallback) ---
var jwksUrl = builder.Configuration["Supabase:JwksUrl"] ?? "https://apxnoqlkyuyyeilnsray.supabase.co/auth/v1/.well-known/jwks.json";
var issuer = builder.Configuration["Supabase:Issuer"] ?? "https://apxnoqlkyuyyeilnsray.supabase.co/auth/v1";

SecurityKey[]? signingKeys = null;
try
{
    using var httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(5) };
    var jwksJson = await httpClient.GetStringAsync(jwksUrl);
    var jwks = new JsonWebKeySet(jwksJson);
    signingKeys = jwks.Keys.ToArray();
}
catch (Exception ex)
{
    Console.WriteLine($"[Warning] Could not fetch Supabase JWKS from {jwksUrl} at startup: {ex.Message}");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = issuer;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = signingKeys is { Length: > 0 },
            IssuerSigningKeys = signingKeys,
            ValidateIssuer = true,
            ValidIssuer = issuer,
            ValidateAudience = true,
            ValidAudience = "authenticated",
            ValidateLifetime = true,
            NameClaimType = "sub"
        };
    });

builder.Services.AddAuthorization();

// --- CORS Configuration ---
const string CorsPolicy = "AllowFrontend";
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? ["http://localhost:5173"];

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// --- Controllers & Swagger ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "FloodReadyLK API", Version = "v1" });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Paste: Bearer {your Supabase access token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// --- Seed Database ---
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DbInitializer.SeedAsync(dbContext);
}

// --- Middleware Pipeline ---
app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(CorsPolicy);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();

public partial class Program { }