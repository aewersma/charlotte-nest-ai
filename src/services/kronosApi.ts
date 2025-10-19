import { KronosLabs } from "kronoslabs";

// Initialize Kronos client
const client = new KronosLabs({ 
  apiKey: "kl_f6d53762b2477952b1ae1efe32ab5397eb1e0f1862bbf01dced0dbc80ded3e9c"
});

export interface NeighborhoodRecommendation {
  name: string;
  matchScore: number;
  highlights: string[];
  medianPrice: string;
  description: string;
}

export interface UserProfile {
  householdSize: number;
  numberOfChildren: number;
  annualIncome: number;
  priorities: {
    safety: number;
    walkability: number;
    familyFriendly: number;
    nightlife: number;
    quiet: number;
  };
}

export const getNeighborhoodRecommendations = async (
  profile: UserProfile
): Promise<NeighborhoodRecommendation[]> => {
  try {
    const prompt = `You are a neighborhood recommendation AI for Charlotte, NC. Based on the following user profile, recommend the top 3 neighborhoods that would be the best fit. For each neighborhood, provide: name, match score (0-100), 3-4 key highlights, median home price, and a brief description.

User Profile:
- Household Size: ${profile.householdSize}
- Children: ${profile.numberOfChildren}
- Annual Income: $${profile.annualIncome.toLocaleString()}
- Safety Priority: ${profile.priorities.safety}/10
- Walkability Priority: ${profile.priorities.walkability}/10
- Family-Friendly Priority: ${profile.priorities.familyFriendly}/10
- Nightlife Priority: ${profile.priorities.nightlife}/10
- Quiet Environment Priority: ${profile.priorities.quiet}/10

Return ONLY a valid JSON array with exactly 3 neighborhood objects in this format:
[
  {
    "name": "Neighborhood Name",
    "matchScore": 95,
    "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
    "medianPrice": "$450,000",
    "description": "Brief description"
  }
]`;

    const response = await client.chat.completions.create({
      prompt,
      model: "hyperion",
      temperature: 0.7,
      isStream: false,
    }) as any;

    const content = response.choices[0].message.content;
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }
    
    const recommendations = JSON.parse(jsonMatch[0]);
    return recommendations;
  } catch (error) {
    console.error("Kronos API error:", error);
    throw error;
  }
};
