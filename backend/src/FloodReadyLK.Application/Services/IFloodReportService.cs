using FloodReadyLK.Application.DTOs;

namespace FloodReadyLK.Application.Services;

public interface IFloodReportService
{
    Task<IReadOnlyList<FloodReportDto>> GetAllAsync(
        int? districtId = null,
        string? severity = null,
        CancellationToken cancellationToken = default);

    Task<FloodReportDto> CreateAsync(
        Guid userId,
        CreateFloodReportDto request,
        CancellationToken cancellationToken = default);
}