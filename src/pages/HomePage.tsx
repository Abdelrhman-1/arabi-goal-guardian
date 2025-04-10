
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine, Cpu, Headphones } from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">مبصر</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">عش المباراة... بدون رؤيتها</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            منصة ذكية تمكن المكفوفين وضعاف البصر من الاستمتاع بمباريات كرة القدم من خلال تحويل الفيديو إلى تعليق صوتي عربي حي باستخدام الذكاء الاصطناعي
          </p>
          <Button 
            onClick={() => navigate('/upload')} 
            className="text-lg py-6 px-8"
            size="lg"
          >
            <ArrowUpFromLine className="ml-2 rtl:rotate-180" />
            رفع فيديو المباراة
          </Button>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">كيف يعمل مبصر؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUpFromLine className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. رفع فيديو المباراة</h3>
              <p className="text-gray-600">قم بتحميل فيديو مباراة كرة القدم الذي ترغب في تحويله إلى تعليق صوتي.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. تحليل اللقطات</h3>
              <p className="text-gray-600">يقوم الذكاء الاصطناعي بتحليل الفيديو واستخراج اللحظات المهمة في المباراة.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. الاستماع للتعليق</h3>
              <p className="text-gray-600">استمع إلى التعليق الصوتي العربي الاحترافي الذي يصف أحداث المباراة بالتفصيل.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">جرب مبصر الآن</h2>
          <p className="text-xl mb-8 opacity-90">استمع إلى نموذج من التعليق الصوتي لمباراة كرة قدم</p>
          <Button 
            onClick={() => navigate('/demo')} 
            variant="outline"
            className="text-lg py-6 px-8 border-white text-white hover:bg-white/10"
            size="lg"
          >
            <Headphones className="ml-2" />
            الاستماع للنموذج
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
