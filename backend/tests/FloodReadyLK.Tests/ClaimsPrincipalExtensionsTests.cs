using System.Security.Claims;
using FloodReadyLK.Infrastructure.Auth;
using FluentAssertions;
using Xunit;

namespace FloodReadyLK.Tests;

public class ClaimsPrincipalExtensionsTests
{
    [Fact]
    public void GetUserId_WithValidSubClaim_ReturnsGuid()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var claims = new[] { new Claim("sub", userId.ToString()) };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var principal = new ClaimsPrincipal(identity);

        // Act
        var result = principal.GetUserId();

        // Assert
        result.Should().Be(userId);
    }

    [Fact]
    public void GetUserId_WithValidNameIdentifierClaim_ReturnsGuid()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var principal = new ClaimsPrincipal(identity);

        // Act
        var result = principal.GetUserId();

        // Assert
        result.Should().Be(userId);
    }

    [Fact]
    public void GetUserId_WithoutValidGuidClaim_ThrowsUnauthorizedAccessException()
    {
        // Arrange
        var claims = new[] { new Claim("sub", "not-a-guid") };
        var identity = new ClaimsIdentity(claims, "TestAuth");
        var principal = new ClaimsPrincipal(identity);

        // Act
        var act = () => principal.GetUserId();

        // Assert
        act.Should().Throw<UnauthorizedAccessException>().WithMessage("*Token is missing a valid user id*");
    }
}
