
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface VideoPlayerProps {
  videoSrc: string;
  isAnalyzing: boolean;
  isGeneratingCommentary: boolean;
  commentaryAudioSrc: string | null;
  onPlay: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  isAnalyzing,
  isGeneratingCommentary,
  commentaryAudioSrc,
  onPlay
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const commentaryRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isCommentaryMuted, setIsCommentaryMuted] = useState(false);
  const [commentaryVolume, setCommentaryVolume] = useState(100);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [videoSrc]);

  useEffect(() => {
    if (commentaryRef.current) {
      commentaryRef.current.volume = commentaryVolume / 100;
      commentaryRef.current.muted = isCommentaryMuted;
    }
  }, [commentaryVolume, isCommentaryMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Sync commentary playback with video
  useEffect(() => {
    const video = videoRef.current;
    const commentary = commentaryRef.current;
    
    if (!video || !commentary) return;
    
    const syncPlayState = () => {
      if (isPlaying) {
        commentary.play().catch(() => {
          // Handle autoplay restrictions
        });
      } else {
        commentary.pause();
      }
    };
    
    const syncCurrentTime = () => {
      if (Math.abs(commentary.currentTime - video.currentTime) > 0.3) {
        commentary.currentTime = video.currentTime;
      }
    };
    
    video.addEventListener('play', syncPlayState);
    video.addEventListener('pause', syncPlayState);
    video.addEventListener('seeking', syncCurrentTime);
    
    return () => {
      video.removeEventListener('play', syncPlayState);
      video.removeEventListener('pause', syncPlayState);
      video.removeEventListener('seeking', syncCurrentTime);
    };
  }, [isPlaying, commentaryAudioSrc]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      onPlay();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value: number[]) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCommentaryMute = () => {
    setIsCommentaryMuted(!isCommentaryMuted);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="relative">
          <video 
            ref={videoRef}
            src={videoSrc}
            className="w-full h-auto"
            onEnded={() => setIsPlaying(false)}
          />
          
          {commentaryAudioSrc && (
            <audio ref={commentaryRef} src={commentaryAudioSrc} />
          )}
          
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-lg font-bold">جاري تحليل الفيديو...</p>
              </div>
            </div>
          )}
          
          {isGeneratingCommentary && !isAnalyzing && (
            <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full text-white text-sm font-medium flex items-center space-x-2 animate-pulse-glow">
              <span className="h-2 w-2 bg-red-500 rounded-full"></span>
              <span>جاري إنشاء التعليق الصوتي...</span>
            </div>
          )}
        </div>
        
        <div className="bg-card p-4 border-t">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={togglePlayPause}
                disabled={isAnalyzing}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex-1 mx-4">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration}
                  step={0.01}
                  onValueChange={handleTimeChange}
                  disabled={isAnalyzing}
                  className="cursor-pointer"
                />
              </div>
              
              <div className="text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  disabled={isAnalyzing}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(v) => setVolume(v[0])}
                    disabled={isAnalyzing || isMuted}
                  />
                </div>
                <span className="text-xs font-medium w-8">{volume}%</span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCommentaryMute}
                  disabled={isAnalyzing || !commentaryAudioSrc}
                >
                  {isCommentaryMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <div className="w-24">
                  <Slider
                    value={[commentaryVolume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(v) => setCommentaryVolume(v[0])}
                    disabled={isAnalyzing || isCommentaryMuted || !commentaryAudioSrc}
                  />
                </div>
                <span className="text-xs font-medium w-8">{commentaryVolume}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
