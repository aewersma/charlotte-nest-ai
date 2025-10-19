import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const handleContact = () => {
    window.location.href = "mailto:contact@smartliving.com?subject=Smart Living Inquiry";
  };

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-2">Created By</h3>
            <p className="text-sm text-muted-foreground">
              Martin Anuonye • Arthur Ewersmann • Lauren Sharpe
            </p>
          </div>
          <Button onClick={handleContact} variant="default" size="lg">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </div>
        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Smart Living. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
