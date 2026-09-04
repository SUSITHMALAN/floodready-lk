using FloodReadyLK.Domain.Entities;

namespace FloodReadyLK.Domain.Interfaces;

public interface IDistrictRepository
{
    Task<IReadOnlyList<District>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<District?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
}

public interface IFloodReportRepository
{
    Task<IReadOnlyList<FloodReport>> GetAllAsync(
        int? districtId = null,
        ReportSeverity? severity = null,
        CancellationToken cancellationToken = default);
    Task<FloodReport?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<FloodReport>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<FloodReport> AddAsync(FloodReport report, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, Guid userId, CancellationToken cancellationToken = default);
}

public interface ISafetyGuideRepository
{
    Task<IReadOnlyList<SafetyGuide>> GetAllAsync(
        string? phase = null,
        CancellationToken cancellationToken = default);
}
