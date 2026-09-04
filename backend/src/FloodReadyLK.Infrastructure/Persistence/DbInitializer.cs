using FloodReadyLK.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FloodReadyLK.Infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (context.Database.IsRelational())
        {
            const string createTablesSql = """
                CREATE TABLE IF NOT EXISTS districts (
                    id INT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    risk_level VARCHAR(50) NOT NULL,
                    recommendation TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS flood_reports (
                    id UUID PRIMARY KEY,
                    user_id UUID NOT NULL,
                    district_id INT NOT NULL REFERENCES districts(id),
                    location VARCHAR(255) NOT NULL,
                    severity VARCHAR(50) NOT NULL,
                    description TEXT NOT NULL,
                    created_at TIMESTAMPTZ NOT NULL
                );

                CREATE TABLE IF NOT EXISTS safety_guides (
                    id INT PRIMARY KEY,
                    phase VARCHAR(50) NOT NULL,
                    tip TEXT NOT NULL
                );
                """;

            await context.Database.ExecuteSqlRawAsync(createTablesSql);
        }
        else
        {
            await context.Database.EnsureCreatedAsync();
        }

        if (!await context.Districts.AnyAsync())
        {
            var districts = new List<District>
            {
                new() { Id = 1, Name = "Colombo", RiskLevel = DistrictRiskLevel.High, Recommendation = "Stay alert near Kelani river low-lying areas. Move valuable items to higher ground." },
                new() { Id = 2, Name = "Gampaha", RiskLevel = DistrictRiskLevel.High, Recommendation = "Prepare emergency supplies. Monitor Ja-Ela and Attanagalu Oya water levels." },
                new() { Id = 3, Name = "Kalutara", RiskLevel = DistrictRiskLevel.Severe, Recommendation = "High flood alert near Kalu Ganga. Evacuate immediately if instructed by local authorities." },
                new() { Id = 4, Name = "Ratnapura", RiskLevel = DistrictRiskLevel.Severe, Recommendation = "Severe landslide and flood warning. Keep emergency contacts ready." },
                new() { Id = 5, Name = "Galle", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Caution near Gin Ganga basin. Avoid travelling through submerged roads." },
                new() { Id = 6, Name = "Matara", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Monitor Nilwala Ganga water levels during heavy rains." },
                new() { Id = 7, Name = "Hambantota", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Normal precautions. Follow local weather bulletins." },
                new() { Id = 8, Name = "Kandy", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Be cautious of localized flash floods and slope instability." },
                new() { Id = 9, Name = "Matale", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Standard monsoon preparedness advised." },
                new() { Id = 10, Name = "Nuwara Eliya", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "High landslide risk during intense showers. Stay away from steep hillsides." },
                new() { Id = 11, Name = "Kegalle", RiskLevel = DistrictRiskLevel.High, Recommendation = "High risk of earth slips and river inundation." },
                new() { Id = 12, Name = "Badulla", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Landslide watch in effect for hilly sectors." },
                new() { Id = 13, Name = "Monaragala", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Low flood risk currently. Exercise general caution." },
                new() { Id = 14, Name = "Jaffna", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Clear urban drainage lines to prevent localized waterlogging." },
                new() { Id = 15, Name = "Kilinochchi", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Monitor tank water release warnings." },
                new() { Id = 16, Name = "Mannar", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Coastal weather advisories in effect." },
                new() { Id = 17, Name = "Vavuniya", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Normal precautions." },
                new() { Id = 18, Name = "Mullaitivu", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Monitor reservoir spills during heavy rain." },
                new() { Id = 19, Name = "Batticaloa", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Lagoon water levels may rise during northeastern monsoons." },
                new() { Id = 20, Name = "Ampara", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Exercise caution in low-lying paddy farming regions." },
                new() { Id = 21, Name = "Trincomalee", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Standard weather advisories apply." },
                new() { Id = 22, Name = "Kurunegala", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Watch for sudden rise in Deduru Oya water flow." },
                new() { Id = 23, Name = "Puttalam", RiskLevel = DistrictRiskLevel.Moderate, Recommendation = "Caution in coastal lagoon zones and low-lying roads." },
                new() { Id = 24, Name = "Anuradhapura", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Check irrigation sluice gate notices." },
                new() { Id = 25, Name = "Polonnaruwa", RiskLevel = DistrictRiskLevel.Low, Recommendation = "Stay updated on Mahaweli river discharge alerts." }
            };

            await context.Districts.AddRangeAsync(districts);
        }

        if (!await context.SafetyGuides.AnyAsync())
        {
            var safetyGuides = new List<SafetyGuide>
            {
                new() { Id = 1, Phase = "Before", Tip = "Prepare an emergency kit with canned food, clean water, flashlight, batteries, and essential medicines." },
                new() { Id = 2, Phase = "Before", Tip = "Keep important family documents sealed in waterproof bags and stored on elevated shelves." },
                new() { Id = 3, Phase = "Before", Tip = "Know your local evacuation routes and emergency shelter locations in your Grama Niladhari division." },
                new() { Id = 4, Phase = "During", Tip = "Never walk or drive through moving flood waters. Turn around, don't drown!" },
                new() { Id = 5, Phase = "During", Tip = "Disconnect main electrical switches and gas valves before evacuating your home." },
                new() { Id = 6, Phase = "During", Tip = "Move immediately to higher ground or upper floors if water levels begin to rise rapidly." },
                new() { Id = 7, Phase = "After", Tip = "Avoid contact with floodwater as it may be contaminated with sewage or hazardous chemicals." },
                new() { Id = 8, Phase = "After", Tip = "Boil or purify all drinking water until local health authorities declare tap water safe." },
                new() { Id = 9, Phase = "After", Tip = "Inspect your home structure for cracks or damage before re-entering." }
            };

            await context.SafetyGuides.AddRangeAsync(safetyGuides);
        }

        await context.SaveChangesAsync();
    }
}
