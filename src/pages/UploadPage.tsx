
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Headphones, Download, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import VideoUploader from "@/components/VideoUploader";

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleVideoSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleProcess = () => {
    if (!selectedFile) {
      toast({
        title: "لم يتم اختيار ملف",
        description: "الرجاء تحميل فيديو المباراة أولاً",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing (in a real application, this would call an API)
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      // Mocked audio URL - in a real implementation this would come from the backend
      setAudioUrl('https://example.com/sample-commentary.mp3');
      
      toast({
        title: "تم إنشاء التعليق الصوتي",
        description: "تم تحليل الفيديو وإنشاء التعليق الصوتي بنجاح."
      });
    }, 3000);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setIsComplete(false);
    setAudioUrl(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">رفع فيديو المباراة</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          قم بتحميل فيديو المباراة وسنقوم بتحليله وإنشاء تعليق صوتي عربي احترافي
        </p>
      </div>

      {!isComplete ? (
        <div className="space-y-6">
          <VideoUploader onVideoSelected={handleVideoSelected} />
          
          {selectedFile && !isProcessing && (
            <div className="flex justify-center">
              <Button
                onClick={handleProcess}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                إنشاء التعليق الصوتي
              </Button>
            </div>
          )}
          
          {isProcessing && (
            <Card className="border-primary/10">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <div>
                    <h3 className="font-bold text-lg">جاري تحليل الفيديو</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      نعمل على تحليل الفيديو وإنشاء تعليق صوتي احترافي، يرجى الانتظار...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="shadow-lg border-primary/10">
          <CardHeader className="text-center bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-2xl font-bold">تم إنشاء التعليق الصوتي بنجاح!</CardTitle>
            <CardDescription>
              يمكنك الآن الاستماع للتعليق أو تحميله
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <audio className="w-full" controls src={audioUrl || ''} />
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90" size="lg" onClick={() => audioUrl && window.open(audioUrl)}>
                  <Headphones className="ml-2" />
                  الاستماع للتعليق
                </Button>
                <Button variant="outline" className="flex-1" size="lg" onClick={() => audioUrl && window.open(audioUrl, '_blank')}>
                  <Download className="ml-2" />
                  تحميل الملف الصوتي
                </Button>
              </div>
              
              <Button variant="ghost" onClick={resetForm} className="mt-2">
                رفع فيديو آخر
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadPage;
