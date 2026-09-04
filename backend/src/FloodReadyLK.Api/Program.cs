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

// --- Database (Supabase Postgres via EF Core / Npgsql) ---
var connectionString = builder.Configuration.GetConnectionString("SupabaseDb")
    ?? throw new InvalidOperationException("Missing ConnectionStrings:SupabaseDb in appsettings.json.");

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

// --- Repositories (DAOs) — implement Member 1's Domain interfaces ---
builder.Services.AddScoped<IDistrictRepository, DistrictRepository>();
builder.Services.AddScoped<IFloodReportRepository, FloodReportRepository>();
builder.Services.AddScoped<ISafetyGuideRepository, SafetyGuideRepository>();

// --- Application services (Member 1's layer, wired here) ---
builder.Services.AddScoped<IDistrictService, DistrictService>();
builder.Services.AddScoped<IFloodReportService, FloodReportService>();
builder.Services.AddScoped<ISafetyGuideService, SafetyGuideService>();
builder.Services.AddSingleton<CreateFloodReportValidator>();

// --- Auth: Supabase signs with an asymmetric ES256 key, not a shared secret.
// Fetch the public JWKS once at startup and validate tokens against it. ---
var jwksUrl = builder.Configuration["Supabase:JwksUrl"]
    ?? throw new InvalidOperationException("Missing Supabase:JwksUrl in appsettings.json.");
var issuer = builder.Configuration["Supabase:Issuer"]
    ?? throw new InvalidOperationException("Missing Supabase:Issuer in appsettings.json.");

using (var httpClient = new HttpClient())
{
    var jwksJson = await httpClient.GetStringAsync(jwksUrl);
    var jwks = new JsonWebKeySet(jwksJson);

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = jwks.Keys,
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = true,
                ValidAudience = "authenticated",
                ValidateLifetime = true,
                NameClaimType = "sub"
            };
        });
}

builder.Services.AddAuthorization();

// --- CORS: allow the React dev server / deployed frontend origin ---
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

// --- Controllers + Swagger (with a Bearer token box for testing auth) ---
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

app.Run();