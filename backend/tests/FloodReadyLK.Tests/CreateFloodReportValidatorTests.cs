using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Application.Validators;
using FluentAssertions;
using Xunit;

namespace FloodReadyLK.Tests;

public class CreateFloodReportValidatorTests
{
    private readonly CreateFloodReportValidator _validator = new();

    [Fact]
    public void Validate_WithValidRequest_ReturnsNoErrors()
    {
        // Arrange
        var request = new CreateFloodReportDto
        {
            DistrictId = 1,
            Location = "Wellawatte",
            Severity = "Severe",
            Description = "Water level rising near main road."
        };

        // Act
        var errors = _validator.Validate(request);

        // Assert
        errors.Should().BeEmpty();
    }

    [Fact]
    public void Validate_WithInvalidDistrictId_ReturnsError()
    {
        // Arrange
        var request = new CreateFloodReportDto
        {
            DistrictId = 0,
            Location = "Wellawatte",
            Severity = "Moderate",
            Description = "Flooding"
        };

        // Act
        var errors = _validator.Validate(request);

        // Assert
        errors.Should().ContainSingle(e => e.Key == "DistrictId");
    }

    [Fact]
    public void Validate_WithInvalidSeverity_ReturnsError()
    {
        // Arrange
        var request = new CreateFloodReportDto
        {
            DistrictId = 1,
            Location = "Kandy Town",
            Severity = "CriticalExtreme", // Invalid enum string
            Description = "Road blocked"
        };

        // Act
        var errors = _validator.Validate(request);

        // Assert
        errors.Should().ContainSingle(e => e.Key == "Severity");
    }

    [Fact]
    public void Validate_WithEmptyLocationAndDescription_ReturnsMultipleErrors()
    {
        // Arrange
        var request = new CreateFloodReportDto
        {
            DistrictId = 2,
            Location = "   ",
            Severity = "Minor",
            Description = ""
        };

        // Act
        var errors = _validator.Validate(request);

        // Assert
        errors.Should().HaveCount(2);
        errors.Select(e => e.Key).Should().Contain(new[] { "Location", "Description" });
    }
}
