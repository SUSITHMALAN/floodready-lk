using FloodReadyLK.Domain.Entities;
using FloodReadyLK.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FloodReadyLK.Infrastructure.Persistence.Repositories;

public sealed class FloodReportRepository(AppDbContext db) : IFloodReportRepository
{
    public async Task<IReadOnlyList<FloodReport>> GetAllAsync(
        int? districtId = null,
        ReportSeverity? severity = null,
        CancellationToken cancellationToken = default)
    {
        var query = db.FloodReports.AsNoTracking().AsQueryable();

        if (districtId is not null)
        {
            query = query.Where(report => report.DistrictId == districtId);
        }

        if (severity is not null)
        {
            query = query.Where(report => report.Severity == severity);
        }

        return await query.OrderByDescending(report => report.CreatedAt).ToListAsync(cancellationToken);
    }

    public async Task<FloodReport> AddAsync(FloodReport report, CancellationToken cancellationToken = default)
    {
        db.FloodReports.Add(report);
        await db.SaveChangesAsync(cancellationToken);
        return report;
    }
}