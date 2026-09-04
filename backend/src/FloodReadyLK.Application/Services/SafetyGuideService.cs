using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Domain.Interfaces;

namespace FloodReadyLK.Application.Services;

public sealed class SafetyGuideService(ISafetyGuideRepository repository) : ISafetyGuideService
{
    public async Task<IReadOnlyList<SafetyGuideDto>> GetAllAsync(
        string? phase = null,
        CancellationToken cancellationToken = default)
    {
        var guides = await repository.GetAllAsync(phase, cancellationToken);
        return guides.Select(guide => new SafetyGuideDto(guide.Id, guide.Phase, guide.Tip)).ToList();
    }
}