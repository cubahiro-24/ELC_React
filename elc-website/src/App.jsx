import React, { useState } from 'react';
import { Clock, Mail, Phone, MapPin, Facebook } from 'lucide-react';
import Navigation from './components/Navigation';
import ServiceCard from './components/ServiceCard';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      
      {/* Hero Section */}
      <section id="home" className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Gateway to Excellence in English Language Mastery
          </h1>
          <p className="text-xl mb-8">
            Quality English language education for personal and professional success since 1996
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50">
            Get Started
          </button>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold mb-2">Certified Programs</h3>
              <p className="text-gray-600">Accredited by the Ministry (Ordonnance Ministérielle N°530/078)</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold mb-2">Flexible Schedules</h3>
              <p className="text-gray-600">Convenient class times to fit your busy schedule</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold mb-2">Supportive Community</h3>
              <p className="text-gray-600">Join a network of motivated learners</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard 
              title="General English"
              description="Build a strong foundation in English with comprehensive coverage of reading, writing, speaking, and listening skills."
            />
            <ServiceCard 
              title="Professional English"
              description="Develop business-focused language skills including professional vocabulary and presentation techniques."
            />
            <ServiceCard 
              title="TOEFL & IELTS Preparation"
              description="Comprehensive preparation for international English proficiency exams."
            />
            <ServiceCard 
              title="Document Translation"
              description="Professional translation services for academic, professional, and legal documents."
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-600" />
                <span>+257 22 21 79</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-600" />
                <span>elcbuj@yahoo.fr</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-blue-600" />
                <span>Avenue Prince Louis Rwagasore, Bujumbura</span>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="text-blue-600" />
                <div>
                  <p>Monday-Friday: 8:00 am - 8:00 pm</p>
                  <p>Saturday: 11:00 am - 1:00 pm</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Facebook className="text-blue-600" />
                <span>English Language Center – ELC</span>
              </div>
            </div>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border rounded-lg"
              ></textarea>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 English Language Center (ELC). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;