namespace FloodReadyLK.Infrastructure.Auth;

public sealed class SupabaseJwtOptions
{
    public const string SectionName = "Supabase";

    public string JwtSecret { get; set; } = string.Empty;
}