import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Play, Pause, Volume2, FileText } from "lucide-react";
import { toast } from "sonner";

interface TextToSpeechProps {
  onBack: () => void;
}

const TextToSpeech = ({ onBack }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        content: "This is a sample text content extracted from the uploaded file. In a real implementation, you would extract text from PDF, DOCX, or other file formats using appropriate libraries."
      };
      
      setUploadedFiles([...uploadedFiles, newFile]);
      toast.success(`File "${file.name}" uploaded successfully!`);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (!text) {
      toast.error("No text to read!");
      return;
    }

    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          setIsPlaying(false);
          toast.error("Speech synthesis failed!");
        };
        
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setCurrentText(text);
      }
    } else {
      toast.error("Text-to-speech not supported in this browser!");
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
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
          <h1 className="text-2xl font-bold text-white">Text-to-Speech</h1>
        </div>

        {/* Upload Section */}
        <Card className="bg-white rounded-2xl shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center text-lg">
              <Upload className="mr-2 h-5 w-5" />
              Upload Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <FileText className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <p className="text-gray-600 mb-4 text-sm">
                Upload PDF, DOCX, or TXT files to have them read aloud
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
          </CardContent>
        </Card>

        {/* Current Playback */}
        {isPlaying && (
          <Card className="bg-white rounded-2xl shadow-lg mb-6 border-l-4 border-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-gray-900 font-medium">Currently Playing...</span>
                </div>
                <Button 
                  onClick={stopSpeech}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10 rounded-lg"
                >
                  <Pause className="mr-1 h-4 w-4" />
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Uploaded Files */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Uploaded Documents</h2>
          {uploadedFiles.length === 0 ? (
            <Card className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600">No files uploaded yet</p>
                <p className="text-gray-500 text-sm">Upload a document to get started</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="bg-white rounded-2xl shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{file.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {(file.size / 1024).toFixed(1)} KB • {file.type}
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleTextToSpeech(file.content)}
                        className="bg-primary text-white hover:bg-primary/90 rounded-lg"
                        disabled={isPlaying}
                        size="sm"
                      >
                        {isPlaying && currentText === file.content ? (
                          <>
                            <Pause className="mr-1 h-4 w-4" />
                            Playing
                          </>
                        ) : (
                          <>
                            <Play className="mr-1 h-4 w-4" />
                            Play
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 max-h-20 overflow-y-auto">
                      <p className="text-gray-700 text-sm">{file.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;