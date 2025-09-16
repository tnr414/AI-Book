// Text Simplification Flow
'use server';

/**
 * @fileOverview Text simplification AI agent.
 *
 * - simplifyText - A function that simplifies the given text.
 * - SimplifyTextOutput - The output type for the simplifyText function.
 * - SimplifyTextInput - The input type for the simplifyText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyTextInputSchema = z.object({
  text: z.string().describe('The text to be simplified.'),
});
export type SimplifyTextInput = z.infer<typeof SimplifyTextInputSchema>;

const SimplifyTextOutputSchema = z.object({
  simplifiedText: z.string().describe('The simplified version of the input text.'),
});
export type SimplifyTextOutput = z.infer<typeof SimplifyTextOutputSchema>;

export async function simplifyText(input: SimplifyTextInput): Promise<SimplifyTextOutput> {
  return simplifyTextFlow(input);
}

const simplifyTextPrompt = ai.definePrompt({
  name: 'simplifyTextPrompt',
  input: {schema: SimplifyTextInputSchema},
  output: {schema: SimplifyTextOutputSchema},
  prompt: `Please simplify the following text so that it is easier to understand:

Text: {{{text}}}`,
});

const simplifyTextFlow = ai.defineFlow(
  {
    name: 'simplifyTextFlow',
    inputSchema: SimplifyTextInputSchema,
    outputSchema: SimplifyTextOutputSchema,
  },
  async input => {
    const {output} = await simplifyTextPrompt(input);
    return output!;
  }
);
