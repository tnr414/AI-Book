'use server';

import { addBook, Book } from '@/lib/book-data';
import { v4 as uuidv4 } from 'uuid';

export async function processPdfAndCreateBook(formData: FormData): Promise<string | null> {
    const file = formData.get('file') as File;
    if (!file) {
        return null;
    }

    const pdf = (await import('pdf-parse')).default;
    const fileBuffer = await file.arrayBuffer();
    const pdfData = await pdf(Buffer.from(fileBuffer));

    const newBook: Book = {
        id: uuidv4(),
        title: file.name.replace(/\.pdf$/i, ''),
        author: 'Uploaded Document',
        coverImageId: 'book-cover-1', // Using a placeholder cover
        chapters: [
            {
                id: 'chapter-1',
                title: 'Full Text',
                content: pdfData.text
            }
        ]
    };

    addBook(newBook);
    return newBook.id;
}
