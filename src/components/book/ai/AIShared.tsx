'use client';

import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AILoading({ loadingText = 'Loading...' }: { loadingText?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-muted-foreground py-4">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{loadingText}</span>
    </div>
  );
}

export function AIError({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
