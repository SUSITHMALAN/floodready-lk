using FloodReadyLK.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FloodReadyLK.Api.Controllers;

[ApiController]
[Route("api/districts")]
public sealed class DistrictsController(IDistrictService districtService) : ControllerBase
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
}