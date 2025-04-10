
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Loader2, FileVideo, X, Headphones, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "نوع الملف غير مدعوم",
        description: "يرجى تحميل ملف فيديو بصيغة MP4 أو MOV فقط."
      });
      return;
    }
    
    setSelectedFile(file);
    toast({
      title: "تم اختيار الملف",
      description: `تم اختيار: ${file.name}`
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleProcess = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    // Simulate processing
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">رفع فيديو المباراة</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="w-full">
          <CardContent className="p-6">
            {!selectedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center ${
                  isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">قم بتحميل فيديو المباراة</h3>
                    <p className="text-gray-500 mb-4">
                      اسحب واسقط ملف الفيديو هنا، أو انقر لاختيار ملف
                      <br />
                      <span className="text-xs">MP4 أو MOV فقط</span>
                    </p>
                  </div>
                  <label className="cursor-pointer">
                    <Button>اختيار ملف</Button>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="video/mp4,video/quicktime"
                    />
                  </label>
                </div>
              </div>
            ) : isComplete ? (
              <div className="text-center space-y-6 p-4">
                <div className="bg-green-50 text-green-700 p-4 rounded-md">
                  <h3 className="font-bold text-lg mb-2">تم إنشاء التعليق الصوتي بنجاح!</h3>
                  <p>يمكنك الآن الاستماع للتعليق أو تحميله</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                  <Button className="flex-1" onClick={() => audioUrl && window.open(audioUrl)}>
                    <Headphones className="ml-2" />
                    الاستماع للتعليق
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => audioUrl && window.open(audioUrl, '_blank')}>
                    <Download className="ml-2" />
                    تحميل الملف الصوتي
                  </Button>
                </div>
                
                <Button variant="ghost" onClick={resetForm} className="mt-4">
                  <X className="ml-2" size={16} />
                  رفع فيديو آخر
                </Button>
              </div>
            ) : (
              <div className="space-y-6 p-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <FileVideo className="h-10 w-10 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X size={20} />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleProcess} 
                  className="w-full" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري تحليل الفيديو...
                    </>
                  ) : (
                    'إنشاء التعليق الصوتي'
                  )}
                </Button>
                
                {isProcessing && (
                  <div className="bg-primary/5 p-4 rounded-md">
                    <p className="text-sm text-center">جاري تحليل الفيديو وإنشاء التعليق الصوتي، يرجى الانتظار...</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadPage;
