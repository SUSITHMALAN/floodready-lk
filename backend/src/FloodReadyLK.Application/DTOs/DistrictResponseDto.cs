namespace FloodReadyLK.Application.DTOs;

public sealed class DistrictResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string RiskLevel { get; set; } = string.Empty;
    public string Recommendation { get; set; } = string.Empty;
}
