'use client';

import { useState } from 'react';
import { useBook } from '@/contexts/BookContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateVideoExplanation } from '@/ai/flows/ai-video-explanation';
import { AILoading, AIError } from './AIShared';
import { Clapperboard } from 'lucide-react';

export function VideoExplainer() {
  const { selectedText } = useBook();
  const [videoDataUri, setVideoDataUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateVideo = async () => {
    if (!selectedText) return;

    setLoading(true);
    setError(null);
    setVideoDataUri('');

    try {
      const result = await generateVideoExplanation({ text: selectedText });
      setVideoDataUri(result.videoDataUri);
    } catch (e) {
      setError('Sorry, I had trouble generating the video. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <CardHeader>
        <CardTitle>Video Explainer</CardTitle>
        <CardDescription>Select text to generate a short video explanation.</CardDescription>
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
            <p>Highlight some text from the chapter to generate a video.</p>
          </div>
        )}

        <Button onClick={handleGenerateVideo} disabled={!selectedText || loading} className="w-full">
          <Clapperboard className="mr-2 h-4 w-4" />
          {loading ? 'Generating Video...' : 'Generate Video'}
        </Button>

        {error && <AIError message={error} />}
        
        {loading && <AILoading loadingText="Generating video... this may take up to a minute." />}

        {videoDataUri && (
          <div>
            <h3 className="font-semibold mb-2 text-sm">Video Explanation:</h3>
            <Card>
              <CardContent className="p-0 overflow-hidden rounded-lg">
                <video src={videoDataUri} controls className="w-full aspect-video" />
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </div>
  );
}
