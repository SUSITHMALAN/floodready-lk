namespace FloodReadyLK.Application.DTOs;

public sealed class FloodReportResponseDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public int DistrictId { get; set; }
    public string DistrictName { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Severity { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
}
