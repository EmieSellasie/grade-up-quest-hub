
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Brain, Upload, Play, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface QuizGeneratorProps {
  onBack: () => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizGenerator = ({ onBack }: QuizGeneratorProps) => {
  const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const sampleQuiz: Question[] = [
    {
      id: "1",
      question: "What is the process by which plants make their own food?",
      options: ["Respiration", "Photosynthesis", "Digestion", "Circulation"],
      correctAnswer: 1
    },
    {
      id: "2",
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Jupiter", "Mars", "Saturn"],
      correctAnswer: 2
    },
    {
      id: "3",
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: 2
    }
  ];

  const generateQuiz = () => {
    // In a real implementation, this would analyze uploaded content and generate questions
    setCurrentQuiz(sampleQuiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(true);
    toast.success("Quiz generated from your study materials!");
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
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
    return currentQuiz.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-4xl font-bold text-white">Quiz Generator</h1>
          </div>
        </div>

        {!quizStarted && !showResults ? (
          // Quiz Setup
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Generate Quiz from Study Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-300 mb-6">
                    Upload your study materials and we'll generate a quiz for you
                  </p>
                  <Button 
                    onClick={generateQuiz}
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Generate Sample Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">How it works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 rounded-full p-2 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Upload Materials</h3>
                      <p className="text-gray-300 text-sm">Upload your study notes, textbooks, or documents</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 rounded-full p-2 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">AI Analysis</h3>
                      <p className="text-gray-300 text-sm">Our AI analyzes the content and generates relevant questions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 rounded-full p-2 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Take Quiz</h3>
                      <p className="text-gray-300 text-sm">Test your knowledge and track your progress</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : showResults ? (
          // Results View
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-4">
                    {getScore()}/{currentQuiz.length}
                  </div>
                  <p className="text-xl text-gray-300 mb-6">
                    {getScore() === currentQuiz.length ? "Perfect Score! 🎉" :
                     getScore() >= currentQuiz.length * 0.7 ? "Great Job! 👏" :
                     "Keep Studying! 📚"}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={restartQuiz}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      Retake Quiz
                    </Button>
                    <Button 
                      onClick={() => {
                        setQuizStarted(false);
                        setShowResults(false);
                      }}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      New Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer Review */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Review Answers</h3>
              {currentQuiz.map((question, index) => (
                <Card key={question.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {selectedAnswers[question.id] === question.correctAnswer ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex}
                              className={`p-2 rounded text-sm ${
                                optionIndex === question.correctAnswer 
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                  : selectedAnswers[question.id] === optionIndex && optionIndex !== question.correctAnswer
                                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                  : "bg-gray-500/20 text-gray-300"
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Quiz View
          <div className="space-y-6">
            {/* Progress */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Question {currentQuestionIndex + 1} of {currentQuiz.length}</span>
                  <span className="text-gray-300">
                    {Object.keys(selectedAnswers).length} answered
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  {currentQuiz[currentQuestionIndex]?.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedAnswers[currentQuiz[currentQuestionIndex]?.id]?.toString()}
                  onValueChange={(value) => 
                    handleAnswerSelect(currentQuiz[currentQuestionIndex].id, parseInt(value))
                  }
                >
                  {currentQuiz[currentQuestionIndex]?.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded hover:bg-white/5">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-white cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!selectedAnswers[currentQuiz[currentQuestionIndex]?.id]}
                className="bg-white text-black hover:bg-gray-200 disabled:opacity-50"
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
