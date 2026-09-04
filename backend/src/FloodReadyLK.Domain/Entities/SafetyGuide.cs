namespace FloodReadyLK.Domain.Entities;

public sealed class SafetyGuide
{
    public int Id { get; set; }
    public string Phase { get; set; } = string.Empty;
    public string Tip { get; set; } = string.Empty;
}
