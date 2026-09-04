using System.Security.Claims;

namespace FloodReadyLK.Infrastructure.Auth;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        var sub = user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? user.FindFirst("sub")?.Value;

        return Guid.TryParse(sub, out var userId)
            ? userId
            : throw new UnauthorizedAccessException("Token is missing a valid user id (sub) claim.");
    }
}