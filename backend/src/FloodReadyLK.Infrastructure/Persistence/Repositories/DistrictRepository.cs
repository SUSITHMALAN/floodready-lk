using FloodReadyLK.Domain.Entities;
using FloodReadyLK.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FloodReadyLK.Infrastructure.Persistence.Repositories;

public sealed class DistrictRepository(AppDbContext db) : IDistrictRepository
{
    public async Task<IReadOnlyList<District>> GetAllAsync(CancellationToken cancellationToken = default) =>
        await db.Districts.AsNoTracking().OrderBy(district => district.Name).ToListAsync(cancellationToken);

    public async Task<District?> GetByIdAsync(int id, CancellationToken cancellationToken = default) =>
        await db.Districts.AsNoTracking().FirstOrDefaultAsync(district => district.Id == id, cancellationToken);
}