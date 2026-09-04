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
        var query = db.FloodReports.AsNoTracking().Include(report => report.District).AsQueryable();

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

    public async Task<FloodReport?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default) =>
        await db.FloodReports
            .AsNoTracking()
            .Include(report => report.District)
            .FirstOrDefaultAsync(report => report.Id == id, cancellationToken);

    public async Task<IReadOnlyList<FloodReport>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default) =>
        await db.FloodReports
            .AsNoTracking()
            .Include(report => report.District)
            .Where(report => report.UserId == userId)
            .OrderByDescending(report => report.CreatedAt)
            .ToListAsync(cancellationToken);

    public async Task<FloodReport> AddAsync(FloodReport report, CancellationToken cancellationToken = default)
    {
        db.FloodReports.Add(report);
        await db.SaveChangesAsync(cancellationToken);

        // Load navigation property if present
        if (report.District is null)
        {
            await db.Entry(report).Reference(r => r.District).LoadAsync(cancellationToken);
        }

        return report;
    }

    public async Task<bool> DeleteAsync(Guid id, Guid userId, CancellationToken cancellationToken = default)
    {
        var report = await db.FloodReports.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId, cancellationToken);
        if (report is null) return false;

        db.FloodReports.Remove(report);
        await db.SaveChangesAsync(cancellationToken);
        return true;
    }
}