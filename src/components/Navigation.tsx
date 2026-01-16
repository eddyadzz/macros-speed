import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, Ship } from 'lucide-react';
import { Button } from './Button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/9607752330?text=Hello, I need speedboat transfer information', '_blank');
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Destinations', id: 'destinations' },
    { name: 'Book Now', id: 'booking' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                onClick={() => scrollToSection('home')}
                className="flex items-center space-x-3 group"
              >
                
                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <img src="/images/macros-speed-maldives.png" alt="Logo" className="w-7 h-7" />
                  <Ship className="w-7 h-7 text-white hidden" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-blue-900 leading-tight">
                    Macros <span className="text-orange-600">Speed</span>
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Fast & Reliable Transfers in Maldives
                  </span>
                </div>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center space-x-2 px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
              <Button onClick={() => scrollToSection('booking')} size="sm">
                Book Now
              </Button>
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <button
        onClick={handleWhatsApp}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </>
  );
}
