
import React from 'react';
import { FutbolIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-field text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FutbolIcon className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">حارس الهدف العربي</h1>
            <p className="text-sm opacity-80">نظام التعليق الصوتي الذكي لمباريات كرة القدم</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
