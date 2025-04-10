
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/utils";

const DemoPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  // Sample video and audio URLs (replace with actual content)
  const demoVideoUrl = "https://storage.googleapis.com/shared-public-txts/arab_football_demo.mp4";
  const demoAudioUrl = "https://storage.googleapis.com/shared-public-txts/arabic_football_commentary_demo.mp3";

  const handlePlayPause = () => {
    if (!videoRef.current || !audioRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      audioRef.current.pause();
    } else {
      videoRef.current.play();
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleTimeChange = (value: number[]) => {
    if (!videoRef.current || !audioRef.current) return;
    
    const newTime = value[0];
    videoRef.current.currentTime = newTime;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audioRef.current.muted = newMutedState;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">جرب خدمة مبصر</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        شاهد نموذجًا توضيحيًا لكيفية عمل منصة مبصر. استمع إلى التعليق الصوتي العربي الذي ينتجه الذكاء الاصطناعي لمباراة كرة قدم.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <video 
                ref={videoRef}
                src={demoVideoUrl}
                className="w-full h-auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
              
              <audio 
                ref={audioRef}
                src={demoAudioUrl}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
            
            <div className="p-6 space-y-4 bg-card">
              <div className="flex items-center justify-between mb-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <div className="flex-1 mx-4">
                  <Slider
                    value={[currentTime]}
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={handleTimeChange}
                  />
                </div>
                
                <div className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <div className="w-32">
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
                
                <span className="text-sm">{volume}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">حول هذا النموذج</h2>
          <p className="text-gray-600 mb-4">
            هذا مجرد نموذج توضيحي لكيفية عمل خدمة مبصر. في النموذج الكامل، يقوم الذكاء الاصطناعي بتحليل الفيديو وإنتاج تعليق صوتي احترافي يصف ما يحدث في المباراة بشكل تفصيلي.
          </p>
          <p className="text-gray-600">
            يمكنك تجربة الخدمة بالكامل عن طريق رفع فيديو المباراة الخاص بك.
          </p>
          
          <Button 
            onClick={() => window.location.href = '/upload'} 
            className="mt-6"
          >
            جرب رفع فيديو خاص بك
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
