import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us'},
    { name: 'Destinations', path: '/destination' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`
        fixed top-4 left-[10px] right-[10px] z-50
        border border-white/30
        bg-white/20 shadow-lg backdrop-blur-lg
        ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}
      `}
      style={{
        transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        transitionDuration: '500ms',
      }}
    >
      <div className="mx-auto px-6 py-1.5">
        <nav className="flex items-center justify-between">
        
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
             <img src='./logo (5).png' alt="mindlink global" />
            </div> 
            <span className="text-xl font-bold text-white mix-blend-difference">MindLink Global</span>
          </Link>

 
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 mix-blend-difference hover:text-green-600 transition-all duration-300 font-medium tracking-wider hover:tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>


          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
