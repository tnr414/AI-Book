'use server';

/**
 * @fileOverview Implements the AI Chat Assistant flow for answering questions about a specific chapter of a book.
 *
 * - aiChatAssistant - A function that takes chapter content and a question, and returns an AI-generated answer.
 * - AIChatAssistantInput - The input type for the aiChatAssistant function.
 * - AIChatAssistantOutput - The return type for the aiChatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistantInputSchema = z.object({
  chapterContent: z
    .string()
    .describe('The text content of the current chapter.'),
  question: z.string().describe('The user question about the chapter.'),
});
export type AIChatAssistantInput = z.infer<typeof AIChatAssistantInputSchema>;

const AIChatAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the question.'),
});
export type AIChatAssistantOutput = z.infer<typeof AIChatAssistantOutputSchema>;

export async function aiChatAssistant(input: AIChatAssistantInput): Promise<AIChatAssistantOutput> {
  return aiChatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about a book chapter.
  Use the provided chapter content to answer the user's question.
  If the answer is not in the chapter, say you do not know.

  Chapter Content:
  {{chapterContent}}

  Question: {{question}}

  Answer: `,
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
