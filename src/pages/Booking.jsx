import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import LiveButton from '../components/ui/LiveButton';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    address: '',
    ageGroup: '',
    notes: ''
  });

  const services = [
    { id: 'classic', name: 'Classic Haircut', duration: '30 min', price: '$35' },
    { id: 'beard', name: 'Beard Trim & Shape', duration: '20 min', price: '$25' },
    { id: 'premium', name: 'Premium Grooming', duration: '60 min', price: '$60' },
    { id: 'kids', name: 'Kids Haircut', duration: '25 min', price: '$20' },
    { id: 'senior', name: 'Senior Care Package', duration: '35 min', price: '$30' },
    { id: 'group', name: 'Group Package', duration: 'Varies', price: 'From $30' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const ageGroups = [
    { value: 'teens', label: 'Teens (13-19)' },
    { value: 'adults', label: 'Adults (20-59)' },
    { value: 'seniors', label: 'Seniors (60+)' },
    { value: 'children', label: 'Children (3-12)' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Booking submitted successfully! We will contact you shortly to confirm your appointment.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      address: '',
      ageGroup: '',
      notes: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Book Your Appointment</h1>
          <p className="text-xl text-muted-foreground font-sans">
            Schedule your doorstep barber service in just a few minutes
          </p>
        </div>

        <div className="bg-card text-white rounded-2xl shadow-2xl p-8 border border-white/5">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6 uppercase tracking-wide border-b border-white/5 pb-2">Your Information</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                    placeholder="John Smith"
                  />
                  <div className="absolute left-3 top-3.5 text-muted-foreground">
                    <Icon icon="mdi:account" width="20" height="20" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                    placeholder="john@example.com"
                  />
                  <div className="absolute left-3 top-3.5 text-muted-foreground">
                    <Icon icon="mdi:email" width="20" height="20" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                    placeholder="(555) 123-4567"
                  />
                  <div className="absolute left-3 top-3.5 text-muted-foreground">
                    <Icon icon="mdi:phone" width="20" height="20" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-2">
                  Service Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                    placeholder="123 Main Street, City, State"
                  />
                  <div className="absolute left-3 top-3.5 text-muted-foreground">
                    <Icon icon="mdi:map-marker" width="20" height="20" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="ageGroup" className="block text-sm font-medium text-muted-foreground mb-2">
                  Age Group *
                </label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white font-sans transition-all"
                >
                  <option value="">Select your age group</option>
                  {ageGroups.map((group) => (
                    <option key={group.value} value={group.value}>
                      {group.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6 uppercase tracking-wide border-b border-white/5 pb-2">Service Details</h2>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Select Service *
                </label>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${formData.service === service.id
                        ? 'border-primary bg-primary/10'
                        : 'border-white/5 hover:border-primary/50 bg-black/30'
                        }`}
                    >
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={formData.service === service.id}
                          onChange={handleChange}
                          className="mt-1 mr-3 text-primary focus:ring-primary"
                        />
                        <div>
                          <div className="font-medium text-foreground">{service.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Duration: {service.duration} • Price: {service.price}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-muted-foreground mb-2">
                  Preferred Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white font-sans transition-all"
                  />
                  <div className="absolute left-3 top-3.5 text-muted-foreground">
                    <Icon icon="mdi:calendar" width="20" height="20" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-muted-foreground mb-2">
                  Preferred Time *
                </label>
                <div className="relative">
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white font-sans transition-all"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-3.5 text-muted-foreground">
                    <Icon icon="mdi:clock-outline" width="20" height="20" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-muted-foreground mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                  placeholder="Any special requests, allergies, or additional information..."
                ></textarea>
              </div>
            </div>

            <div className="lg:col-span-2 mt-8 flex justify-center">
              <LiveButton
                type="submit"
                className="w-full max-w-md py-4 text-lg"
              >
                Confirm Booking
              </LiveButton>
            </div>
          </form>
        </div>

        <div className="mt-12 bg-card rounded-xl p-8 border border-white/5 shadow-2xl">
          <h3 className="text-2xl font-heading font-bold text-primary mb-6 uppercase tracking-wider">Booking Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Service Radius</h4>
              <p className="text-muted-foreground">We provide services within a 15-mile radius of downtown. Enter your address during booking to confirm service availability in your area.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Cancellation Policy</h4>
              <p className="text-muted-foreground">Free cancellation up to 24 hours before appointment. Less than 24 hours notice may incur a fee.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Payment</h4>
              <p className="text-muted-foreground">Payment is collected after service completion. We accept cash, card, or digital payments.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">What to Expect</h4>
              <p className="text-muted-foreground">Our professional barber will arrive with all necessary equipment and supplies. Just sit back and enjoy!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;