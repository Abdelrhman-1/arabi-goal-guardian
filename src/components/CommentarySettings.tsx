
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface CommentarySettingsProps {
  commentaryStyle: string;
  setCommentaryStyle: (style: string) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  voiceGender: string;
  setVoiceGender: (gender: string) => void;
  detectPlayers: boolean;
  setDetectPlayers: (detect: boolean) => void;
}

const CommentarySettings: React.FC<CommentarySettingsProps> = ({
  commentaryStyle,
  setCommentaryStyle,
  intensity,
  setIntensity,
  voiceGender,
  setVoiceGender,
  detectPlayers,
  setDetectPlayers
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>إعدادات التعليق الصوتي</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>أسلوب التعليق</Label>
          <RadioGroup 
            value={commentaryStyle} 
            onValueChange={setCommentaryStyle}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional">احترافي (مثل عصام الشوالي)</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="energetic" id="energetic" />
              <Label htmlFor="energetic">حماسي (مثل رؤوف خليف)</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="analytical" id="analytical" />
              <Label htmlFor="analytical">تحليلي (مثل حفيظ دراجي)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>حماسة التعليق</Label>
            <span className="text-sm text-muted-foreground">
              {intensity < 30 ? 'هادئ' : intensity < 70 ? 'متوسط' : 'حماسي جداً'}
            </span>
          </div>
          <Slider
            value={[intensity]}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => setIntensity(v[0])}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="voice-gender">اختيار صوت المعلق</Label>
          <Select value={voiceGender} onValueChange={setVoiceGender}>
            <SelectTrigger id="voice-gender">
              <SelectValue placeholder="اختر نوع الصوت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">صوت رجالي</SelectItem>
              <SelectItem value="female">صوت نسائي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="detect-players">التعرف على أسماء اللاعبين</Label>
          <Switch
            id="detect-players"
            checked={detectPlayers}
            onCheckedChange={setDetectPlayers}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentarySettings;
