import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-brand-gradient rounded-2xl p-8 md:p-12 mb-16 shadow-2xl shadow-primary/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
          Ready for a Premium Grooming Experience?
        </h2>
        <p className="text-xl text-white/90 mb-8 font-sans">
          Book your doorstep barber service today and experience the convenience of professional grooming at home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/booking"
            className="bg-black text-white hover:bg-black/80 font-bold py-4 px-8 rounded-lg text-center transition-colors duration-300 text-lg uppercase tracking-widest shadow-xl"
          >
            Book Now
          </Link>
          <Link
            to="/contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg text-center transition-colors duration-300 text-lg uppercase tracking-widest"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;