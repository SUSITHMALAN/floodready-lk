using FloodReadyLK.Domain.Entities;
using FloodReadyLK.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FloodReadyLK.Infrastructure.Persistence.Repositories;

public sealed class SafetyGuideRepository(AppDbContext db) : ISafetyGuideRepository
{
    public async Task<IReadOnlyList<SafetyGuide>> GetAllAsync(
        string? phase = null,
        CancellationToken cancellationToken = default)
    {
        var query = db.SafetyGuides.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(phase))
        {
            var normalized = phase.Trim().ToLowerInvariant();
            query = query.Where(guide => guide.Phase.ToLower() == normalized);
        }

        return await query.OrderBy(guide => guide.Id).ToListAsync(cancellationToken);
    }
}
