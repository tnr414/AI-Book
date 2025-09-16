'use client';

import { useState } from 'react';
import { useBook } from '@/contexts/BookContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { generateQuiz, GenerateQuizOutput } from '@/ai/flows/ai-quiz-generator';
import { AILoading, AIError } from './AIShared';
import { Sparkles, CheckCircle, XCircle } from 'lucide-react';

type QuizState = 'idle' | 'generating' | 'taking' | 'submitted';
type UserAnswers = { [questionIndex: number]: number };

export function AIQuizGenerator() {
  const { book, currentChapterIndex } = useBook();
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [quiz, setQuiz] = useState<GenerateQuizOutput['quiz'] | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [error, setError] = useState<string | null>(null);

  const currentChapter = book.chapters[currentChapterIndex];

  const handleGenerateQuiz = async () => {
    setQuizState('generating');
    setError(null);
    setQuiz(null);
    setUserAnswers({});

    try {
      const result = await generateQuiz({
        chapterText: currentChapter.content,
        chapterNumber: currentChapterIndex + 1,
      });
      setQuiz(result.quiz);
      setQuizState('taking');
    } catch (e) {
      setError('Sorry, I had trouble creating the quiz. Please try again.');
      setQuizState('idle');
      console.error(e);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleSubmit = () => {
    setQuizState('submitted');
  };
  
  const calculateScore = () => {
    if (!quiz) return 0;
    let correct = 0;
    quiz.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswerIndex) {
            correct++;
        }
    });
    return (correct / quiz.length) * 100;
  }

  const renderQuiz = () => {
    if (!quiz) return null;

    return (
      <div className="space-y-6">
        {quiz.map((q, qIndex) => (
          <Card key={qIndex}>
            <CardHeader>
              <CardTitle>Question {qIndex + 1}</CardTitle>
              <CardDescription>{q.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}
                disabled={quizState === 'submitted'}
              >
                {q.options.map((option, oIndex) => {
                  const isCorrect = oIndex === q.correctAnswerIndex;
                  const isSelected = userAnswers[qIndex] === oIndex;
                  
                  return (
                  <div
                    key={oIndex}
                    className={`flex items-center space-x-2 p-2 rounded-md ${
                      quizState === 'submitted' && isCorrect ? 'bg-green-100 dark:bg-green-900' : ''
                    } ${
                      quizState === 'submitted' && isSelected && !isCorrect ? 'bg-red-100 dark:bg-red-900' : ''
                    }`}
                  >
                    <RadioGroupItem value={String(oIndex)} id={`q${qIndex}o${oIndex}`} />
                    <Label htmlFor={`q${qIndex}o${oIndex}`} className="flex-1 cursor-pointer">{option}</Label>
                    {quizState === 'submitted' && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {quizState === 'submitted' && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                  </div>
                )}
                )}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Chapter Quiz</CardTitle>
        <CardDescription>Test your knowledge of "{currentChapter.title}".</CardDescription>
      </CardHeader>
      <CardContent>
        {quizState === 'idle' && (
          <Button onClick={handleGenerateQuiz} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Quiz
          </Button>
        )}
        
        {quizState === 'generating' && <AILoading loadingText="Generating your quiz..." />}
        {error && <AIError message={error} />}

        {(quizState === 'taking' || quizState === 'submitted') && quiz && (
          <>
            {renderQuiz()}
            {quizState === 'taking' && (
              <Button onClick={handleSubmit} className="w-full mt-6" disabled={Object.keys(userAnswers).length !== quiz.length}>
                Submit Answers
              </Button>
            )}
          </>
        )}

        {quizState === 'submitted' && (
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Quiz Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-bold text-center">Your Score: {calculateScore().toFixed(0)}%</p>
                </CardContent>
                 <CardFooter>
                     <Button onClick={handleGenerateQuiz} className="w-full">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Try Another Quiz
                    </Button>
                 </CardFooter>
            </Card>
        )}
      </CardContent>
    </Card>
  );
}
