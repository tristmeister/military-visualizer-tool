
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShieldAlert } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center glassmorphism p-6 md:p-10 rounded-xl w-[90%] max-w-md">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-12 h-12 text-primary" />
        </div>
        <h1 className="geo-heading mb-4">404</h1>
        <p className="geo-subheading mb-6">Page not found</p>
        <div className="mt-6">
          <a 
            href="/" 
            className="btn-skeuomorphic bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 inline-block"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
