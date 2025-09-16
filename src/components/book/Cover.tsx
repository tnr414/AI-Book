'use client';

import type { Book } from '@/lib/book-data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

type CoverProps = {
  book: Book;
};

export function Cover({ book }: CoverProps) {
  const coverImage = PlaceHolderImages.find((img) => img.id === book.coverImageId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-sm overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full">
            {coverImage && (
              <Image
                src={coverImage.imageUrl}
                alt={coverImage.description}
                fill
                priority
                className="object-cover"
                data-ai-hint={coverImage.imageHint}
              />
            )}
          </div>
          <div className="p-6 text-center">
            <h1 className="font-headline text-3xl font-bold text-foreground">{book.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{book.author}</p>
            <Button asChild size="lg" className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={`/book/${book.id}`}>
                Open Book
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
