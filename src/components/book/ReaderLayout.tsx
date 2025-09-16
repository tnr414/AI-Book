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
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
             <SidebarTrigger className="md:hidden" />
            <h1 className="font-headline text-2xl font-semibold">Reader</h1>
          </header>
          <main className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <ChapterContent />
            </div>
            <div className="w-full max-w-md border-l bg-card flex-shrink-0 overflow-hidden">
              <AIPanel />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BookProvider>
  );
}
