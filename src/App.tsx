import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { SocialFeed } from './components/SocialFeed';
import { BookingForm } from './components/BookingForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Destinations />
        <SocialFeed />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
