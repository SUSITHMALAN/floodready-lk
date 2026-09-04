using FloodReadyLK.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;
using Xunit;
using Xunit.Abstractions;

namespace FloodReadyLK.Tests;

public class DatabaseConnectionTests(ITestOutputHelper output)
{
    [Fact]
    public async Task CanConnectToSupabaseDatabase_AndSeedData()
    {
        var connectionString = "Host=aws-0-ap-northeast-2.pooler.supabase.com;Port=5432;Database=postgres;Username=postgres.apxnoqlkyuyyeilnsray;Password=fM0qvORNEvKdV6lV;SSL Mode=Require;Trust Server Certificate=true";

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        await using var context = new AppDbContext(options);

        // Can Connect
        var canConnect = await context.Database.CanConnectAsync();
        canConnect.Should().BeTrue("Should connect to Supabase PostgreSQL database");
        output.WriteLine("Connected to Supabase PostgreSQL database!");

        // Seed data & create tables
        await DbInitializer.SeedAsync(context);
        output.WriteLine("Tables created and seeded!");

        // Verify Districts count
        var districtCount = await context.Districts.CountAsync();
        districtCount.Should().Be(25, "All 25 Sri Lanka districts should be seeded into Supabase");
        output.WriteLine($"Districts count: {districtCount}");

        // Verify Safety Guides count
        var guideCount = await context.SafetyGuides.CountAsync();
        guideCount.Should().Be(9, "9 safety guides should be seeded");
        output.WriteLine($"Safety Guides count: {guideCount}");
    }
}
