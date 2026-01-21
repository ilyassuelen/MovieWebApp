import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';
import { Header } from '@/components/Header';
import { MovieCard } from '@/components/MovieCard';
import { MovieCardSkeleton } from '@/components/MovieCardSkeleton';
import { AddMovieForm } from '@/components/AddMovieForm';
import { EditMovieModal } from '@/components/EditMovieModal';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { SearchInput } from '@/components/SearchInput';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/ui/button';
import { moviesApi, Movie } from '@/api';
import { useToast } from '@/hooks/use-toast';

export default function MoviesPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null);

  const userIdNum = Number(userId);

  const fetchMovies = useCallback(async () => {
    if (!userId || isNaN(userIdNum)) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await moviesApi.getByUser(userIdNum);
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies');
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, userIdNum]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleAddMovie = async (title: string) => {
    setIsAdding(true);
    try {
      const newMovie = await moviesApi.add(userIdNum, { title });
      setMovies((prev) => [...prev, newMovie]);
      toast({
        title: 'Movie added',
        description: `"${newMovie.name}" has been added to your list.`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add movie. Please check the title and try again.',
        variant: 'destructive',
      });
      console.error('Error adding movie:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateMovie = async (movieId: number, newTitle: string) => {
    setIsUpdating(true);
    try {
      const updated = await moviesApi.update(userIdNum, movieId, { new_title: newTitle });
      setMovies((prev) =>
        prev.map((m) => (m.id === movieId ? updated : m))
      );
      setEditingMovie(null);
      toast({
        title: 'Movie updated',
        description: `Movie has been updated successfully.`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update movie. Please try again.',
        variant: 'destructive',
      });
      console.error('Error updating movie:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteMovie = async () => {
    if (!deletingMovie) return;

    setIsDeleting(true);
    try {
      await moviesApi.delete(userIdNum, deletingMovie.id);
      setMovies((prev) => prev.filter((m) => m.id !== deletingMovie.id));
      toast({
        title: 'Movie removed',
        description: `"${deletingMovie.name}" has been removed from your list.`,
      });
      setDeletingMovie(null);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete movie. Please try again.',
        variant: 'destructive',
      });
      console.error('Error deleting movie:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) return movies;
    const query = searchQuery.toLowerCase();
    return movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(query) ||
        movie.director?.toLowerCase().includes(query)
    );
  }, [movies, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 md:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-3 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profiles
        </Button>

        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
            My List
          </h1>
          <p className="text-muted-foreground">
            {movies.length > 0
              ? `${movies.length} movie${movies.length !== 1 ? 's' : ''} in your collection`
              : 'Your movie collection is empty'}
          </p>
        </div>

        {/* Search & Add Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title or director..."
            />
          </div>
          <div className="sm:w-80">
            <AddMovieForm onSubmit={handleAddMovie} isLoading={isAdding} />
          </div>
        </div>

        {/* Movies Grid */}
        {error ? (
          <ErrorState message={error} onRetry={fetchMovies} />
        ) : isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <EmptyState
            icon={Film}
            title="Your list is empty"
            description="Search for movies above to add them to your collection."
          />
        ) : filteredMovies.length === 0 ? (
          <EmptyState
            icon={Film}
            title="No results"
            description={`No movies match "${searchQuery}". Try a different search.`}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {filteredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard
                  movie={movie}
                  onEdit={setEditingMovie}
                  onDelete={setDeletingMovie}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit Modal */}
      <EditMovieModal
        movie={editingMovie}
        open={!!editingMovie}
        onOpenChange={(open) => !open && setEditingMovie(null)}
        onSubmit={handleUpdateMovie}
        isLoading={isUpdating}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deletingMovie}
        onOpenChange={(open) => !open && setDeletingMovie(null)}
        title="Remove from My List"
        description={`Are you sure you want to remove "${deletingMovie?.name}" from your list?`}
        onConfirm={handleDeleteMovie}
        isLoading={isDeleting}
      />
    </div>
  );
}
