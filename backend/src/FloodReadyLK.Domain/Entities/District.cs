namespace FloodReadyLK.Domain.Entities;

public sealed class District
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public RiskLevel RiskLevel { get; set; }
    public string? Recommendation { get; set; }
}
