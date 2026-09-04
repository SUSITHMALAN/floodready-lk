using FloodReadyLK.Application.DTOs;
using FloodReadyLK.Application.Services;
using FloodReadyLK.Domain.Entities;
using FloodReadyLK.Domain.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace FloodReadyLK.Tests;

public class FloodReportServiceTests
{
    private readonly Mock<IFloodReportRepository> _repositoryMock = new();
    private readonly FloodReportService _service;

    public FloodReportServiceTests()
    {
        _service = new FloodReportService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetAllAsync_WithValidSeverity_CallsRepositoryWithParsedEnum()
    {
        // Arrange
        var expectedReports = new List<FloodReport>
        {
            new()
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(),
                DistrictId = 1,
                Location = "Colombo 03",
                Severity = ReportSeverity.Severe,
                Description = "Heavy flooding",
                CreatedAt = DateTimeOffset.UtcNow,
                District = new District { Id = 1, Name = "Colombo" }
            }
        };

        _repositoryMock
            .Setup(r => r.GetAllAsync(1, ReportSeverity.Severe, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedReports);

        // Act
        var result = await _service.GetAllAsync(1, "Severe");

        // Assert
        result.Should().HaveCount(1);
        result[0].DistrictName.Should().Be("Colombo");
        result[0].Severity.Should().Be("Severe");
    }

    [Fact]
    public async Task GetAllAsync_WithInvalidSeverity_ThrowsArgumentException()
    {
        // Act
        var act = async () => await _service.GetAllAsync(null, "InvalidSeverity");

        // Assert
        await act.Should().ThrowAsync<ArgumentException>().WithMessage("*Invalid severity*");
    }

    [Fact]
    public async Task CreateAsync_WithValidRequest_ReturnsMappedDto()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var request = new CreateFloodReportDto
        {
            DistrictId = 2,
            Location = "Ja-Ela",
            Severity = "Moderate",
            Description = "Water entering houses"
        };

        _repositoryMock
            .Setup(r => r.AddAsync(It.IsAny<FloodReport>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((FloodReport report, CancellationToken _) => report);

        // Act
        var result = await _service.CreateAsync(userId, request);

        // Assert
        result.Should().NotBeNull();
        result.UserId.Should().Be(userId);
        result.Location.Should().Be("Ja-Ela");
        result.Severity.Should().Be("Moderate");
        _repositoryMock.Verify(r => r.AddAsync(It.IsAny<FloodReport>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}
