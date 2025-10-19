import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/charlotte-hero.jpg";
import logo from "@/assets/safeliving-logo.png";
import { Footer } from "@/components/Footer";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 159, 227, 0.85), rgba(0, 159, 227, 0.6)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <img src={logo} alt="Smart Living" className="w-56 md:w-72 mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find the Neighborhood<br />That Fits Your Life
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-2xl mx-auto">
            AI-powered neighborhood recommendations matched to your lifestyle, family needs, and budget
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate('/onboarding')}
            className="group"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Discover How It Works</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Why Choose Smart Living?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Advanced algorithms analyze your preferences against comprehensive neighborhood data to find your perfect match
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">Live Market Data</h3>
              <p className="text-muted-foreground">
                Real-time property listings and pricing aligned with your budget and preferred neighborhoods
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">Personalized Experience</h3>
              <p className="text-muted-foreground">
                Tailored recommendations based on family size, schools, income, and lifestyle priorities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Neighborhood?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join hundreds of families who've found their perfect home
          </p>
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate('/onboarding')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Landing;
