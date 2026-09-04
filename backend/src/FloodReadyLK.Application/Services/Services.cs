using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Domain.Entities;
using FloodReadyLK.Domain.Interfaces;

namespace FloodReadyLK.Application.Services;

public interface IDistrictService
{
    Task<IReadOnlyList<District>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<District?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
}

public sealed class DistrictService(IDistrictRepository repository) : IDistrictService
{
    public Task<IReadOnlyList<District>> GetAllAsync(CancellationToken cancellationToken = default) =>
        repository.GetAllAsync(cancellationToken);

    public Task<District?> GetByIdAsync(int id, CancellationToken cancellationToken = default) =>
        repository.GetByIdAsync(id, cancellationToken);
}

public interface IFloodReportService
{
    Task<IReadOnlyList<FloodReport>> GetAllAsync(int? districtId, string? severity, CancellationToken cancellationToken = default);
    Task<FloodReport> CreateAsync(Guid userId, CreateFloodReportDto request, CancellationToken cancellationToken = default);
}

public sealed class FloodReportService(IFloodReportRepository repository) : IFloodReportService
{
    public Task<IReadOnlyList<FloodReport>> GetAllAsync(int? districtId, string? severity, CancellationToken cancellationToken = default)
    {
        ReportSeverity? parsedSeverity = null;
        if (!string.IsNullOrWhiteSpace(severity))
        {
            if (!Enum.TryParse<ReportSeverity>(severity, true, out var value))
            {
                throw new ArgumentException("Invalid severity.", nameof(severity));
            }

            parsedSeverity = value;
        }

        return repository.GetAllAsync(districtId, parsedSeverity, cancellationToken);
    }

    public Task<FloodReport> CreateAsync(Guid userId, CreateFloodReportDto request, CancellationToken cancellationToken = default)
    {
        if (!Enum.TryParse<ReportSeverity>(request.Severity, true, out var severity))
        {
            throw new ArgumentException("Invalid severity.", nameof(request));
        }

        var report = new FloodReport
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            DistrictId = request.DistrictId,
            Location = request.Location.Trim(),
            Severity = severity,
            Description = request.Description.Trim(),
            CreatedAt = DateTimeOffset.UtcNow
        };

        return repository.AddAsync(report, cancellationToken);
    }
}

public interface ISafetyGuideService
{
    Task<IReadOnlyList<SafetyGuide>> GetAllAsync(string? phase = null, CancellationToken cancellationToken = default);
}

public sealed class SafetyGuideService(ISafetyGuideRepository repository) : ISafetyGuideService
{
    public Task<IReadOnlyList<SafetyGuide>> GetAllAsync(string? phase = null, CancellationToken cancellationToken = default) =>
        repository.GetAllAsync(phase, cancellationToken);
}
