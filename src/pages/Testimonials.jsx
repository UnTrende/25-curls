import React from 'react';
import { Icon } from '@iconify/react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Rodriguez",
      age: "34",
      role: "Father of 2",
      rating: 5,
      text: "The convenience of having a professional barber at home is incredible. My teenage son and I both get our haircuts together now, and the barber adjusts his approach perfectly for both of us. Outstanding service!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "March 15, 2024",
      service: "Premium Grooming"
    },
    {
      id: 2,
      name: "Robert Chen",
      age: "67",
      role: "Retired Teacher",
      rating: 5,
      text: "As a senior, it's difficult to get to the barbershop. Having this service come to my home is a game-changer. The barber was respectful, patient, and gave me exactly what I wanted. Highly recommend!",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      date: "April 2, 2024",
      service: "Senior Care Package"
    },
    {
      id: 3,
      name: "James Wilson",
      age: "24",
      role: "College Student",
      text: "Best grooming experience I've ever had. The barber was punctual, professional, and gave me the perfect cut. The fact that I didn't have to travel anywhere was just a bonus.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      date: "February 28, 2024",
      service: "Classic Haircut"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      age: "31",
      role: "Mother of 3",
      text: "I booked the kids' haircut service for my two sons (ages 6 and 10). The barber was incredibly patient with them and made the experience fun. Both kids actually enjoyed their haircuts!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "May 10, 2024",
      service: "Kids Haircut"
    },
    {
      id: 5,
      name: "David Thompson",
      age: "45",
      role: "Business Executive",
      text: "The quality matches any high-end barbershop, but with the convenience of being at home. The attention to detail is remarkable. I'm a loyal customer now!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      date: "January 18, 2024",
      service: "Premium Grooming"
    },
    {
      id: 6,
      name: "Thomas Anderson",
      age: "72",
      role: "Retired Veteran",
      text: "I've been going to barbershops for 50+ years, but I have mobility issues now. This service brings the same quality to my home. The barber respects my pace and takes time with everything. Excellent service!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      date: "June 5, 2024",
      service: "Senior Care Package"
    }
  ];

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