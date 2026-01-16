import { useState, FormEvent } from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const success = response.ok;

      if (success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed to send contact message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/9607752330?text=Hello, I need speedboat transfer information', '_blank');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Macros Speed Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide speedboat transfers across Malé Atoll and Maldives. Get in touch with us for any questions
            about your airport speedboat transfer or island travel needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <p className="text-gray-600 text-sm mb-2">Fastest response</p>
                  <button
                    onClick={handleWhatsApp}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    Chat with us
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 text-sm mb-2">Call us directly</p>
                  <a href="tel:+9607752330" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    +960 7752330
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">Send us a message</p>
                  <a
                    href="mailto:hello@macros.mv"
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    hello@macros.mv
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Service Area</h3>
                  <p className="text-gray-600 text-sm">
                    Malé Atoll, Velana International Airport, and surrounding islands
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2 hidden">24/7 Available</h3>
              <p className="text-blue-100 text-sm">
                Our speedboat transfer service operates around the clock to ensure you reach your destination
                anytime in Maldives.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <Textarea
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your speedboat transfer needs..."
                  required
                />

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-900 font-medium">Message sent successfully!</p>
                    <p className="text-sm text-green-700">We'll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-900 font-medium">Failed to send message</p>
                    <p className="text-sm text-red-700">Please try WhatsApp or call us directly.</p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
