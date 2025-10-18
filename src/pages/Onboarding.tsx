import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NumberSelector } from "@/components/NumberSelector";
import { PrioritySlider } from "@/components/PrioritySlider";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

interface OnboardingData {
  // Step 1: Account
  name: string;
  email: string;
  password: string;
  
  // Step 2: Household
  householdSize: number;
  children: number;
  schoolNeeds: string[];
  
  // Step 3: Financial & Lifestyle
  income: number;
  education: string;
  priorities: {
    safety: number;
    walkability: number;
    familyFriendly: number;
    nightlife: number;
    quiet: number;
  };
  
  // Step 4: Optional Demographics
  gender: string;
  ethnicity: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    email: "",
    password: "",
    householdSize: 1,
    children: 0,
    schoolNeeds: [],
    income: 75000,
    education: "",
    priorities: {
      safety: 5,
      walkability: 5,
      familyFriendly: 5,
      nightlife: 5,
      quiet: 5,
    },
    gender: "",
    ethnicity: "",
  });

  const totalSteps = 4;

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!data.name || !data.email || !data.password) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    if (currentStep === 3 && !data.education) {
      toast.error("Please select your education level");
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Store data in localStorage (in production, this would go to your backend)
    localStorage.setItem("userData", JSON.stringify(data));
    toast.success("Profile created successfully!");
    navigate("/dashboard");
  };

  const toggleSchoolNeed = (need: string) => {
    setData(prev => ({
      ...prev,
      schoolNeeds: prev.schoolNeeds.includes(need)
        ? prev.schoolNeeds.filter(n => n !== need)
        : [...prev.schoolNeeds, need]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </h2>
            <span className="text-sm font-medium text-primary">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12">
          {/* Step 1: Account Creation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-card-foreground mb-2">Create Your Account</h1>
                <p className="text-muted-foreground">Let's start with the basics</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="john@example.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    placeholder="••••••••"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Household & Family */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-card-foreground mb-2">Tell Us About Your Household</h1>
                <p className="text-muted-foreground">This helps us understand your family needs</p>
              </div>

              <div className="space-y-8">
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
                  <Label className="mb-4 block">School Needs (Select all that apply)</Label>
                  <div className="space-y-3">
                    {["Elementary", "Middle School", "High School", "Special Education"].map((level) => (
                      <div key={level} className="flex items-center space-x-3">
                        <Checkbox
                          id={level}
                          checked={data.schoolNeeds.includes(level)}
                          onCheckedChange={() => toggleSchoolNeed(level)}
                        />
                        <label
                          htmlFor={level}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Financial & Lifestyle */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-card-foreground mb-2">Financial & Lifestyle Profile</h1>
                <p className="text-muted-foreground">Help us match you with the right neighborhoods</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Annual Household Income: ${data.income.toLocaleString()}</Label>
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
                  <Label htmlFor="education">Education Level *</Label>
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

                <div className="pt-4 space-y-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Lifestyle Priorities</h3>
                  
                  <PrioritySlider
                    label="Safety & Low Crime"
                    value={data.priorities.safety}
                    onChange={(val) => setData({ ...data, priorities: { ...data.priorities, safety: val } })}
                  />

                  <PrioritySlider
                    label="Walkability"
                    description="Proximity to amenities, sidewalks, bike lanes"
                    value={data.priorities.walkability}
                    onChange={(val) => setData({ ...data, priorities: { ...data.priorities, walkability: val } })}
                  />

                  <PrioritySlider
                    label="Family-Friendly (Parks & Recreation)"
                    value={data.priorities.familyFriendly}
                    onChange={(val) => setData({ ...data, priorities: { ...data.priorities, familyFriendly: val } })}
                  />

                  <PrioritySlider
                    label="Nightlife & Dining"
                    value={data.priorities.nightlife}
                    onChange={(val) => setData({ ...data, priorities: { ...data.priorities, nightlife: val } })}
                  />

                  <PrioritySlider
                    label="Quiet & Peaceful"
                    value={data.priorities.quiet}
                    onChange={(val) => setData({ ...data, priorities: { ...data.priorities, quiet: val } })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Optional Demographics */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-card-foreground mb-2">Optional Information</h1>
                <p className="text-muted-foreground">This information is optional and helps improve our recommendations</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="gender">Gender (Optional)</Label>
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
                  <Label htmlFor="ethnicity">Race/Ethnicity (Optional)</Label>
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

                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Privacy Note:</strong> Your demographic information is kept confidential 
                    and is only used to improve the accuracy of our neighborhood recommendations. You can skip these fields if you prefer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button onClick={handleNext}>
              {currentStep === totalSteps ? (
                <>
                  Complete
                  <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
