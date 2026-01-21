import { useState } from 'react';
import { Plus, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddMovieFormProps {
  onSubmit: (title: string) => Promise<void>;
  isLoading: boolean;
}

export function AddMovieForm({ onSubmit, isLoading }: AddMovieFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please enter a movie title');
      return;
    }

    await onSubmit(trimmedTitle);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search and add a movie..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          disabled={isLoading}
          className="pl-10 bg-secondary border-0 h-11 focus:ring-1 focus:ring-primary"
        />
        {error && (
          <p className="absolute text-xs text-destructive mt-1">{error}</p>
        )}
      </div>
      <Button type="submit" className="h-11 px-6" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </>
        )}
      </Button>
    </form>
  );
}
