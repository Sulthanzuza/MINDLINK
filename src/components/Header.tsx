import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Declare navigation links as an array of objects
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
        transition-all duration-500
        ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}
      `}
    >
      <div className="mx-auto px-6 py-1.5">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10  rounded-full flex items-center justify-center">
             <img src='/Logo (5).png' alt="mindlink global" />
            </div>
            <span className="text-xl font-bold text-white">MindLink Global</span>
          </Link>

          {/* Desktop Navigation - Mapped from the array */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-green-600 transition-all duration-300 font-medium tracking-wider hover:tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu (conditionally rendered) - Also mapped from the array */}
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