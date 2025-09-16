'use client';

import { Upload, Book as BookIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AILoading } from '@/components/book/ai/AIShared';
import { processPdfAndCreateBook } from './actions';
import { useToast } from '@/hooks/use-toast';


export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      try {
        const newBookId = await processPdfAndCreateBook(formData);
        if (newBookId) {
          router.push(`/book/${newBookId}`);
        } else {
          throw new Error("Failed to create book.");
        }
      } catch (error) {
         toast({
          title: "Error Processing PDF",
          description: "There was an error processing your PDF. Please try again.",
          variant: "destructive"
         });
         console.error(error);
      }
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">AI Book Companion</h1>
        <p className="text-xl text-muted-foreground">
          Your personal AI-powered reading assistant.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookIcon className="h-6 w-6" />
              <span>Read the Sample</span>
            </CardTitle>
            <CardDescription>
              Explore the features with a classic: "Alice's Adventures in Wonderland".
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full">
              <Link href="/book/1">Open Sample Book</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-6 w-6" />
              <span>Create Your Own</span>
            </CardTitle>
            <CardDescription>
              Upload a PDF and we'll transform it into an interactive AI book.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="application/pdf"
              disabled={isPending}
            />
            {isPending ? (
              <AILoading loadingText="Converting to AI Book..." />
            ) : (
              <Button onClick={handleUploadClick} size="lg" className="w-full">
                Upload PDF
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
