import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const TestimonialsPreview = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Rodriguez",
      age: "34",
      role: "Father of 2",
      rating: 5,
      text: "The convenience of having a professional barber at home is incredible. My sons and I all get our haircuts together now!",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Robert Chen",
      age: "67",
      role: "Retired Teacher",
      rating: 5,
      text: "As an older gentleman, it's difficult to get to the barbershop. Having this service come to my home is a game-changer.",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      id: 3,
      name: "James Wilson",
      age: "24",
      role: "College Student",
      text: "Best grooming experience I've ever had. The barber was punctual, professional, and gave me the perfect cut.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 4,
      name: "David Thompson",
      age: "45",
      role: "Business Executive",
      text: "The quality matches any high-end barbershop, but with the convenience of being at home. Highly recommend!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase tracking-wide">What Our Customers Say</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
          Satisfied customers from teenagers to seniors trust us for their grooming needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-card p-6 rounded-xl shadow-lg border border-border">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{testimonial.name}, {testimonial.age}</h3>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Icon key={i} icon="mdi:star" className="h-5 w-5 text-primary" />
              ))}
            </div>

            <p className="text-accent italic">"{testimonial.text}"</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/testimonials"
          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold"
        >
          Read All Testimonials
          <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default TestimonialsPreview;