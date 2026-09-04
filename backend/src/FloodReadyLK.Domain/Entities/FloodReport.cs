namespace FloodReadyLK.Domain.Entities;

public sealed class FloodReport
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public int DistrictId { get; set; }
    public string Location { get; set; } = string.Empty;
    public ReportSeverity Severity { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
}

public enum ReportSeverity
{
    Minor,
    Moderate,
    Severe
}
