import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getApprovedTestimonials } from '../api/testimonials';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await getApprovedTestimonials();

      // Transform data to match component structure
      const transformedTestimonials = data.map(testimonial => ({
        id: testimonial.id,
        name: testimonial.customer_name,
        age: testimonial.customer_age,
        role: testimonial.customer_role,
        rating: testimonial.rating,
        text: testimonial.text,
        image: testimonial.image_url,
        date: new Date(testimonial.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        service: testimonial.service_name,
      }));

      setTestimonials(transformedTestimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchTestimonials} className="text-primary hover:underline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { value: "98%", label: "Customer Satisfaction" },
    { value: "500+", label: "Happy Clients" },
    { value: "4.9★", label: "Average Rating" },
    { value: "5★", label: "Doorstep Service" }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Customer Testimonials</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
          Hear from our satisfied customers across all age groups. We pride ourselves on providing
          exceptional service to everyone from teenagers to seniors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-xl shadow-lg text-center border border-border">
            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-card p-8 rounded-xl shadow-lg border border-white/5 hover:border-primary/30 transition-colors group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg uppercase tracking-wide">{testimonial.name}, {testimonial.age}</h3>
                <p className="text-primary/80 text-sm font-medium">{testimonial.role}</p>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mt-1">{testimonial.date}</p>
              </div>
            </div>

            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Icon key={i} icon="mdi:star" className="h-5 w-5 text-primary" />
              ))}
            </div>

            <blockquote className="text-white/90 italic mb-6 font-sans leading-relaxed">"{testimonial.text}"</blockquote>

            <div className="text-xs text-primary font-bold uppercase tracking-widest border-t border-white/5 pt-4">
              Service: {testimonial.service}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-brand-gradient rounded-2xl p-12 text-center text-white shadow-2xl shadow-primary/20">
        <h2 className="text-3xl font-heading font-bold mb-4 uppercase tracking-widest">Join Our Satisfied Customer Family</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 font-sans">
          Experience the convenience and quality of our doorstep barber services.
          Book your appointment today and join hundreds of happy customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/booking"
            className="bg-black text-white hover:bg-black/90 font-bold py-3 px-8 rounded-lg text-center transition-all duration-300 uppercase tracking-widest text-sm shadow-xl"
          >
            Book Your Service
          </a>
          <a
            href="/contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-center transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;