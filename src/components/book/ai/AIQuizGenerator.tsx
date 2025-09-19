'use client';

import { useState } from 'react';
import { useBook } from '@/contexts/BookContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { generateQuiz, GenerateQuizOutput } from '@/ai/flows/ai-quiz-generator';
import { AILoading, AIError } from './AIShared';
import { Sparkles, CheckCircle, XCircle, RotateCw, Loader2 } from 'lucide-react';

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
      <div className="space-y-4">
        {quiz.map((q, qIndex) => (
          <Card key={qIndex} className="bg-background">
            <CardHeader>
              <CardTitle>Question {qIndex + 1}</CardTitle>
              <CardDescription className='pt-2'>{q.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}
                disabled={quizState === 'submitted'}
                className="gap-3"
              >
                {q.options.map((option, oIndex) => {
                  const isCorrect = oIndex === q.correctAnswerIndex;
                  const isSelected = userAnswers[qIndex] === oIndex;
                  
                  return (
                  <Label
                    key={oIndex}
                    htmlFor={`q${qIndex}o${oIndex}`}
                    className={`flex items-center space-x-3 p-3 rounded-md border transition-colors cursor-pointer ${
                      quizState === 'submitted' && isCorrect ? 'border-green-500 bg-green-50' : ''
                    } ${
                      quizState === 'submitted' && isSelected && !isCorrect ? 'border-red-500 bg-red-50' : 'border-border'
                    } ${
                      quizState !== 'submitted' ? 'hover:bg-accent hover:border-primary' : ''
                    }`}
                  >
                    <RadioGroupItem value={String(oIndex)} id={`q${qIndex}o${oIndex}`} />
                    <span className="flex-1">{option}</span>
                    {quizState === 'submitted' && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {quizState === 'submitted' && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                  </Label>
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
    <div className='p-4'>
      <CardHeader>
        <CardTitle>Chapter Quiz</CardTitle>
        <CardDescription>Test your knowledge of "{currentChapter.title}".</CardDescription>
      </CardHeader>
      <CardContent>
        {quizState === 'idle' && (
            <div className="text-center p-8 border-dashed border-2 rounded-lg flex flex-col items-center gap-4">
                <p className="text-muted-foreground">Ready to test your knowledge?</p>
                <Button onClick={handleGenerateQuiz} disabled={quizState === 'generating'}>
                    {quizState === 'generating' ? (
                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                       <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {quizState === 'generating' ? 'Generating...' : 'Generate Quiz'}
                </Button>
            </div>
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
            <Card className="mt-6 bg-background">
                <CardHeader className="items-center text-center">
                    <CardTitle>Quiz Results</CardTitle>
                    <CardDescription>Here's how you did!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-center">{calculateScore().toFixed(0)}%</p>
                </CardContent>
                 <CardFooter>
                     <Button onClick={handleGenerateQuiz} className="w-full" variant="secondary" disabled={quizState === 'generating'}>
                        {quizState === 'generating' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <RotateCw className="mr-2 h-4 w-4" />
                        )}
                        {quizState === 'generating' ? 'Generating...' : 'Try Another Quiz'}
                    </Button>
                 </CardFooter>
            </Card>
        )}
      </CardContent>
    </div>
  );
}
