import { Pencil, Trash2, Film, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/api';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  return (
    <div className="group card-netflix relative">
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-muted overflow-hidden">
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-background">
            <Film className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <span className="text-xs text-muted-foreground/50">No poster</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          {/* Play button hint */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
              <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground line-clamp-2 text-sm leading-tight">
              {movie.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {movie.release_year && <span>{movie.release_year}</span>}
              {movie.director && movie.release_year && <span>•</span>}
              {movie.director && <span className="truncate">{movie.director}</span>}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 h-8 text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  onEdit(movie);
                }}
              >
                <Pencil className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 h-8 text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(movie);
                }}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Title below poster (visible when not hovering on mobile) */}
      <div className="p-3 md:hidden">
        <h3 className="font-medium text-sm text-foreground line-clamp-1">
          {movie.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {movie.release_year}
        </p>
      </div>
    </div>
  );
}
