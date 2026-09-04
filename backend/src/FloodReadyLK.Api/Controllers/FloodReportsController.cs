using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Application.Services;
using FloodReadyLK.Application.Validators;
using FloodReadyLK.Infrastructure.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FloodReadyLK.Api.Controllers;

[ApiController]
[Route("api/reports")]
public sealed class FloodReportsController(
    IFloodReportService reportService,
    CreateFloodReportValidator validator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int? districtId,
        [FromQuery] string? severity,
        CancellationToken cancellationToken)
    {
        var reports = await reportService.GetAllAsync(districtId, severity, cancellationToken);
        return Ok(reports);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var report = await reportService.GetByIdAsync(id, cancellationToken);
        return report is null ? NotFound() : Ok(report);
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetMyReports(CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        var reports = await reportService.GetByUserIdAsync(userId, cancellationToken);
        return Ok(reports);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(
        [FromBody] CreateFloodReportDto request,
        CancellationToken cancellationToken)
    {
        var errors = validator.Validate(request);
        if (errors.Count > 0)
        {
            return ValidationProblem(new ValidationProblemDetails(
                errors.ToDictionary(error => error.Key, error => new[] { error.Value })));
        }

        var userId = User.GetUserId();
        var created = await reportService.CreateAsync(userId, request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();
        var deleted = await reportService.DeleteAsync(id, userId, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}