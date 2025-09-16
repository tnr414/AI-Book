'use server';

/**
 * @fileOverview AI Video Explanation Flow.
 *
 * This file defines a Genkit flow that takes a text passage and generates a short video explanation.
 * It includes the flow definition, input/output schemas, and a wrapper function.
 *
 * @file        ai-video-explanation.ts
 * @interface   AIVideoExplanationInput
 * @interface   AIVideoExplanationOutput
 * @function    generateVideoExplanation - Wrapper function to call the AIVideoExplanation flow
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import * as fs from 'fs';
import { Readable } from 'stream';
import { MediaPart } from 'genkit';

const AIVideoExplanationInputSchema = z.object({
  text: z
    .string()
    .describe('The text passage to generate a video explanation for.'),
});

export type AIVideoExplanationInput = z.infer<
  typeof AIVideoExplanationInputSchema
>;

const AIVideoExplanationOutputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      'A data URI containing the video explanation in MP4 format.'
    ),
});

export type AIVideoExplanationOutput = z.infer<
  typeof AIVideoExplanationOutputSchema
>;


export async function generateVideoExplanation(
  input: AIVideoExplanationInput
): Promise<AIVideoExplanationOutput> {
  return aiVideoExplanationFlow(input);
}


const aiVideoExplanationFlow = ai.defineFlow(
  {
    name: 'aiVideoExplanationFlow',
    inputSchema: AIVideoExplanationInputSchema,
    outputSchema: AIVideoExplanationOutputSchema,
  },
  async input => {
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: input.text,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes. Note that this may take some time, maybe even up to a minute. Design the UI accordingly.
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      // Sleep for 5 seconds before checking again.
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video');
    }

    const videoDataUri = await downloadVideo(video);

    return {
      videoDataUri: videoDataUri,
    };
  }
);

async function downloadVideo(video: MediaPart): Promise<string> {
  const fetch = (await import('node-fetch')).default;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'process.env.GEMINI_API_KEY is required to download the video'
    );
  }
  // Add API key before fetching the video.
  const videoDownloadResponse = await fetch(
    `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
  );
  if (
    !videoDownloadResponse ||
    videoDownloadResponse.status !== 200 ||
    !videoDownloadResponse.body
  ) {
    throw new Error('Failed to fetch video');
  }

  const buffer = await videoDownloadResponse.arrayBuffer();
  const base64Video = Buffer.from(buffer).toString('base64');
  return `data:video/mp4;base64,${base64Video}`;
}



