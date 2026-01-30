import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioItems } from '../api/portfolio';
import Skeleton from './ui/Skeleton';

const PortfolioPreview = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getPortfolioItems();
        // Take top 4 items
        setPortfolioItems(data?.slice(0, 4) || []);
      } catch (err) {
        console.error('Failed to load portfolio preview:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase tracking-wide">Our Work Portfolio</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
          Showcasing our expertise across all age groups and grooming styles
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-card border border-white/5">
              <Skeleton className="h-64 w-full bg-white/5" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-1/2 bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-primary text-sm uppercase">{item.category}</p>
                </div>
              </div>
              <div className="p-4 bg-card border-x border-b border-white/5 group-hover:border-primary/30 transition-colors h-full">
                <h3 className="font-semibold text-white uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-sans line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

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