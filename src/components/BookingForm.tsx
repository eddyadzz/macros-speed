import { useState, FormEvent } from 'react';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react';

export function BookingForm() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '',
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const passengerOptions = [
    { value: '1', label: '1 Passenger' },
    { value: '2', label: '2 Passengers' },
    { value: '3', label: '3 Passengers' },
    { value: '4', label: '4 Passengers' },
    { value: '5', label: '5 Passengers' },
    { value: '6', label: '6 Passengers' },
    { value: '7-12', label: '7-12 Passengers' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-notification`,
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
        setFormData({
          from: '',
          to: '',
          date: '',
          time: '',
          passengers: '',
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          notes: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed to submit booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Speedboat Transfer
          </h2>
          <p className="text-xl text-gray-600">
            Reserve your speedboat transfer in Maldives. Fill out the form below and we'll confirm your booking shortly.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-700 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Route Information</span>
                </div>
                <Input
                  label="From"
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  placeholder="e.g., Velana International Airport"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="h-8"></div>
                <Input
                  label="To"
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  placeholder="e.g., Maafushi Island"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-700 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Travel Details</span>
                </div>
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <div className="h-8"></div>
                <Input
                  label="Preferred Time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-700 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Group Size</span>
              </div>
              <Select
                label="Number of Passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                options={passengerOptions}
                required
              />
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
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

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+960 123 4567"
                  required
                />

                <Input
                  label="WhatsApp Number"
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+960 123 4567 (optional)"
                />
              </div>
            </div>

            <Textarea
              label="Additional Notes or Special Requests"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Luggage details, special requirements, etc."
            />

            {submitStatus === 'success' && (
              <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900">Booking Request Submitted!</p>
                  <p className="text-sm text-green-700">
                    We'll confirm your speedboat transfer shortly via email or WhatsApp.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-900">Submission Failed</p>
                  <p className="text-sm text-red-700">
                    Please try again or contact us directly via WhatsApp.
                  </p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              By submitting this form, you agree to our terms of service. No payment required at this stage.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
