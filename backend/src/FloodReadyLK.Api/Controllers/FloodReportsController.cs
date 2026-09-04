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
        return CreatedAtAction(nameof(GetAll), new { }, created);
    }
}