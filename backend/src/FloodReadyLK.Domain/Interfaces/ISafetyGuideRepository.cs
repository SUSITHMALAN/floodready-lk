using FloodReadyLK.Domain.Entities;

namespace FloodReadyLK.Domain.Interfaces;

public interface ISafetyGuideRepository
{
    Task<IReadOnlyList<SafetyGuide>> GetAllAsync(
        string? phase = null,
        CancellationToken cancellationToken = default);
}