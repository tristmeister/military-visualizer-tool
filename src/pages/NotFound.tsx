import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <ShieldAlert className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The military intelligence you're looking for could not be located. It may have been classified or moved to a different sector.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/landing">Go to Landing Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;