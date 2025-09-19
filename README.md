# Intelligent Book

This is a Next.js application that transforms static books from PDF files into dynamic, interactive learning experiences, powered by generative AI.

## Features

- **PDF to AI Book Conversion**: Upload any PDF document and have it instantly converted into an interactive reader format.
- **AI Chat Assistant**: Ask questions about the chapter content and get instant, context-aware answers from an AI assistant.
- **Text Simplification**: Select any complex passage and let the AI re-explain it in simpler, easier-to-understand terms.
- **AI Video Explainer**: Highlight a section of text and generate a short, animated video explanation on the fly.
- **AI Quiz Generator**: Automatically create multiple-choice quizzes for any chapter to test your knowledge and reinforce learning.

## Tech Stack

- [Next.js](https://nextjs.org/) – React Framework
- [React](https://react.dev/) – UI Library
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind CSS](https://tailwindcss.com/) – CSS Framework
- [Shadcn/ui](https://ui.shadcn.com/) – Component Library
- [Genkit](https://firebase.google.com/docs/genkit) – AI Application Framework

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20 or later recommended)
- `npm` (or your preferred package manager like `yarn` or `pnpm`)
- A Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env` in the root of your project and add your Google AI API key:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### Running the Application

This project requires two processes to run concurrently: the Next.js web server and the Genkit AI development server.

1.  **Start the Next.js development server:**
    Open a terminal and run:
    ```bash
    npm run dev
    ```
    This will start the web application, typically on `http://localhost:9002`.

2.  **Start the Genkit development server:**
    Open a second terminal and run:
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit development server, which handles the AI flows.

Once both servers are running, you can access the application in your browser.

## How to Use the App

1.  **Navigate to the Landing Page:** Open your browser to `http://localhost:9002`.
2.  **Try the App:** Click the "Try for free" button to go to the main application page.
3.  **Choose an Option:**
    - **Open Sample Book:** Click to read "Alice's Adventures in Wonderland" and explore the AI features.
    - **Upload PDF:** Click to upload your own PDF. The app will process the file and create a new interactive book for you.
4.  **Interact with the AI:**
    - Once inside the reader, use the AI panel on the right to chat with the AI, simplify text, generate videos, or take quizzes.
    - To use the **Text Simplifier** or **Video Explainer**, simply highlight a piece of text in the chapter content.
