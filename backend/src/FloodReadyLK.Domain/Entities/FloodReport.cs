namespace FloodReadyLK.Domain.Entities;

public sealed class FloodReport
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public int DistrictId { get; set; }
    public District? District { get; set; }
    public string Location { get; set; } = string.Empty;
    public ReportSeverity Severity { get; set; }
    public string? Description { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
