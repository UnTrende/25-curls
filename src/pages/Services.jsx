import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LiveButton from '../components/ui/LiveButton';
import { getServices } from '../api/services';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();

      // Transform data to match component structure
      const transformedServices = data.map(service => ({
        id: service.id,
        title: service.name,
        description: service.description,
        price: `$${service.price}`,
        duration: `${service.duration_minutes} min`,
        ageGroups: service.age_groups || [],
        popular: service.is_popular,
        includes: service.includes || [],
      }));

      setServices(transformedServices);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchServices} className="text-primary hover:underline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
          Professional barber services tailored for all ages, from young men to seniors.
          We provide specialized care and attention to meet the unique needs of each age group.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white mb-8 uppercase tracking-wide border-b border-primary/20 pb-2">Complete Service Menu</h2>

          <div className="space-y-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-card rounded-xl shadow-lg p-8 border ${service.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                  }`}
              >
                {service.popular && (
                  <div className="mb-4">
                    <span className="bg-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                </div>

                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Perfect for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.ageGroups.map((ageGroup, index) => (
                      <span
                        key={index}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {ageGroup}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">What's Included:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {service.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{service.duration}</span>
                  <Link to="/booking">
                    <LiveButton className="px-6 py-2">
                      Book Now
                    </LiveButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-card/40 backdrop-blur-sm rounded-xl p-8 sticky top-24 border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-heading font-bold text-primary mb-6 uppercase tracking-wide">Why Choose Us?</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-lg mr-4 text-primary">
                  <Icon icon="mdi:certificate-outline" width="24" height="24" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Professional Quality</h3>
                  <p className="text-muted-foreground">Our barbers are licensed professionals with years of experience.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-lg mr-4 text-primary">
                  <Icon icon="mdi:truck-delivery-outline" width="24" height="24" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Convenient Doorstep Service</h3>
                  <p className="text-muted-foreground">We bring the salon to you, saving you time and effort.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-lg mr-4 text-primary">
                  <Icon icon="mdi:calendar-clock" width="24" height="24" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">Book at your convenience, including evenings and weekends.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-lg mr-4 text-primary">
                  <Icon icon="mdi:shield-check-outline" width="24" height="24" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Safe & Hygienic</h3>
                  <p className="text-muted-foreground">All tools are sanitized and we follow strict hygiene protocols.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-lg mr-4 text-primary">
                  <Icon icon="mdi:human-cane" width="24" height="24" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Age-Appropriate Care</h3>
                  <p className="text-muted-foreground">Specialized approach for each age group, from kids to seniors.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-card rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Service Areas</h3>
              <p className="text-muted-foreground mb-4">We serve the following areas within a 15-mile radius:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Downtown District</li>
                <li>Suburban Neighborhoods</li>
                <li>Senior Living Communities</li>
                <li>Corporate Parks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;