import { useState, useEffect, useCallback } from 'react';
import { Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { UserCard } from '@/components/UserCard';
import { UserCardSkeleton } from '@/components/UserCardSkeleton';
import { AddUserForm } from '@/components/AddUserForm';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { usersApi, User } from '@/api';
import { useToast } from '@/hooks/use-toast';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (name: string) => {
    setIsCreating(true);
    try {
      const newUser = await usersApi.create({ name });
      setUsers((prev) => [...prev, newUser]);
      toast({
        title: 'User created',
        description: `${name} has been added successfully.`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create user. Please try again.',
        variant: 'destructive',
      });
      console.error('Error creating user:', err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
            Who's watching?
          </h1>
          <p className="text-muted-foreground">
            Select a profile to view their movie collection
          </p>
        </div>

        {/* Content */}
        {error ? (
          <ErrorState message={error} onRetry={fetchUsers} />
        ) : isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        ) : users.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No profiles yet"
            description="Create your first profile to start building a movie collection."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-10">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <UserCard user={user} />
              </div>
            ))}
          </div>
        )}

        {/* Add User Form */}
        <div className="max-w-sm animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>
          <AddUserForm onSubmit={handleAddUser} isLoading={isCreating} />
        </div>
      </main>
    </div>
  );
}
