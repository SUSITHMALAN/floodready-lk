using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Domain.Interfaces;

namespace FloodReadyLK.Application.Services;

public sealed class DistrictService(IDistrictRepository repository) : IDistrictService
{
    public async Task<IReadOnlyList<DistrictDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var districts = await repository.GetAllAsync(cancellationToken);
        return districts.Select(Map).ToList();
    }

    public async Task<DistrictDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var district = await repository.GetByIdAsync(id, cancellationToken);
        return district is null ? null : Map(district);
    }

    private static DistrictDto Map(FloodReadyLK.Domain.Entities.District district) =>
        new(district.Id, district.Name, district.RiskLevel.ToString(), district.Recommendation);
}