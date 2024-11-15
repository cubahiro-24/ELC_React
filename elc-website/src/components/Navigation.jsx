import React from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ isOpen, setIsOpen }) => (
  <nav className="bg-blue-600 text-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <span className="font-bold text-xl">APLA-ELC</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-blue-200">Home</a>
          <a href="#about" className="hover:text-blue-200">About</a>
          <a href="#services" className="hover:text-blue-200">Services</a>
          <a href="#contact" className="hover:text-blue-200">Contact</a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
    
    {/* Mobile Navigation */}
    {isOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#home" className="block px-3 py-2 hover:bg-blue-700">Home</a>
          <a href="#about" className="block px-3 py-2 hover:bg-blue-700">About</a>
          <a href="#services" className="block px-3 py-2 hover:bg-blue-700">Services</a>
          <a href="#contact" className="block px-3 py-2 hover:bg-blue-700">Contact</a>
        </div>
      </div>
    )}
  </nav>
);

export default Navigation;