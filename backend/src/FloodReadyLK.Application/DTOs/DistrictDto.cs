namespace FloodReadyLK.Application.DTOs;

public sealed record DistrictDto(
    int Id,
    string Name,
    string RiskLevel,
    string? Recommendation);