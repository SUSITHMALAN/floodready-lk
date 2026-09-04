using FloodReadyLK.Application.DTOs;

namespace FloodReadyLK.Application.Validators;

public sealed record ValidationError(string Key, string Value);

public sealed class CreateFloodReportValidator
{
    public IReadOnlyList<ValidationError> Validate(CreateFloodReportDto request)
    {
        var errors = new List<ValidationError>();

        if (request.DistrictId <= 0)
        {
            errors.Add(new("DistrictId", "DistrictId must be greater than zero."));
        }

        if (string.IsNullOrWhiteSpace(request.Location))
        {
            errors.Add(new("Location", "Location is required."));
        }

        if (!Enum.TryParse<Domain.Entities.ReportSeverity>(request.Severity, true, out _))
        {
            errors.Add(new("Severity", "Severity must be Minor, Moderate, or Severe."));
        }

        if (string.IsNullOrWhiteSpace(request.Description))
        {
            errors.Add(new("Description", "Description is required."));
        }

        return errors;
    }
}
