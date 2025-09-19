'use client';

import { useState, useRef, useEffect } from 'react';
import { useBook } from '@/contexts/BookContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiChatAssistant } from '@/ai/flows/ai-chat-assistant';
import { AILoading, AIError } from './AIShared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, User, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatAssistant() {
  const { book, currentChapterIndex } = useBook();
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // @ts-ignore
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }
  }, [messages, loading]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    const currentChapter = book.chapters[currentChapterIndex];
    if (!currentChapter) return;

    const userMessage: Message = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    setError(null);

    try {
      const result = await aiChatAssistant({
        chapterContent: currentChapter.content,
        question: question,
      });
      const assistantMessage: Message = { role: 'assistant', content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      setError('Sorry, I had trouble getting an answer. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <CardHeader>
        <CardTitle>Chat Assistant</CardTitle>
        <CardDescription>Ask a question about the current chapter.</CardDescription>
      </CardHeader>
      <div className="flex-1 flex flex-col gap-4 overflow-hidden p-4 pt-0">
        <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg px-3 py-2 max-w-xs ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {loading && 
                <div className="flex items-start gap-3">
                     <Avatar className="h-8 w-8 border">
                         <AvatarFallback><Sparkles className="h-4 w-4 text-primary"/></AvatarFallback>
                     </Avatar>
                    <div className="rounded-lg px-3 py-2 bg-background">
                        <AILoading loadingText="Thinking..." />
                    </div>
                </div>
            }
          </div>
        </ScrollArea>
        <div className="mt-auto flex items-center gap-2 border-t pt-4">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="min-h-[40px] flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAskQuestion();
              }
            }}
            disabled={loading}
          />
          <Button onClick={handleAskQuestion} disabled={loading || !question.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {error && <AIError message={error} />}
      </div>
    </div>
  );
}
