import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { User as UserType } from '@/api';

interface UserCardProps {
  user: UserType;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link
      to={`/users/${user.id}/movies`}
      className="group card-netflix p-6 flex flex-col items-center gap-4 cursor-pointer relative"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary group-hover:bg-primary/20 transition-all duration-300">
          <User className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
      </div>

      <div className="text-center relative z-10">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {user.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 justify-center">
          View collection
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );
}
