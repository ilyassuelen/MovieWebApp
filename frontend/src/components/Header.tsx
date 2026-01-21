import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-background via-background/95 to-transparent">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Film className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <span className="font-display text-2xl tracking-wider">
            <span className="text-primary">MOVIE</span>
            <span className="text-foreground">WEB</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
