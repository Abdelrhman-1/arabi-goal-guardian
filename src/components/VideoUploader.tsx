
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, X, FileVideo, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface VideoUploaderProps {
  onVideoSelected: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "خطأ في تحميل الملف",
        description: "الرجاء اختيار ملف فيديو صالح بصيغة MP4 أو MOV",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setVideoPreview(URL.createObjectURL(file));
      onVideoSelected(file);
      setIsUploading(false);
      
      toast({
        title: "تم تحميل الفيديو بنجاح",
        description: `تم تحميل ${file.name}`,
      });
    }, 1500);
  };

  const clearVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full shadow-lg border-primary/10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">رفع فيديو المباراة</CardTitle>
        <CardDescription>قم بتحميل فيديو المباراة لإنشاء تعليق صوتي عربي</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {!videoPreview ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/20'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            tabIndex={0}
            role="button"
            aria-label="منطقة رفع الملفات"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">قم بتحميل فيديو المباراة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  اسحب واسقط ملف الفيديو هنا أو اضغط لاختيار ملف
                </p>
                <p className="text-xs text-muted-foreground">
                  يدعم صيغ: MP4، MOV (الحجم الأقصى: 100 ميجابايت)
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 scale-x-0 translate-x-0 group-hover:scale-x-100 group-hover:translate-x-0 rtl:translate-x-0 bg-white/20"></span>
                <Upload className="h-5 w-5 mr-2" />
                اختيار فيديو
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/mp4,video/quicktime"
                className="hidden"
                aria-label="رفع فيديو"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-muted">
              <video 
                src={videoPreview}
                className="w-full h-[240px] object-cover rounded-lg"
                controls
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-90 hover:opacity-100"
                onClick={clearVideo}
                aria-label="إزالة الفيديو"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center p-3 bg-primary/5 rounded-lg">
              <FileVideo className="h-10 w-10 text-primary mr-3" />
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">
                  {videoPreview.split('/').pop()}
                </p>
                <p className="text-sm text-muted-foreground">
                  جاهز للمعالجة
                </p>
              </div>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              size="lg"
              onClick={() => toast({
                title: "تم إرسال الفيديو للمعالجة",
                description: "سيتم إنشاء التعليق الصوتي قريبًا"
              })}
            >
              بدء معالجة الفيديو
            </Button>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-10">
            <div className="text-center space-y-3 p-6 bg-card rounded-lg shadow-lg border border-primary/10">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="font-medium">جاري رفع الفيديو...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUploader;
