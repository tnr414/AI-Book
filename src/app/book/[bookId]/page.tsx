import { ReaderLayout } from '@/components/book/ReaderLayout';
import { getBook } from '@/lib/book-data';
import { notFound } from 'next/navigation';

export default function BookPage({ params }: { params: { bookId: string } }) {
  const book = getBook(params.bookId);

  if (!book) {
    notFound();
  }

  return <ReaderLayout book={book} />;
}
