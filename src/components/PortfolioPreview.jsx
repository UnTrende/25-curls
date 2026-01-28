import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioPreview = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Classic Cut",
      description: "Precision haircut for the modern gentleman",
      image: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Haircuts",
    },
    {
      id: 2,
      title: "Beard Grooming",
      description: "Professional beard shaping and styling",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Beard Care",
    },
    {
      id: 3,
      title: "Premium Styling",
      description: "Complete grooming experience",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Styling",
    },
    {
      id: 4,
      title: "Senior Grooming",
      description: "Gentle care for mature clients",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "Specialized",
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase tracking-wide">Our Work Portfolio</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
          Showcasing our expertise across all age groups and grooming styles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioItems.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                <p className="text-primary text-sm">{item.category}</p>
              </div>
            </div>
            <div className="p-4 bg-card border-x border-b border-white/5 group-hover:border-primary/30 transition-colors">
              <h3 className="font-semibold text-white uppercase tracking-wider">{item.title}</h3>
              <p className="text-muted-foreground text-sm font-sans">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/portfolio"
          className="inline-flex items-center text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-sm transition-colors"
        >
          View Full Portfolio
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;