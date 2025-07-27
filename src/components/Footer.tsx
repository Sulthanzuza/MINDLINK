import React from 'react';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from '/logo.png'
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-48 h-48   flex items-center justify-center">
              <img src={Logo} alt="" />
              </div>
              <div>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-md leading-relaxed">
              Empowering students to achieve their dreams through world-class education opportunities. 
              We believe every student deserves access to quality international education.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-green-600" />
                <span>info@eduglobal.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-green-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>123 Education Street, Global City, GC 12345</span>
              </div>
            </div>
          </div>

          {/* Right Side - Links & Social */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Study Destinations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Scholarship Guide</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Visa Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Test Preparation</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Admissions Counseling</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Application Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Document Preparation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Interview Preparation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Pre-departure Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © {currentYear} EduGlobal. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;