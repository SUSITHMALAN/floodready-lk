namespace FloodReadyLK.Application.DTOs;

public sealed record FloodReportDto(
    Guid Id,
    Guid UserId,
    int DistrictId,
    string Location,
    string Severity,
    string? Description,
    DateTimeOffset CreatedAt);