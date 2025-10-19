import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NumberSelector } from "@/components/NumberSelector";
import { PrioritySlider } from "@/components/PrioritySlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/safeliving-logo.png";
import { Footer } from "@/components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setData(JSON.parse(userData));
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);

  const handleSubmit = () => {
    localStorage.setItem("userData", JSON.stringify(data));
    toast.success("Profile updated successfully! Generating new recommendations...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const toggleSchoolNeed = (need: string) => {
    setData((prev: any) => ({
      ...prev,
      schoolNeeds: prev.schoolNeeds.includes(need)
        ? prev.schoolNeeds.filter((n: string) => n !== need)
        : [...prev.schoolNeeds, need]
    }));
  };

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto flex-grow">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <img src={logo} alt="Smart Living" className="w-12 h-12" />
          <div className="flex-grow">
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
            <p className="text-muted-foreground mt-1">
              Update your information to get fresh neighborhood recommendations
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your basic account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Household Information */}
          <Card>
            <CardHeader>
              <CardTitle>Household Information</CardTitle>
              <CardDescription>Tell us about your family</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <NumberSelector
                label="Household Size"
                value={data.householdSize}
                onChange={(val) => setData({ ...data, householdSize: val })}
                min={1}
                max={10}
              />

              <NumberSelector
                label="Number of Children"
                value={data.children}
                onChange={(val) => setData({ ...data, children: val })}
                min={0}
                max={10}
              />

              <div>
                <Label className="mb-4 block">School Needs</Label>
                <div className="space-y-3">
                  {["Elementary", "Middle School", "High School", "Special Education"].map((level) => (
                    <div key={level} className="flex items-center space-x-3">
                      <Checkbox
                        id={level}
                        checked={data.schoolNeeds?.includes(level)}
                        onCheckedChange={() => toggleSchoolNeed(level)}
                      />
                      <label
                        htmlFor={level}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial & Lifestyle */}
          <Card>
            <CardHeader>
              <CardTitle>Financial & Lifestyle Profile</CardTitle>
              <CardDescription>Help us match you with the right neighborhoods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Annual Household Income: ${data.income?.toLocaleString()}</Label>
                <input
                  type="range"
                  min="30000"
                  max="300000"
                  step="5000"
                  value={data.income}
                  onChange={(e) => setData({ ...data, income: parseInt(e.target.value) })}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>$30K</span>
                  <span>$300K</span>
                </div>
              </div>

              <div>
                <Label htmlFor="education">Education Level</Label>
                <Select value={data.education} onValueChange={(val) => setData({ ...data, education: val })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="some-college">Some College</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Priorities */}
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Priorities</CardTitle>
              <CardDescription>Rate what matters most to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PrioritySlider
                label="Safety & Low Crime"
                value={data.priorities?.safety || 5}
                onChange={(val) => setData({ ...data, priorities: { ...data.priorities, safety: val } })}
              />

              <PrioritySlider
                label="Walkability"
                description="Proximity to amenities, sidewalks, bike lanes"
                value={data.priorities?.walkability || 5}
                onChange={(val) => setData({ ...data, priorities: { ...data.priorities, walkability: val } })}
              />

              <PrioritySlider
                label="Family-Friendly (Parks & Recreation)"
                value={data.priorities?.familyFriendly || 5}
                onChange={(val) => setData({ ...data, priorities: { ...data.priorities, familyFriendly: val } })}
              />

              <PrioritySlider
                label="Nightlife & Dining"
                value={data.priorities?.nightlife || 5}
                onChange={(val) => setData({ ...data, priorities: { ...data.priorities, nightlife: val } })}
              />

              <PrioritySlider
                label="Quiet & Peaceful"
                value={data.priorities?.quiet || 5}
                onChange={(val) => setData({ ...data, priorities: { ...data.priorities, quiet: val } })}
              />
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card>
            <CardHeader>
              <CardTitle>Demographics (Optional)</CardTitle>
              <CardDescription>This information helps improve our recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={data.gender} onValueChange={(val) => setData({ ...data, gender: val })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Prefer not to say" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ethnicity">Race/Ethnicity</Label>
                <Select value={data.ethnicity} onValueChange={(val) => setData({ ...data, ethnicity: val })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Prefer not to say" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="black">Black or African American</SelectItem>
                    <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="native">Native American</SelectItem>
                    <SelectItem value="pacific">Pacific Islander</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button size="lg" onClick={handleSubmit}>
              <Save className="mr-2 h-5 w-5" />
              Update Profile & Resubmit
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
