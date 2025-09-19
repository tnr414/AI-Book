'use client';

import { useRef } from 'react';
import { useBook } from '@/contexts/BookContext';
import { useTextSelection } from '@/hooks/useTextSelection';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ChapterContent() {
  const { book, currentChapterIndex, setSelectedText } = useBook();
  const contentRef = useRef<HTMLDivElement>(null);
  useTextSelection(contentRef, setSelectedText);

  const chapter = book.chapters[currentChapterIndex];

  if (!chapter) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground p-8 text-center">
        <p>Select a chapter from the menu to begin reading.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
        <div ref={contentRef} className="prose prose-lg max-w-none p-6 md:p-8 lg:p-12">
            <h2 className="font-headline text-4xl mb-6">{chapter.title}</h2>
            <p className="whitespace-pre-wrap text-lg leading-relaxed">{chapter.content}</p>
        </div>
    </ScrollArea>
  );
}
