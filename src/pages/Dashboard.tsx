import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, School, Heart, Settings, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getNeighborhoodRecommendations, NeighborhoodRecommendation } from "@/services/kronosApi";
import logo from "@/assets/safeliving-logo.png";
import { Footer } from "@/components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<NeighborhoodRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      setUserData(parsed);
      loadRecommendations(parsed);
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);

  const loadRecommendations = async (profile: any) => {
    setIsLoading(true);
    try {
      const results = await getNeighborhoodRecommendations({
        householdSize: profile.householdSize,
        numberOfChildren: profile.children,
        annualIncome: profile.income,
        priorities: profile.priorities,
      });
      setRecommendations(results);
    } catch (error) {
      toast.error("Failed to load AI recommendations. Showing sample data.");
      // Fallback to mock data
      setRecommendations([
        {
          name: "Dilworth",
          matchScore: 95,
          highlights: ["Top-Rated Schools", "Tree-Lined Streets", "Historic Charm"],
          medianPrice: "$650,000",
          description: "A historic neighborhood perfect for families",
        },
        {
          name: "NoDa",
          matchScore: 88,
          highlights: ["Arts District", "Vibrant Nightlife", "Walkable"],
          medianPrice: "$425,000",
          description: "Creative hub with excellent dining and culture",
        },
        {
          name: "South End",
          matchScore: 82,
          highlights: ["Modern Living", "Rail Trail Access", "Urban Energy"],
          medianPrice: "$550,000",
          description: "Modern urban living with great amenities",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="bg-card shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Smart Living" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-primary">Smart Living</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate('/profile')}>
            <Settings className="mr-2 h-4 w-4" />
            Profile Settings
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 flex-grow">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userData.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Based on your profile, here are your AI-powered neighborhood matches
          </p>
        </div>

        {/* Recommendations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Your Top Neighborhood Matches
          </h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-primary mr-3" />
              <span className="text-lg text-muted-foreground">Analyzing your preferences with AI...</span>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((neighborhood, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                  <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground font-bold text-lg px-4 py-2">
                        {neighborhood.matchScore}% Match
                      </Badge>
                    </div>
                    <MapPin className="h-12 w-12 text-primary mb-2" />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{neighborhood.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <DollarSign className="h-4 w-4" />
                      Median Price: {neighborhood.medianPrice}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Why it's a great fit:</p>
                      {neighborhood.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {neighborhood.description && (
                      <p className="text-sm text-muted-foreground mb-4">{neighborhood.description}</p>
                    )}
                    
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
                  Connect with experienced realtors who specialize in your matched neighborhoods.
                </p>
                <Button variant="default" size="lg">
                  Find Your Realtor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
