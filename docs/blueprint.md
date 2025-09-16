# **App Name**: AI Book Companion

## Core Features:

- PDF Upload and Text Extraction: Allows users to upload a PDF eBook and extracts the text content for AI processing. (Provide a sample PDF for testing)
- Cover Page and Content Table: Start with a cover page of the book with button to open book that takes user to Content Table (where we show chapter with clickable link)
- Chapter-wise Text Rendering: Displays the extracted book content chapter-wise in a scrollable format in the left panel.
- AI Chat Assistant: Enables users to ask questions about the current chapter, using vector search and Azure OpenAI or OpenAI API to provide answers.
- AI Video Explanation: User can select a text and generate video to explain the selected text (use a mock video if its not feasible)
- Explain Mode Toggle: Switches between reading (default), listening (text-to-speech via Azure Speech SDK), and watching (generates a video thumbnail placeholder linked to AI video generation API).
- Text Simplification: Allows users to select text and re-explain it in simpler terms using an AI tool.
- AI Quiz Generator: Generates multiple-choice quizzes for each chapter and provides instant feedback using AI evaluation. Stores extracted text and embeddings to Firestore database.

## Style Guidelines:

- Primary color: Light and airy blue (#A0D2EB) to evoke a sense of calm and intellectual curiosity, suitable for a learning environment.
- Background color: Very light gray (#F5F5F5), almost white, creating a clean and unobtrusive backdrop that highlights the book content.
- Accent color: Muted violet (#B19CD9), which is analogous to the light blue, adding a touch of creativity and contrast without being distracting.
- Body text and headline font: 'PT Sans', a humanist sans-serif providing a modern yet accessible feel suitable for both reading and headings.