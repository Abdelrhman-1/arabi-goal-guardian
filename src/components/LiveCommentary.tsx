
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCommentaryText } from "@/services/commentaryService";
import { CommentaryIcon } from './Icons';

interface LiveCommentaryProps {
  currentTime: number;
  isPlaying: boolean;
}

const LiveCommentary: React.FC<LiveCommentaryProps> = ({ currentTime, isPlaying }) => {
  const [commentaryText, setCommentaryText] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    // Check for commentary at the current time
    const text = getCommentaryText(currentTime);
    
    if (text) {
      setCommentaryText(text);
      setIsActive(true);
      
      // Reset active state after commentary duration
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentTime, isPlaying]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <CommentaryIcon className="h-5 w-5" />
          <span>التعليق الصوتي المباشر</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`min-h-24 flex items-center justify-center p-4 rounded-md border ${
          isActive ? 'bg-primary/10 border-primary' : 'bg-muted/30 border-transparent'
        } transition-all duration-300`}>
          {commentaryText ? (
            <p className={`text-xl font-bold text-center ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}>
              "{commentaryText}"
            </p>
          ) : (
            <p className="text-muted-foreground text-center">
              سيظهر هنا النص العربي للتعليق الصوتي
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveCommentary;
