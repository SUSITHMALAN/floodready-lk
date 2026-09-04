using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Domain.Entities;
using FloodReadyLK.Domain.Interfaces;

namespace FloodReadyLK.Application.Services;

public interface IDistrictService
{
    Task<IReadOnlyList<DistrictResponseDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<DistrictResponseDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
}

public sealed class DistrictService(IDistrictRepository repository) : IDistrictService
{
    public async Task<IReadOnlyList<DistrictResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var districts = await repository.GetAllAsync(cancellationToken);
        return districts.Select(MapToDto).ToList();
    }

    public async Task<DistrictResponseDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var district = await repository.GetByIdAsync(id, cancellationToken);
        return district is null ? null : MapToDto(district);
    }

    private static DistrictResponseDto MapToDto(District district) => new()
    {
        Id = district.Id,
        Name = district.Name,
        RiskLevel = district.RiskLevel.ToString(),
        Recommendation = district.Recommendation
    };
}

public interface IFloodReportService
{
    Task<IReadOnlyList<FloodReportResponseDto>> GetAllAsync(int? districtId, string? severity, CancellationToken cancellationToken = default);
    Task<FloodReportResponseDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<FloodReportResponseDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<FloodReportResponseDto> CreateAsync(Guid userId, CreateFloodReportDto request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(Guid id, Guid userId, CancellationToken cancellationToken = default);
}

public sealed class FloodReportService(IFloodReportRepository repository) : IFloodReportService
{
    public async Task<IReadOnlyList<FloodReportResponseDto>> GetAllAsync(int? districtId, string? severity, CancellationToken cancellationToken = default)
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

        var reports = await repository.GetAllAsync(districtId, parsedSeverity, cancellationToken);
        return reports.Select(MapToDto).ToList();
    }

    public async Task<FloodReportResponseDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var report = await repository.GetByIdAsync(id, cancellationToken);
        return report is null ? null : MapToDto(report);
    }

    public async Task<IReadOnlyList<FloodReportResponseDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var reports = await repository.GetByUserIdAsync(userId, cancellationToken);
        return reports.Select(MapToDto).ToList();
    }

    public async Task<FloodReportResponseDto> CreateAsync(Guid userId, CreateFloodReportDto request, CancellationToken cancellationToken = default)
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

        var created = await repository.AddAsync(report, cancellationToken);
        return MapToDto(created);
    }

    public Task<bool> DeleteAsync(Guid id, Guid userId, CancellationToken cancellationToken = default) =>
        repository.DeleteAsync(id, userId, cancellationToken);

    private static FloodReportResponseDto MapToDto(FloodReport report) => new()
    {
        Id = report.Id,
        UserId = report.UserId,
        DistrictId = report.DistrictId,
        DistrictName = report.District?.Name ?? string.Empty,
        Location = report.Location,
        Severity = report.Severity.ToString(),
        Description = report.Description,
        CreatedAt = report.CreatedAt
    };
}

public interface ISafetyGuideService
{
    Task<IReadOnlyList<SafetyGuideResponseDto>> GetAllAsync(string? phase = null, CancellationToken cancellationToken = default);
}

public sealed class SafetyGuideService(ISafetyGuideRepository repository) : ISafetyGuideService
{
    public async Task<IReadOnlyList<SafetyGuideResponseDto>> GetAllAsync(string? phase = null, CancellationToken cancellationToken = default)
    {
        var guides = await repository.GetAllAsync(phase, cancellationToken);
        return guides.Select(guide => new SafetyGuideResponseDto
        {
            Id = guide.Id,
            Phase = guide.Phase,
            Tip = guide.Tip
        }).ToList();
    }
}
