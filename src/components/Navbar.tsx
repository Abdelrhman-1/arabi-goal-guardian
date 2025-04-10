
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">مبصر</Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/" className="hover:text-white/80 transition-colors">الرئيسية</Link>
          <Link to="/upload" className="hover:text-white/80 transition-colors">رفع فيديو</Link>
          <Link to="/demo" className="hover:text-white/80 transition-colors">جرب الآن</Link>
          <Link to="/about" className="hover:text-white/80 transition-colors">من نحن</Link>
          <Link to="/contact" className="hover:text-white/80 transition-colors">اتصل بنا</Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-foreground text-primary">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" className="block py-2 px-4 hover:bg-primary hover:text-primary-foreground rounded" onClick={toggleMenu}>الرئيسية</Link>
            <Link to="/upload" className="block py-2 px-4 hover:bg-primary hover:text-primary-foreground rounded" onClick={toggleMenu}>رفع فيديو</Link>
            <Link to="/demo" className="block py-2 px-4 hover:bg-primary hover:text-primary-foreground rounded" onClick={toggleMenu}>جرب الآن</Link>
            <Link to="/about" className="block py-2 px-4 hover:bg-primary hover:text-primary-foreground rounded" onClick={toggleMenu}>من نحن</Link>
            <Link to="/contact" className="block py-2 px-4 hover:bg-primary hover:text-primary-foreground rounded" onClick={toggleMenu}>اتصل بنا</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
