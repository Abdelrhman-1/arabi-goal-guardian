
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">مبصر</h3>
            <p className="text-sm">عش المباراة... بدون رؤيتها</p>
            <p className="text-sm mt-2">منصة ذكية تمكن المكفوفين وضعاف البصر من الاستمتاع بمباريات كرة القدم</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link to="/upload" className="text-sm hover:text-primary transition-colors">رفع فيديو</Link></li>
              <li><Link to="/demo" className="text-sm hover:text-primary transition-colors">جرب الآن</Link></li>
              <li><Link to="/about" className="text-sm hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">اتصل بنا</h3>
            <p className="text-sm">لديك استفسار أو اقتراح؟</p>
            <Link to="/contact" className="text-sm text-primary hover:underline">تواصل معنا</Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm">
          <p>جميع الحقوق محفوظة © {currentYear} - مبصر</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
