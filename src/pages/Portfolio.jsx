import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getPortfolioItems } from '../api/portfolio';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioItems();
      
      if (data && data.length > 0) {
        // Group items by category
        const groupedItems = data.reduce((acc, item) => {
          const category = item.category || 'general';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});

        // Convert to array format for rendering
        const portfolioCategories = Object.entries(groupedItems).map(([categoryName, items]) => ({
          name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
          items: items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image_url,
            category: item.category
          }))
        }));

        setPortfolioItems(portfolioCategories);
      } else {
        // Use fallback data in demo mode
        setPortfolioItems([]);
      }
    } catch (err) {
      console.error('Error fetching portfolio items:', err);
      // Don't show error in demo mode
      if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
        setError('Failed to load portfolio items. Please try again later.');
      }
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchPortfolioItems} className="text-primary hover:underline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state if no items in database
  if (portfolioItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Our Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
            Showcase of our work across different age groups and grooming styles.
            From classic cuts to specialized services, we cater to all grooming needs.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-12">
            <Icon icon="mdi:image-off-outline" className="w-20 h-20 mx-auto mb-6 text-muted-foreground/50" />
            <h2 className="text-2xl font-heading font-bold text-white mb-4">No Portfolio Items Yet</h2>
            <p className="text-muted-foreground mb-6">
              Our portfolio gallery is currently empty. Check back soon to see our amazing work!
            </p>
            <button 
              onClick={fetchPortfolioItems}
              className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium"
            >
              Refresh Portfolio
            </button>
          </div>
        </div>

        <div className="mt-16 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl font-heading font-bold text-white mb-10 text-center uppercase tracking-widest">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon icon="mdi:lightbulb-on" className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3 uppercase">Age-Appropriate</h3>
              <p className="text-muted-foreground font-sans text-sm">We adapt our approach based on the client's age, ensuring comfort and safety for all.</p>
            </div>

            <div className="text-center group">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon icon="mdi:shield-check" className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3 uppercase">Hygiene First</h3>
              <p className="text-muted-foreground font-sans text-sm">All tools are sanitized between clients, and we maintain the highest cleanliness standards.</p>
            </div>

            <div className="text-center group">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon icon="mdi:account-star" className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3 uppercase">Personalized</h3>
              <p className="text-muted-foreground font-sans text-sm">Every client receives a customized grooming experience based on their unique needs.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Our Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
          Showcase of our work across different age groups and grooming styles.
          From classic cuts to specialized services, we cater to all grooming needs.
        </p>
      </div>

      <div className="space-y-16">
        {portfolioItems.map((category) => (
          <div key={category.name}>
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center uppercase tracking-wide border-b border-primary/20 pb-4 inline-block mx-auto w-full max-w-xs">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <div key={item.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-lg uppercase tracking-wider">{item.title}</h3>
                      <p className="text-primary text-sm">{item.clientAge} • {item.technique}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-card border-x border-b border-white/5 group-hover:border-primary/30 transition-colors">
                    <h3 className="font-semibold text-white text-xl mb-2 uppercase tracking-wide">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 font-sans">{item.description}</p>
                    <div className="flex justify-between text-xs text-primary/70 uppercase tracking-widest font-bold">
                      <span>Client: {item.clientAge}</span>
                      <span>{item.technique}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-12 shadow-2xl">
        <h2 className="text-3xl font-heading font-bold text-white mb-10 text-center uppercase tracking-widest">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Icon icon="mdi:lightbulb-on" className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3 uppercase">Age-Appropriate</h3>
            <p className="text-muted-foreground font-sans text-sm">We adapt our approach based on the client's age, ensuring comfort and safety for all.</p>
          </div>

          <div className="text-center group">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Icon icon="mdi:shield-check" className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3 uppercase">Hygiene First</h3>
            <p className="text-muted-foreground font-sans text-sm">All tools are sanitized between clients, and we maintain the highest cleanliness standards.</p>
          </div>

          <div className="text-center group">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Icon icon="mdi:account-star" className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3 uppercase">Personalized</h3>
            <p className="text-muted-foreground font-sans text-sm">Every client receives a customized grooming experience based on their unique needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;