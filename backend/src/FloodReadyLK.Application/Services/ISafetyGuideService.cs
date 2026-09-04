using FloodReadyLK.Application.DTOs;

namespace FloodReadyLK.Application.Services;

public interface ISafetyGuideService
{
    Task<IReadOnlyList<SafetyGuideDto>> GetAllAsync(
        string? phase = null,
        CancellationToken cancellationToken = default);
}