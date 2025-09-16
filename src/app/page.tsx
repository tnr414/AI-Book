'use client';

import { Upload, Book as BookIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AILoading } from '@/components/book/ai/AIShared';
import { addBook, getBook } from '@/lib/book-data';

export default function Home() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // This is a mock function to simulate PDF processing
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // In a real app, you would process the PDF and generate the book data.
    // For this demo, we'll use a pre-defined second book.
    const newBook = getBook('2'); // The Great Gatsby
    if (newBook) {
      addBook(newBook); // Add it to our "database"
      router.push(`/book/${newBook.id}`);
    } else {
        // Handle case where book 2 is not found (though it should be)
        setIsUploading(false);
    }
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
            />
            {isUploading ? (
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