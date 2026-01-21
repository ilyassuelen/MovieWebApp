import { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddUserFormProps {
  onSubmit: (name: string) => Promise<void>;
  isLoading: boolean;
}

export function AddUserForm({ onSubmit, isLoading }: AddUserFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter a name');
      return;
    }

    await onSubmit(trimmedName);
    setName('');
  };

  return (
    <div className="card-netflix-static p-5">
      <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
        <UserPlus className="h-4 w-4 text-primary" />
        Add New User
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="text"
            placeholder="Enter user name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            disabled={isLoading}
            className="bg-background/50 border-border/50 focus:border-primary h-10"
          />
          {error && (
            <p className="text-xs text-destructive mt-1.5">{error}</p>
          )}
        </div>
        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
