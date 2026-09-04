using FloodReadyLK.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FloodReadyLK.Api.Controllers;

[ApiController]
[Route("api/safety-guides")]
public sealed class SafetyGuidesController(ISafetyGuideService safetyGuideService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? phase, CancellationToken cancellationToken)
    {
        var guides = await safetyGuideService.GetAllAsync(phase, cancellationToken);
        return Ok(guides);
    }
}