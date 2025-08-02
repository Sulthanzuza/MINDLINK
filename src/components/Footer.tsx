import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram} from 'lucide-react';
import { destinations } from '../data/destinations';

const Logo = '/logo.png'; 

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Add the CSS animation styles */}
      <style jsx>{`
        @keyframes blinkGreen {
          0%, 100% { color: inherit; }
          50% { color: #22c55e; }
        }
        .blink-green {
          animation: blinkGreen 3s infinite;
          transition: color 0.3s ease-in-out;
        }
      `}</style>
      
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
            
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center">
                <img src={Logo} alt="EduGlobal Logo" className="h-20 w-auto object-contain" />
              </div>
              
              <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                Empowering students to achieve their dreams through world-class education opportunities. 
              </p>

              <div className="space-y-3 text-sm">
                <a href="mailto:info@eduglobal.com" className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors">
                  <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>info@mindlinkglobal.in</span>
                </a>
                <a href="tel:+919539859689" className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors">
                  <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>+91 95 398 59 689</span>
                </a>
                <a href="tel:+918089717075" className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors">
                  <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>+91 80 897 17 075</span>
                </a>
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mindlink Global,Near Aaryas, Kallambalam, Trivandrum </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-base">Popular Destinations</h4>
                <ul className="space-y-2 text-sm">
                  {destinations.map((destination) => (
                    <li key={destination.name}>
                      <a href={'/destination'} className="text-gray-600 hover:text-green-600 transition-colors">
                       {destination.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-base">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about-us" className="text-gray-600 hover:text-green-600 transition-colors">About Us</a></li>
                  <li><a href="/destination" className="text-gray-600 hover:text-green-600 transition-colors">Destinations</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact Us</a></li>
                </ul>
              </div>
              
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 text-sm text-center md:text-left">
               © {currentYear} MindLink Global. All rights reserved. Powered by{' '}
               <a 
                 href="https://www.aieera.com/" 
                 className="font-semibold hover:text-green-600 transition-colors" 
                 target="_blank" 
                 rel="noopener noreferrer"
               >
                 <span className="blink-green">Aieera</span>
               </a>.
            </div>

            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/mindlinkedu/" 
                aria-label="Facebook" 
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 
                           hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a 
                href="https://www.instagram.com/mindlinkedu/" 
                aria-label="Instagram" 
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 
                           hover:bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
