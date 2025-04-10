
import { MatchEvent } from "@/components/EventLog";
import { generateId } from "@/lib/utils";

// Since we can't actually analyze videos in the browser,
// we'll simulate the process with mock data and timeouts

// Mock data for football events
const mockEvents: MatchEvent[] = [
  {
    id: generateId(),
    time: 5.5,
    type: 'pass',
    description: 'تمريرة رائعة من فهد إلى أحمد على الجهة اليمنى',
  },
  {
    id: generateId(),
    time: 12.2,
    type: 'shot',
    description: 'تسديدة قوية من أحمد خارج منطقة الجزاء',
  },
  {
    id: generateId(),
    time: 18.7,
    type: 'corner',
    description: 'ركلة ركنية للفريق الأزرق من الجهة اليسرى',
  },
  {
    id: generateId(),
    time: 25.3,
    type: 'goal',
    description: 'هدف أول للفريق الأحمر! تسديدة رائعة من محمد',
  },
  {
    id: generateId(),
    time: 35.8,
    type: 'foul',
    description: 'خطأ على خالد في وسط الملعب',
  },
  {
    id: generateId(),
    time: 42.1,
    type: 'save',
    description: 'تصدي رائع من حارس المرمى للفريق الأزرق',
  },
  {
    id: generateId(),
    time: 50.6,
    type: 'offside',
    description: 'تسلل على مهاجم الفريق الأحمر',
  }
];

// Mock audio commentary segments (would be generated in real-time in a real system)
const mockCommentarySegments = [
  {
    startTime: 5,
    text: "تمريرة رائعة من فهد إلى أحمد على الجهة اليمنى!"
  },
  {
    startTime: 12,
    text: "تسديدة قوية من أحمد خارج منطقة الجزاء!"
  },
  {
    startTime: 18,
    text: "ركلة ركنية الآن للفريق الأزرق من الجهة اليسرى."
  },
  {
    startTime: 25,
    text: "تسديدة قوية... وهدف! هدف أول للفريق الأحمر!"
  },
  {
    startTime: 35,
    text: "خطأ على خالد في وسط الملعب، الحكم يعطي ضربة حرة."
  },
  {
    startTime: 42,
    text: "تصدي رائع من حارس المرمى للفريق الأزرق!"
  },
  {
    startTime: 50,
    text: "الحكم يرفع الراية، تسلل على مهاجم الفريق الأحمر."
  }
];

export interface AnalysisResult {
  events: MatchEvent[];
  commentaryAudioUrl: string;
}

export const analyzeVideo = (videoFile: File, settings: any): Promise<AnalysisResult> => {
  // In a real implementation, this would send the video to a backend service
  // for processing, or use a client-side ML model to analyze the video
  
  return new Promise((resolve) => {
    // Simulate video analysis with a timeout
    setTimeout(() => {
      // In a real implementation, this would create actual audio files
      // based on the detected events and settings.
      // For now, we'll use a mock MP3 URL.
      const commentaryAudioUrl = 'https://storage.googleapis.com/shared-public-txts/arabic_football_commentary_demo.mp3';
      
      resolve({
        events: mockEvents,
        commentaryAudioUrl
      });
    }, 5000); // Simulate 5 seconds of processing time
  });
};

export const getCommentaryText = (time: number): string | null => {
  // Find a commentary segment that matches the current time
  const segment = mockCommentarySegments.find(
    seg => time >= seg.startTime && time < seg.startTime + 3
  );
  
  return segment ? segment.text : null;
};
