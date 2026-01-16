import { Card } from './Card';
import { Clock, MapPin, Waves, Camera } from 'lucide-react';

export function Destinations() {
  const destinations = [
    {
      name: 'Maafushi Island',
      distance: '27 km from Velana Airport',
      duration: '30-40 minutes',
      description: 'Popular local island in Malé Atoll offering budget-friendly guesthouses, pristine beaches, and excellent snorkeling opportunities. Perfect for experiencing authentic Maldivian culture.',
      highlights: ['Snorkeling', 'Beach Resorts', 'Water Sports'],
      image: "/images/maafushi.jpg"
    },
    {
      name: 'Gulhi Island',
      distance: '18 km from Velana Airport',
      duration: '20-25 minutes',
      description: 'Charming inhabited island in South Malé Atoll known for beautiful coral reefs and relaxed atmosphere. Ideal speedboat destination for travelers seeking peaceful Maldives island experience.',
      highlights: ['Coral Reefs', 'Beach Activities', 'Local Culture'],
      image: "/images/gulhi.jpg"
    },
    {
      name: 'Thulusdhoo Island',
      distance: '26 km from Velana Airport',
      duration: '35-40 minutes',
      description: 'Premier surf destination in North Malé Atoll, famous for Cokes surf break. This speedboat transfer connects you to world-class waves and thriving water sports scene.',
      highlights: ['Surfing', 'Diving', 'Adventure'],
      image: "/images/thulusdhoo.jpg"
    },
    {
      name: 'Dhiffushi Island',
      distance: '24 km from Velana Airport',
      duration: '30-35 minutes',
      description: 'Peaceful local island perfect for families and couples looking to travel Maldives affordably. Enjoy white sand beaches, crystal-clear lagoons, and friendly island hospitality.',
      highlights: ['Family Friendly', 'Beach Paradise', 'Budget Stay'],
      image: "/images/dhiffushi.jpg"
    },
    {
      name: 'Huraa Island',
      distance: '21 km from Velana Airport',
      duration: '25-30 minutes',
      description: 'Historic island in North Malé Atoll offering excellent diving spots and traditional Maldivian experiences. Fast speedboat Maldives transfers make this a convenient choice.',
      highlights: ['Diving', 'History', 'Tradition'],
      image: "/images/huraa.jpeg"
    },
    {
      name: 'Himmafushi Island',
      distance: '19 km from Velana Airport',
      duration: '20-30 minutes',
      description: 'Vibrant surf island in Malé Atoll with excellent waves and lively atmosphere. Popular speedboat transfer route for surfers and adventure seekers visiting Maldives.',
      highlights: ['Surfing', 'Nightlife', 'Water Sports'],
      image: "/images/himmafushi.jpeg"
    }
  ];

  return (
    <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Speedboat Destinations in Maldives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the best islands in Malé Atoll with our fast and reliable speedboat transfer service.
            Travel Maldives comfortably from Velana International Airport to your dream destination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={`${destination.name} speedboat transfer from Velana Airport Maldives`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{destination.distance}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">{destination.duration} speedboat ride</span>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {destination.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {destination.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl p-8 text-center text-white">
          <Waves className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-3">Can't Find Your Destination?</h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            We provide speedboat transfers to all islands in Malé Atoll and beyond. Contact us for custom routes
            and special requests for your Maldives travel needs.
          </p>
          <a
            href="#booking"
            className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Request Custom Route
          </a>
        </div>
      </div>
    </section>
  );
}
