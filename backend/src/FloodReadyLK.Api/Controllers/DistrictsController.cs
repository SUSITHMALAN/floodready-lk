using FloodReadyLK.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FloodReadyLK.Api.Controllers;

[ApiController]
[Route("api/districts")]
public sealed class DistrictsController(
    IDistrictService districtService,
    IFloodReportService reportService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var districts = await districtService.GetAllAsync(cancellationToken);
        return Ok(districts);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var district = await districtService.GetByIdAsync(id, cancellationToken);
        return district is null ? NotFound() : Ok(district);
    }

    [HttpGet("{id:int}/reports")]
    public async Task<IActionResult> GetDistrictReports(int id, [FromQuery] string? severity, CancellationToken cancellationToken)
    {
        var district = await districtService.GetByIdAsync(id, cancellationToken);
        if (district is null) return NotFound();

        var reports = await reportService.GetAllAsync(id, severity, cancellationToken);
        return Ok(reports);
    }
}