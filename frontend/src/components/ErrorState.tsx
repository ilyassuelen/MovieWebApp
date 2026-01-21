import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Could not load data. Please try again.',
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Something went wrong
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="lg">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
