
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import VideoUploader from '@/components/VideoUploader';
import VideoPlayer from '@/components/VideoPlayer';
import CommentarySettings from '@/components/CommentarySettings';
import EventLog, { MatchEvent } from '@/components/EventLog';
import LiveCommentary from '@/components/LiveCommentary';
import { analyzeVideo } from '@/services/commentaryService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingCommentary, setIsGeneratingCommentary] = useState(false);
  const [commentaryAudioUrl, setCommentaryAudioUrl] = useState<string | null>(null);
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Settings
  const [commentaryStyle, setCommentaryStyle] = useState('professional');
  const [intensity, setIntensity] = useState(70);
  const [voiceGender, setVoiceGender] = useState('male');
  const [detectPlayers, setDetectPlayers] = useState(true);
  
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const handleVideoSelected = (file: File) => {
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setCommentaryAudioUrl(null);
    setMatchEvents([]);
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
    
    if (videoFile && !commentaryAudioUrl && !isAnalyzing) {
      handleAnalyzeVideo();
    }
  };

  const handleAnalyzeVideo = async () => {
    if (!videoFile) {
      toast({
        title: "خطأ",
        description: "الرجاء تحميل فيديو أولاً",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      
      const settings = {
        commentaryStyle,
        intensity,
        voiceGender,
        detectPlayers
      };
      
      // In a real implementation, this would actually analyze the video
      const result = await analyzeVideo(videoFile, settings);
      
      setMatchEvents(result.events);
      setCommentaryAudioUrl(result.commentaryAudioUrl);
      
      setIsAnalyzing(false);
      setIsGeneratingCommentary(true);
      
      // Simulate completing the commentary generation after some time
      setTimeout(() => {
        setIsGeneratingCommentary(false);
        toast({
          title: "تم بنجاح!",
          description: "تم إنشاء التعليق الصوتي للمباراة",
        });
      }, 3000);
      
    } catch (error) {
      setIsAnalyzing(false);
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل الفيديو",
        variant: "destructive"
      });
    }
  };

  const handleEventClick = (time: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {!videoUrl ? (
              <VideoUploader onVideoSelected={handleVideoSelected} />
            ) : (
              <>
                <VideoPlayer 
                  videoSrc={videoUrl}
                  isAnalyzing={isAnalyzing}
                  isGeneratingCommentary={isGeneratingCommentary}
                  commentaryAudioSrc={commentaryAudioUrl}
                  onPlay={handlePlayVideo}
                />
                
                <LiveCommentary 
                  currentTime={currentTime}
                  isPlaying={isPlaying}
                />
              </>
            )}
          </div>
          
          <div className="space-y-6">
            <CommentarySettings
              commentaryStyle={commentaryStyle}
              setCommentaryStyle={setCommentaryStyle}
              intensity={intensity}
              setIntensity={setIntensity}
              voiceGender={voiceGender}
              setVoiceGender={setVoiceGender}
              detectPlayers={detectPlayers}
              setDetectPlayers={setDetectPlayers}
            />
            
            <EventLog 
              events={matchEvents}
              currentTime={currentTime}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
