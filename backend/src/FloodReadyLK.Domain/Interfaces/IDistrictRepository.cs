using FloodReadyLK.Domain.Entities;

namespace FloodReadyLK.Domain.Interfaces;

public interface IDistrictRepository
{
    Task<IReadOnlyList<District>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<District?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
}