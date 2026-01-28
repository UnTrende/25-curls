import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import LiveButton from '../components/ui/LiveButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: "mdi:phone",
      title: "Phone",
      content: "+1 (555) 123-4567",
      description: "Call or text for immediate assistance"
    },
    {
      icon: "mdi:email",
      title: "Email",
      content: "info@elitedoorstepbarber.com",
      description: "Send us an email anytime"
    },
    {
      icon: "mdi:map-marker",
      title: "Service Area",
      content: "Various Locations",
      description: "We come to you within 15 miles radius"
    },
    {
      icon: "mdi:clock-outline",
      title: "Working Hours",
      content: "Mon-Sat: 9AM - 8PM",
      description: "Sunday by appointment only"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
          Have questions or ready to book? Reach out to us and our team will get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white mb-8 uppercase tracking-wide border-b border-primary/20 pb-2">Get in Touch</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-card border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                placeholder="Tell us about your grooming needs or questions..."
              ></textarea>
            </div>

            <LiveButton
              type="submit"
              className="w-full py-3"
            >
              Send Message
            </LiveButton>
          </form>
        </div>

        <div>
          <h2 className="text-3xl font-heading font-bold text-white mb-8 uppercase tracking-wide border-b border-primary/20 pb-2">Contact Information</h2>

          <div className="space-y-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border">
                <div className="bg-primary/20 p-3 rounded-lg mr-4 text-primary">
                  <Icon icon={info.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{info.title}</h3>
                  <p className="text-primary font-medium">{info.content}</p>
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-xl p-6 mb-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">Service Radius</h3>
            <p className="text-muted-foreground mb-4">
              We provide doorstep barber services within a 15-mile radius of downtown.
              Enter your zip code when booking to confirm service availability in your area.
            </p>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-muted-foreground text-sm">
                <span className="font-semibold text-foreground">Note:</span> For areas outside our standard service radius,
                additional travel fees may apply. Contact us for more information.
              </p>
            </div>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-4">Emergency Appointments</h3>
            <p className="text-muted-foreground mb-4">
              Need a last-minute grooming service? We offer emergency appointments based on availability.
              Call us directly for urgent requests.
            </p>
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-primary font-medium">
                Emergency Service: Same-day appointments available (subject to availability)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-brand-gradient rounded-2xl p-12 text-center text-white shadow-2xl shadow-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-4 uppercase tracking-widest">Ready to Book?</h2>
          <p className="text-xl text-white/90 mb-8 font-sans">
            Schedule your doorstep barber service today and experience the convenience of professional grooming at home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="bg-black text-white hover:bg-black/90 font-bold py-4 px-10 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm shadow-xl"
            >
              Book Online Now
            </a>
            <a
              href="tel:+15551234567"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-10 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Call Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;