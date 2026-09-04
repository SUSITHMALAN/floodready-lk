using FloodReadyLK.Application.DTOs;

namespace FloodReadyLK.Application.Validators;

public sealed class CreateFloodReportValidator
{
    private static readonly HashSet<string> AllowedSeverities =
        ["Minor", "Moderate", "Severe"];

    public IReadOnlyDictionary<string, string[]> Validate(CreateFloodReportDto request)
    {
        var errors = new Dictionary<string, string[]>();

        if (request.DistrictId <= 0)
        {
            errors[nameof(request.DistrictId)] = ["DistrictId must be greater than zero."];
        }

        if (string.IsNullOrWhiteSpace(request.Location))
        {
            errors[nameof(request.Location)] = ["Location is required."];
        }

        if (!AllowedSeverities.Contains(request.Severity, StringComparer.OrdinalIgnoreCase))
        {
            errors[nameof(request.Severity)] = ["Severity must be Minor, Moderate, or Severe."];
        }

        return errors;
    }
}