import { Clapperboard, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md animate-fade-in">
        {/* Icon */}
        <div className="relative inline-block mb-8">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-secondary">
            <Clapperboard className="h-14 w-14 text-primary" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="font-display text-7xl md:text-8xl text-gradient-netflix mb-4 tracking-wider">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Lost your way?
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-8">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>

        {/* Action */}
        <Button asChild size="lg" className="px-8">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            MovieWeb Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
