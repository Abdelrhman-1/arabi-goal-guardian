
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatTime } from "@/lib/utils";

export interface MatchEvent {
  id: string;
  time: number;
  type: 'goal' | 'foul' | 'pass' | 'shot' | 'corner' | 'offside' | 'save' | 'other';
  description: string;
}

interface EventLogProps {
  events: MatchEvent[];
  currentTime: number;
  onEventClick: (time: number) => void;
}

const EventLog: React.FC<EventLogProps> = ({ events, currentTime, onEventClick }) => {
  const getEventTypeColor = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return 'bg-team-red text-white';
      case 'foul':
        return 'bg-yellow-500 text-black';
      case 'corner':
        return 'bg-blue-500 text-white';
      case 'shot':
        return 'bg-purple-500 text-white';
      case 'save':
        return 'bg-cyan-500 text-white';
      case 'offside':
        return 'bg-orange-500 text-white';
      case 'pass':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getEventTypeLabel = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return 'هدف';
      case 'foul':
        return 'خطأ';
      case 'corner':
        return 'ركنية';
      case 'shot':
        return 'تسديدة';
      case 'save':
        return 'تصدي';
      case 'offside':
        return 'تسلل';
      case 'pass':
        return 'تمريرة';
      default:
        return 'حدث';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>أحداث المباراة</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            لم يتم اكتشاف أحداث بعد. سيتم ظهور الأحداث هنا أثناء تحليل الفيديو.
          </p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    Math.abs(currentTime - event.time) < 2 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => onEventClick(event.time)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge className={getEventTypeColor(event.type)}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(event.time)}
                    </span>
                  </div>
                  <p className="text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default EventLog;
