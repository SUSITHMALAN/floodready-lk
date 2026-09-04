namespace FloodReadyLK.Application.DTOs;

public sealed record CreateFloodReportDto(
    int DistrictId,
    string Location,
    string Severity,
    string? Description);