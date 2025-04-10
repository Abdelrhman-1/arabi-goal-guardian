
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface VideoUploaderProps {
  onVideoSelected: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
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
    if (!file.type.startsWith('video/')) {
      toast({
        title: "خطأ في تحميل الملف",
        description: "الرجاء اختيار ملف فيديو صالح",
        variant: "destructive"
      });
      return;
    }

    setVideoPreview(URL.createObjectURL(file));
    onVideoSelected(file);
    
    toast({
      title: "تم تحميل الفيديو بنجاح",
      description: `تم تحميل ${file.name}`
    });
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
    <Card className="w-full">
      <CardContent className="p-6">
        {!videoPreview ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="font-bold text-lg mb-2">قم بتحميل فيديو المباراة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  اسحب واسقط ملف الفيديو هنا أو اضغط لاختيار ملف
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-field hover:bg-field-dark"
              >
                اختيار فيديو
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
              />
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden">
            <video 
              src={videoPreview}
              className="w-full h-[200px] object-cover rounded-lg"
              controls
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearVideo}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUploader;
