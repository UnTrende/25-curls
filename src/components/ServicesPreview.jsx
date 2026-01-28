import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const ServicesPreview = () => {
  const services = [
    {
      id: 1,
      title: "Classic Haircut",
      description: "Traditional haircut with precision scissors and clippers, styled to your preference.",
      price: "$35",
      duration: "30 min",
      icon: "mdi:content-cut",
      popular: true
    },
    {
      id: 2,
      title: "Beard Trim & Shape",
      description: "Professional beard shaping and trimming with hot towel treatment.",
      price: "$25",
      duration: "20 min",
      icon: "mdi:clock-outline"
    },
    {
      id: 3,
      title: "Premium Grooming",
      description: "Full service grooming including haircut, beard trim, and hot towel shave.",
      price: "$60",
      duration: "60 min",
      icon: "mdi:star"
    },
    {
      id: 4,
      title: "Group Packages",
      description: "Special rates for families or groups of 3 or more people.",
      price: "From $30",
      duration: "Varies",
      icon: "mdi:account-group"
    }
  ];

  return (
    <section className="mb-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 uppercase tracking-wide">
          Our Premium <span className="text-brand-gradient">Services</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-sans">
          Professional barber services tailored for all ages, from young men to seniors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => {
          return (
            <div
              key={service.id}
              className={`relative bg-card rounded-2xl p-6 border border-primary/10 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] ${service.popular ? 'ring-1 ring-primary shadow-[0_0_20px_rgba(212,175,55,0.15)]' : ''
                }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-gradient text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg tracking-wider uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex justify-center mb-6 mt-2">
                <div className="bg-white/5 p-4 rounded-full group-hover:bg-primary/10 transition-colors">
                  <Icon icon={service.icon} className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>

              <h3 className="text-2xl font-heading font-bold text-white mb-3 text-center uppercase tracking-wide">{service.title}</h3>
              <p className="text-gray-400 mb-6 text-center font-sans text-sm leading-relaxed border-b border-white/5 pb-4">{service.description}</p>

              <div className="flex justify-between items-center mb-6">
                <span className="text-3xl font-heading font-bold text-white">{service.price}</span>
                <span className="text-primary text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">{service.duration}</span>
              </div>

              <Link
                to="/booking"
                className="block w-full"
              >
                <button className="w-full py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
                  Book Now
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/services"
          className="inline-flex items-center text-brand-cyan hover:text-brand-blue transition-colors font-bold uppercase tracking-widest text-sm"
        >
          View All Services
          <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default ServicesPreview;