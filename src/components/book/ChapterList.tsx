'use client';

import { useBook } from '@/contexts/BookContext';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function ChapterList() {
  const { book, currentChapterIndex, setCurrentChapterIndex } = useBook();

  return (
    <SidebarMenu>
      {book.chapters.map((chapter, index) => (
        <SidebarMenuItem key={chapter.id}>
          <SidebarMenuButton
            onClick={() => setCurrentChapterIndex(index)}
            isActive={index === currentChapterIndex}
          >
            <span className="truncate">{chapter.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
