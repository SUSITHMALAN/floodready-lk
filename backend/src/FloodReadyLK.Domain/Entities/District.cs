namespace FloodReadyLK.Domain.Entities;

public sealed class District
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DistrictRiskLevel RiskLevel { get; set; }
    public string Recommendation { get; set; } = string.Empty;
}

public enum DistrictRiskLevel
{
    Low,
    Moderate,
    High,
    Severe
}
