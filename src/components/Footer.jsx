import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceCategories = [
    { name: 'Haircuts', path: '/services#haircuts' },
    { name: 'Beard Trims', path: '/services#beard' },
    { name: 'Styling', path: '/services#styling' },
    { name: 'Special Occasions', path: '/services#special' },
  ];

  return (
    <footer className="bg-black/90 text-white pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="bg-primary text-black p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Icon icon="mdi:mustache" width="24" height="24" />
              </div>
              <span className="text-xl font-heading font-bold uppercase tracking-wider text-white">
                Elite<span className="text-primary">Cuts</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Professional barber services delivered to your doorstep. Serving customers from 16 to 80 years old with premium grooming experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Icon icon="mdi:facebook" width="24" height="24" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Icon icon="mdi:instagram" width="24" height="24" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Icon icon="mdi:twitter" width="24" height="24" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Our Services</h3>
            <ul className="space-y-2">
              {serviceCategories.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Icon icon="mdi:phone" width="20" height="20" className="mt-0.5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon icon="mdi:email" width="20" height="20" className="mt-0.5 text-primary" />
                <span>info@luxecuts.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon icon="mdi:map-marker" width="20" height="20" className="mt-0.5 text-primary" />
                <span>Service available in your area</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} LuxeCuts Barber Services. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;