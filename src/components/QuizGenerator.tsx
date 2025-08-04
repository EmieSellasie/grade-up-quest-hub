
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Brain, Play, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface QuizGeneratorProps {
  onBack: () => void;
}

interface Question {
  id: string;
  type: 'mcq' | 'blank';
  question: string;
  options?: string[];
  correctAnswer: number | string;
}

const QuizGenerator = ({ onBack }: QuizGeneratorProps) => {
  const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number | string}>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(50);
  const [includeBlankQuestions, setIncludeBlankQuestions] = useState(true);

  const generateQuiz = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for your quiz");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-quiz', {
        body: {
          topic: topic.trim(),
          questionCount,
          includeBlankQuestions
        }
      });

      if (error) throw error;

      if (data.questions && data.questions.length > 0) {
        setCurrentQuiz(data.questions);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        setQuizStarted(true);
        toast.success(`Generated ${data.questions.length} questions about ${topic}!`);
      } else {
        throw new Error("No questions generated");
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast.error("Failed to generate quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answer: number | string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
    const correctCount = currentQuiz.filter(q => 
      selectedAnswers[q.id] === q.correctAnswer
    ).length;
    toast.success(`Quiz completed! You scored ${correctCount}/${currentQuiz.length}`);
  };

  const getScore = () => {
    return currentQuiz.filter(q => {
      const userAnswer = selectedAnswers[q.id];
      const correctAnswer = q.correctAnswer;
      
      if (q.type === 'blank' && typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
        return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
      }
      return userAnswer === correctAnswer;
    }).length;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Quiz Generator</h1>
          </div>
        </div>

        {!quizStarted && !showResults ? (
          // Quiz Setup
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Create AI-Generated Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="topic">Quiz Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Biology, World History, Mathematics..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="questionCount">Number of Questions</Label>
                  <Input
                    id="questionCount"
                    type="number"
                    min="10"
                    max="100"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value) || 50)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeBlank"
                    checked={includeBlankQuestions}
                    onChange={(e) => setIncludeBlankQuestions(e.target.checked)}
                  />
                  <Label htmlFor="includeBlank">Include fill-in-the-blank questions</Label>
                </div>
                
                <Button 
                  onClick={generateQuiz}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Generate Quiz
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : showResults ? (
          // Results View
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4">
                    {getScore()}/{currentQuiz.length}
                  </div>
                  <p className="text-xl mb-6">
                    {getScore() === currentQuiz.length ? "Perfect Score! 🎉" :
                     getScore() >= currentQuiz.length * 0.7 ? "Great Job! 👏" :
                     "Keep Studying! 📚"}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={restartQuiz}>
                      Retake Quiz
                    </Button>
                    <Button 
                      onClick={() => {
                        setQuizStarted(false);
                        setShowResults(false);
                      }}
                      variant="outline"
                    >
                      New Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer Review */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Review Answers</h3>
              {currentQuiz.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const correctAnswer = question.correctAnswer;
                let isCorrect = false;
                
                if (question.type === 'blank' && typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
                  isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
                } else {
                  isCorrect = userAnswer === correctAnswer;
                }

                return (
                  <Card key={question.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {isCorrect ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">
                            {index + 1}. {question.question}
                          </h4>
                          
                          {question.type === 'mcq' && question.options ? (
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div 
                                  key={optionIndex}
                                  className={`p-2 rounded text-sm border ${
                                    optionIndex === question.correctAnswer 
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : selectedAnswers[question.id] === optionIndex && optionIndex !== question.correctAnswer
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : "bg-gray-50 text-gray-700 border-gray-200"
                                  }`}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-sm">
                                <span className="font-medium">Your answer:</span> {userAnswer || "No answer"}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Correct answer:</span> {correctAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          // Quiz View
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span>Question {currentQuestionIndex + 1} of {currentQuiz.length}</span>
                  <span className="text-gray-600">
                    {Object.keys(selectedAnswers).length} answered
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuiz[currentQuestionIndex]?.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentQuiz[currentQuestionIndex]?.type === 'mcq' ? (
                  <RadioGroup 
                    value={selectedAnswers[currentQuiz[currentQuestionIndex]?.id]?.toString()}
                    onValueChange={(value) => 
                      handleAnswerSelect(currentQuiz[currentQuestionIndex].id, parseInt(value))
                    }
                  >
                    {currentQuiz[currentQuestionIndex]?.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded hover:bg-gray-50">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    <Label>Your answer:</Label>
                    <Input
                      placeholder="Type your answer here..."
                      value={selectedAnswers[currentQuiz[currentQuestionIndex]?.id] as string || ""}
                      onChange={(e) => 
                        handleAnswerSelect(currentQuiz[currentQuestionIndex].id, e.target.value)
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!selectedAnswers[currentQuiz[currentQuestionIndex]?.id]}
              >
                {currentQuestionIndex === currentQuiz.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
