namespace FloodReadyLK.Application.DTOs;

public sealed class CreateFloodReportDto
{
    public int DistrictId { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Severity { get; set; } = string.Empty;
    public string? Description { get; set; }
}
