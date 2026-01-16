import { MessageCircle, Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-blue-950 rounded-lg flex items-center justify-center">
                <img src="/images/macros-speed-maldives.png" alt="Logo" className="w-7 h-7" />
                <svg className="hidden w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Macros <span className="text-blue-400">Speed</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for speedboat transfers in Maldives. We provide fast, safe, and comfortable
              speedboat transfer services across Malé Atoll, connecting Velana International Airport to beautiful
              island destinations.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/9607752330?text=Hello, I need speedboat transfer information"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/macros.speed"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/macros.speed/"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@macros.mv"
                className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('destinations')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Book Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Popular Routes</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 transition-colors">Airport to Maafushi</li>
              <li className="hover:text-blue-400 transition-colors">Airport to Gulhi</li>
              <li className="hover:text-blue-400 transition-colors">Airport to Thulusdhoo</li>
              <li className="hover:text-blue-400 transition-colors">Airport to Dhiffushi</li>
              <li className="hover:text-blue-400 transition-colors">Malé City Transfers</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p className="text-gray-400">
            {currentYear} Macros Speed. All rights reserved. Providing reliable speedboat transfer services
            across Maldives.
          </p>
          <p className="text-gray-900 mt-2">
            speedboat maldives, travel maldives, speed boat transfer maldives, male atoll speedboat,
            velana airport speedboat, maldives airport transfer
          </p>
        </div>
      </div>
    </footer>
  );
}
