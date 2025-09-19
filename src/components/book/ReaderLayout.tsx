'use client';

import type { Book } from '@/lib/book-data';
import { BookProvider } from '@/contexts/BookContext';
import { ChapterList } from './ChapterList';
import { ChapterContent } from './ChapterContent';
import { AIPanel } from './AIPanel';
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '../ui/button';

export function ReaderLayout({ book }: { book: Book }) {
  return (
    <BookProvider bookData={book}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <h2 className="font-headline text-xl font-bold truncate">{book.title}</h2>
          </SidebarHeader>
          <SidebarContent>
            <ChapterList />
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
            <div className='flex items-center gap-4'>
             <SidebarTrigger className="md:hidden" />
            <h1 className="font-headline text-2xl font-semibold hidden sm:block">Reader</h1>
            </div>
             <Button asChild variant="ghost" size="icon">
                <Link href="/">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                </Link>
             </Button>
          </header>
          <main className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-auto">
              <ChapterContent />
            </div>
            <div className="w-full max-w-sm border-l bg-card flex-shrink-0 overflow-hidden hidden md:flex">
              <AIPanel />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BookProvider>
  );
}
