'use client';

import { useState } from 'react';
import { useBook } from '@/contexts/BookContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { simplifyText } from '@/ai/flows/text-simplification';
import { AILoading, AIError } from './AIShared';
import { Wand2, Loader2 } from 'lucide-react';

export function TextSimplifier() {
  const { selectedText } = useBook();
  const [simplifiedText, setSimplifiedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimplify = async () => {
    if (!selectedText) return;

    setLoading(true);
    setError(null);
    setSimplifiedText('');

    try {
      const result = await simplifyText({ text: selectedText });
      setSimplifiedText(result.simplifiedText);
    } catch (e) {
      setError('Sorry, I had trouble simplifying the text. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <CardHeader>
        <CardTitle>Text Simplifier</CardTitle>
        <CardDescription>Select text in the chapter to simplify it here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedText ? (
          <Card className="bg-background">
            <CardContent className="p-4">
              <p className="italic text-sm">"{selectedText}"</p>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-sm text-muted-foreground p-8 border-dashed border-2 rounded-lg">
            <p>Highlight some text from the chapter to get started.</p>
          </div>
        )}

        <Button onClick={handleSimplify} disabled={!selectedText || loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Simplifying...' : 'Simplify Text'}
        </Button>

        {error && <AIError message={error} />}
        
        {loading && !simplifiedText && <AILoading />}

        {simplifiedText && (
          <div>
            <h3 className="font-semibold mb-2 text-sm">Simplified Version:</h3>
            <Card className="bg-background">
              <CardContent className="p-4">
                <p>{simplifiedText}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </div>
  );
}
