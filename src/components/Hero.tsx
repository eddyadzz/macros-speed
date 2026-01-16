import { Button } from './Button';
import { MaldivesMap } from './MaldivesMap';
import { MessageCircle, MapPin, Clock, Users } from 'lucide-react';

export function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/9607778899?text=Hello, I need speedboat transfer information', '_blank');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%233b82f6" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-950 leading-tight">
                Speedboat Transfers in <span className="text-orange-600">Maldives</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fast, safe, and comfortable speedboat transfers across Malé Atoll. Travel Maldives with reliable
                airport speedboat transfer services from Velana International Airport to your island paradise.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fast Service</h3>
                  <p className="text-sm text-gray-600">Flexible</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Group Friendly</h3>
                  <p className="text-sm text-gray-600">Flexible</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToBooking} size="lg" className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Book Your Transfer</span>
              </Button>
              <Button
                onClick={handleWhatsApp}
                variant="secondary"
                size="lg"
                className="flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>

          <div className="lg:h-[600px] h-[400px]">
            <MaldivesMap />
          </div>
        </div>
      </div>
    </section>
  );
}
