using FloodReadyLK.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FloodReadyLK.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<District> Districts => Set<District>();
    public DbSet<FloodReport> FloodReports => Set<FloodReport>();
    public DbSet<SafetyGuide> SafetyGuides => Set<SafetyGuide>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<District>(entity =>
        {
            entity.ToTable("districts");
            entity.HasKey(district => district.Id);
            entity.Property(district => district.Id).HasColumnName("id");
            entity.Property(district => district.Name).HasColumnName("name");
            entity.Property(district => district.RiskLevel).HasColumnName("risk_level").HasConversion<string>();
            entity.Property(district => district.Recommendation).HasColumnName("recommendation");
        });

        modelBuilder.Entity<FloodReport>(entity =>
        {
            entity.ToTable("flood_reports");
            entity.HasKey(report => report.Id);
            entity.Property(report => report.Id).HasColumnName("id");
            entity.Property(report => report.UserId).HasColumnName("user_id");
            entity.Property(report => report.DistrictId).HasColumnName("district_id");
            entity.Property(report => report.Location).HasColumnName("location");
            entity.Property(report => report.Severity).HasColumnName("severity").HasConversion<string>();
            entity.Property(report => report.Description).HasColumnName("description");
            entity.Property(report => report.CreatedAt).HasColumnName("created_at");
        });

        modelBuilder.Entity<SafetyGuide>(entity =>
        {
            entity.ToTable("safety_guides");
            entity.HasKey(guide => guide.Id);
            entity.Property(guide => guide.Id).HasColumnName("id");
            entity.Property(guide => guide.Phase).HasColumnName("phase");
            entity.Property(guide => guide.Tip).HasColumnName("tip");
        });
    }
}