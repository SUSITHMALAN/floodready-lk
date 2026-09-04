namespace FloodReadyLK.Application.DTOs;

public sealed class SafetyGuideResponseDto
{
    public int Id { get; set; }
    public string Phase { get; set; } = string.Empty;
    public string Tip { get; set; } = string.Empty;
}
