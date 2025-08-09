import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Brain, Upload, Play, CheckCircle, XCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface QuizGeneratorProps {
  onBack: () => void;
}

interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: number | string;
  type: "multiple-choice" | "fill-in-blank";
}

const QuizGenerator = ({ onBack }: QuizGeneratorProps) => {
  const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number | string}>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.name.endsWith('.docx') && file.type !== "text/plain") {
        toast.error("Please upload a PDF, DOCX, or TXT file");
        return;
      }
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully!`);
    }
  };

  const generateQuizFromFile = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a file first");
      return;
    }

    setIsGenerating(true);

    try {
      // Prepare file data for the edge function
      let fileData;
      
      if (uploadedFile.type === "text/plain") {
        fileData = await uploadedFile.text();
      } else {
        // For PDF and DOCX files, we'll send the file as base64
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        fileData = base64;
      }

      // Call the Supabase edge function to generate quiz
      const response = await supabase.functions.invoke('generate-quiz', {
        body: { 
          file: fileData,
          fileType: uploadedFile.type,
          fileName: uploadedFile.name
        }
      });

      if (response.error) {
        console.error('Supabase function error:', response.error);
        if (response.error.message?.includes('quota') || response.error.message?.includes('billing')) {
          throw new Error("OpenAI API quota exceeded. Please check your OpenAI billing and try again.");
        } else {
          throw new Error(response.error.message || "Failed to generate quiz");
        }
      }

      const { questions } = response.data;
      
      if (!questions || !Array.isArray(questions)) {
        throw new Error("Invalid quiz format received");
      }

      setCurrentQuiz(questions);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
      setQuizStarted(true);
      toast.success(`Quiz generated with ${questions.length} questions from your document!`);
    } catch (error) {
      console.error('Quiz generation error:', error);
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
    const correctCount = currentQuiz.filter(q => {
      const userAnswer = selectedAnswers[q.id];
      if (q.type === "fill-in-blank") {
        return typeof userAnswer === "string" && 
               userAnswer.toLowerCase().trim() === q.correctAnswer.toString().toLowerCase().trim();
      } else {
        return userAnswer === q.correctAnswer;
      }
    }).length;
    toast.success(`Quiz completed! You scored ${correctCount}/${currentQuiz.length}`);
  };

  const getScore = () => {
    return currentQuiz.filter(q => {
      const userAnswer = selectedAnswers[q.id];
      if (q.type === "fill-in-blank") {
        return typeof userAnswer === "string" && 
               userAnswer.toLowerCase().trim() === q.correctAnswer.toString().toLowerCase().trim();
      } else {
        return userAnswer === q.correctAnswer;
      }
    }).length;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(true);
  };

  const resetToUpload = () => {
    setQuizStarted(false);
    setShowResults(false);
    setUploadedFile(null);
    setCurrentQuiz([]);
    setSelectedAnswers({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600 p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-8">
          <Button 
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10 p-2 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Quiz Generator</h1>
        </div>

        {!quizStarted && !showResults ? (
          // Quiz Setup
          <div className="space-y-6">
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center text-lg">
                  <Brain className="mr-2 h-5 w-5" />
                  Generate Quiz from Document
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-4 text-sm">
                    Upload a PDF, DOCX, or TXT file to generate quiz questions
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button 
                      className="bg-primary text-white hover:bg-primary/90 rounded-xl cursor-pointer"
                      asChild
                    >
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </span>
                    </Button>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={generateQuizFromFile}
                  disabled={!uploadedFile || isGenerating}
                  className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl py-3"
                >
                  {isGenerating ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
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

            <Card className="bg-white rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">How it works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Upload Document</h3>
                      <p className="text-gray-600 text-sm">Upload your study materials (PDF, DOCX, or TXT)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">AI Analysis</h3>
                      <p className="text-gray-600 text-sm">AI analyzes content and generates relevant questions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold">Take Quiz</h3>
                      <p className="text-gray-600 text-sm">Answer both multiple choice and fill-in-the-blank questions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : showResults ? (
          // Results View
          <div className="space-y-6">
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 text-xl text-center">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-4">
                    {getScore()}/{currentQuiz.length}
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    {getScore() === currentQuiz.length ? "Perfect Score! 🎉" :
                     getScore() >= currentQuiz.length * 0.7 ? "Great Job! 👏" :
                     "Keep Studying! 📚"}
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={restartQuiz}
                      className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl"
                    >
                      Retake Quiz
                    </Button>
                    <Button 
                      onClick={resetToUpload}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10 rounded-xl"
                    >
                      Upload New Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer Review */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Review Answers</h3>
              {currentQuiz.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = question.type === "fill-in-blank" 
                  ? typeof userAnswer === "string" && userAnswer.toLowerCase().trim() === question.correctAnswer.toString().toLowerCase().trim()
                  : userAnswer === question.correctAnswer;
                
                return (
                  <Card key={question.id} className="bg-white rounded-2xl shadow-sm">
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
                          <h4 className="text-gray-900 font-semibold mb-2">
                            {index + 1}. {question.question}
                          </h4>
                          {question.type === "multiple-choice" ? (
                            <div className="space-y-2">
                              {question.options?.map((option, optionIndex) => (
                                <div 
                                  key={optionIndex}
                                  className={`p-2 rounded-lg text-sm ${
                                    optionIndex === question.correctAnswer 
                                      ? "bg-green-50 text-green-700 border border-green-200"
                                      : userAnswer === optionIndex && optionIndex !== question.correctAnswer
                                      ? "bg-red-50 text-red-700 border border-red-200"
                                      : "bg-gray-50 text-gray-700"
                                  }`}
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="text-sm text-gray-600">Your answer:</div>
                              <div className={`p-2 rounded-lg text-sm ${
                                isCorrect ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                              }`}>
                                {userAnswer || "(No answer)"}
                              </div>
                              {!isCorrect && (
                                <>
                                  <div className="text-sm text-gray-600">Correct answer:</div>
                                  <div className="p-2 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200">
                                    {question.correctAnswer}
                                  </div>
                                </>
                              )}
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
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">Question {currentQuestionIndex + 1} of {currentQuiz.length}</span>
                  <span className="text-gray-600 text-sm">
                    {Object.keys(selectedAnswers).length} answered
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">
                  {currentQuiz[currentQuestionIndex]?.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentQuiz[currentQuestionIndex]?.type === "multiple-choice" ? (
                  <RadioGroup 
                    value={selectedAnswers[currentQuiz[currentQuestionIndex]?.id]?.toString()}
                    onValueChange={(value) => 
                      handleAnswerSelect(currentQuiz[currentQuestionIndex].id, parseInt(value))
                    }
                  >
                    {currentQuiz[currentQuestionIndex]?.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="text-gray-900 cursor-pointer flex-1">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your answer..."
                      value={selectedAnswers[currentQuiz[currentQuestionIndex]?.id] as string || ""}
                      onChange={(e) => handleAnswerSelect(currentQuiz[currentQuestionIndex].id, e.target.value)}
                      className="bg-gray-50 border-gray-200 rounded-xl"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between gap-4">
              <Button 
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/10 rounded-xl disabled:opacity-50"
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!selectedAnswers[currentQuiz[currentQuestionIndex]?.id]}
                className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-xl disabled:opacity-50"
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