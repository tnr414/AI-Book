import { Upload, Book as BookIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
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
              Upload a PDF and we'll transform it into an interactive AI book. (Coming Soon!)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full" disabled>
              Upload PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
