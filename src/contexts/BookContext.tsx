'use client';

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import type { Book } from '@/lib/book-data';

interface BookContextType {
  book: Book;
  currentChapterIndex: number;
  setCurrentChapterIndex: (index: number) => void;
  selectedText: string;
  setSelectedText: (text: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({
  children,
  bookData,
}: {
  children: ReactNode;
  bookData: Book;
}) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedText, setSelectedText] = useState('');

  const value = useMemo(
    () => ({
      book: bookData,
      currentChapterIndex,
      setCurrentChapterIndex,
      selectedText,
      setSelectedText,
    }),
    [bookData, currentChapterIndex, selectedText]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export const useBook = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};
