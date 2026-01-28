import React from 'react';
import { Icon } from '@iconify/react';

const Portfolio = () => {
  const portfolioCategories = [
    {
      id: 1,
      name: "Haircuts",
      items: [
        {
          id: 101,
          title: "Classic Taper Fade",
          description: "Precision taper fade with scissor-over-comb technique",
          image: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          clientAge: "Adult Male",
          technique: "Scissor & Clipper"
        },
        {
          id: 102,
          title: "Modern Pompadour",
          description: "Styled pompadour with texture and volume",
          image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          clientAge: "Young Adult",
          technique: "Blow Dry & Styling"
        },
        {
          id: 103,
          title: "Buzz Cut",
          description: "Clean and sharp buzz cut at various lengths",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          clientAge: "Adult Male",
          technique: "Clipper Only"
        }
      ]
    },
    {
      id: 2,
      name: "Beard Care",
      items: [
        {
          id: 201,
          title: "Full Beard Shape",
          description: "Professional shaping and trimming of full beard",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          clientAge: "Adult Male",
          technique: "Hot Towel & Scissors"
        },
        {
          id: 202,
          title: "Goatee Style",
          description: "Defined goatee with precise lines",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          clientAge: "Adult Male",
          technique: "Clipper & Razor"
        }
      ]
    },
    {
      id: 3,
      name: "Specialized Services",
      items: [
        {
          id: 301,
          title: "Senior Gentle Grooming",
          description: "Extra care and attention for senior clients",
          image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          clientAge: "Senior Male",
          technique: "Gentle Approach"
        },
        {
          id: 302,
          title: "Kids First Haircut",
          description: "Patient and fun approach for first haircuts",
          image: "https://images.unsplash.com/photo-1607601562442-b0e3ec27c7e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          clientAge: "Child",
          technique: "Child-Friendly"
        }
      ]
    }
  ];

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
        {portfolioCategories.map((category) => (
          <div key={category.id}>
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