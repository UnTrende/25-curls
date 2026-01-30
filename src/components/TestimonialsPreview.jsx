import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getApprovedTestimonials } from '../api/testimonials';

const TestimonialsPreview = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getApprovedTestimonials();
        
        // Take only the first 4 testimonials for preview
        const previewData = (data || []).slice(0, 4).map(testimonial => ({
          id: testimonial.id,
          name: testimonial.customer_name,
          age: testimonial.customer_age,
          role: testimonial.customer_role,
          rating: testimonial.rating,
          text: testimonial.text,
          image: testimonial.image_url
        }));
        
        setTestimonials(previewData);
      } catch (err) {
        console.error('Failed to load testimonials preview:', err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  return (
    <section className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase tracking-wide">What Our Customers Say</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
          Satisfied customers from teenagers to seniors trust us for their grooming needs
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : testimonials.length > 0 ? (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No testimonials available yet.</p>
        </div>
      )}

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