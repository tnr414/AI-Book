import { Cover } from '@/components/book/Cover';
import { getBook } from '@/lib/book-data';

export default function Home() {
  const book = getBook('1');

  if (!book) {
    return <div>Book not found</div>;
  }

  return <Cover book={book} />;
}
