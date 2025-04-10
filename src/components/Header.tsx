
import React from 'react';
import { FutbolIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary/90 to-primary text-white py-6 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-full">
              <FutbolIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">حارس الهدف العربي</h1>
              <p className="text-sm md:text-base opacity-90">نظام التعليق الصوتي الذكي لمباريات كرة القدم</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
              <span className="text-white/90 text-sm font-medium">تقنية الذكاء الاصطناعي في خدمة المكفوفين</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
