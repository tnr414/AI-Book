'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  MessageSquare,
  BookText,
  Video,
  ClipboardCheck,
} from 'lucide-react';
import { AIChatAssistant } from './ai/AIChatAssistant';
import { TextSimplifier } from './ai/TextSimplifier';
import { VideoExplainer } from './ai/VideoExplainer';
import { AIQuizGenerator } from './ai/AIQuizGenerator';
import { ScrollArea } from '../ui/scroll-area';

export function AIPanel() {
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="chat" className="flex flex-col h-full overflow-hidden">
        <TabsList className="grid w-full grid-cols-4 m-2">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="simplify">
            <BookText className="h-4 w-4" />
            <span className="sr-only">Simplify</span>
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="h-4 w-4" />
            <span className="sr-only">Video</span>
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <ClipboardCheck className="h-4 w-4" />
            <span className="sr-only">Quiz</span>
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <TabsContent value="chat" className="mt-0 p-4">
            <AIChatAssistant />
          </TabsContent>
          <TabsContent value="simplify" className="mt-0 p-4">
            <TextSimplifier />
          </TabsContent>
          <TabsContent value="video" className="mt-0 p-4">
            <VideoExplainer />
          </TabsContent>
          <TabsContent value="quiz" className="mt-0 p-4">
            <AIQuizGenerator />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
