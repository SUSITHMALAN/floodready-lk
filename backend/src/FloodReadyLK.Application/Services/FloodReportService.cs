using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Domain.Entities;
using FloodReadyLK.Domain.Interfaces;

namespace FloodReadyLK.Application.Services;

public sealed class FloodReportService(
    IFloodReportRepository repository,
    IDistrictRepository districtRepository) : IFloodReportService
{
    public async Task<IReadOnlyList<FloodReportDto>> GetAllAsync(
        int? districtId = null,
        string? severity = null,
        CancellationToken cancellationToken = default)
    {
        ReportSeverity? parsedSeverity = null;
        if (!string.IsNullOrWhiteSpace(severity))
        {
            if (!Enum.TryParse(severity, ignoreCase: true, out ReportSeverity value))
            {
                return [];
            }

            parsedSeverity = value;
        }

        var reports = await repository.GetAllAsync(districtId, parsedSeverity, cancellationToken);
        return reports.Select(Map).ToList();
    }

    public async Task<FloodReportDto> CreateAsync(
        Guid userId,
        CreateFloodReportDto request,
        CancellationToken cancellationToken = default)
    {
        if (!Enum.TryParse(request.Severity, ignoreCase: true, out ReportSeverity severity))
        {
            throw new ArgumentException("Severity must be Minor, Moderate, or Severe.", nameof(request));
        }

        if (await districtRepository.GetByIdAsync(request.DistrictId, cancellationToken) is null)
        {
            throw new KeyNotFoundException($"District {request.DistrictId} was not found.");
        }

        var report = new FloodReport
        {
            UserId = userId,
            DistrictId = request.DistrictId,
            Location = request.Location.Trim(),
            Severity = severity,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim()
        };

        return Map(await repository.AddAsync(report, cancellationToken));
    }

    private static FloodReportDto Map(FloodReport report) =>
        new(report.Id, report.UserId, report.DistrictId, report.Location, report.Severity.ToString(), report.Description, report.CreatedAt);
}