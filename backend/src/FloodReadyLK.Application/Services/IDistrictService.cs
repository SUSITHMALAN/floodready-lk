using FloodReadyLK.Application.DTOs;

namespace FloodReadyLK.Application.Services;

public interface IDistrictService
{
    Task<IReadOnlyList<DistrictDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<DistrictDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
}