import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

function Header({ onAgentFleetClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">YDP</span>
            </div>
            <span className="font-bold text-gray-900">Yadkin Data Partners</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={onAgentFleetClick}
              className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Agent Fleet
            </button>
            <button
              onClick={() => scrollToSection('tech-stack')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2"
              >
                Portfolio
              </button>
              <button
                onClick={() => { onAgentFleetClick(); setIsMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Agent Fleet
              </button>
              <button
                onClick={() => scrollToSection('tech-stack')}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2"
              >
                Capabilities
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;