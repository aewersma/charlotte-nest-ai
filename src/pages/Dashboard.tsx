import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, School, Heart, Settings, DollarSign } from "lucide-react";

interface Neighborhood {
  name: string;
  matchScore: number;
  highlights: string[];
  medianPrice: string;
  image: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<Neighborhood[]>([
    {
      name: "Dilworth",
      matchScore: 94,
      highlights: ["Top-Rated Schools", "Historic Charm", "Family-Friendly Parks"],
      medianPrice: "$485,000",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
    },
    {
      name: "Plaza Midwood",
      matchScore: 89,
      highlights: ["Vibrant Arts Scene", "Walkable", "Great Restaurants"],
      medianPrice: "$425,000",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800"
    },
    {
      name: "South End",
      matchScore: 86,
      highlights: ["Urban Living", "Nightlife", "Transit Access"],
      medianPrice: "$375,000",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
    }
  ]);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data));
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Charlotte Neighborhood Finder</h1>
          <Button variant="ghost" onClick={() => navigate('/profile')}>
            <Settings className="mr-2 h-4 w-4" />
            Profile Settings
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userData.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Based on your profile, we've found your top neighborhood matches in Charlotte
          </p>
        </div>

        {/* Recommendations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Your Top Neighborhood Matches
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((neighborhood, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground font-bold text-lg px-4 py-2">
                      {neighborhood.matchScore}% Match
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{neighborhood.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <DollarSign className="h-4 w-4" />
                    Median Price: {neighborhood.medianPrice}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Why it's a great fit:</p>
                    {neighborhood.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Property Listings Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Available Properties in Your Matches
          </h3>

          <Card>
            <CardContent className="p-8">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">Live Property Listings Coming Soon</h4>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're working on integrating real-time property listings from top real estate platforms to show you homes that match your budget in these neighborhoods.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Realtor Connection Section */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <School className="h-6 w-6 text-primary" />
            Connect with Local Realtors
          </h3>

          <Card>
            <CardContent className="p-8">
              <div className="text-center py-12">
                <h4 className="text-xl font-semibold mb-2 text-foreground">Expert Guidance Awaits</h4>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Connect with experienced Charlotte realtors who specialize in your matched neighborhoods.
                </p>
                <Button variant="default" size="lg">
                  Find Your Realtor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
