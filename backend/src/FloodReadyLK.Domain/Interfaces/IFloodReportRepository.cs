using FloodReadyLK.Domain.Entities;

namespace FloodReadyLK.Domain.Interfaces;

public interface IFloodReportRepository
{
    Task<IReadOnlyList<FloodReport>> GetAllAsync(
        int? districtId = null,
        ReportSeverity? severity = null,
        CancellationToken cancellationToken = default);

    Task<FloodReport> AddAsync(FloodReport report, CancellationToken cancellationToken = default);
}