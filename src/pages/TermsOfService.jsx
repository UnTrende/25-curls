import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Terms of Service</h1>
        <p className="text-muted-foreground font-sans">Last updated: January 27, 2024</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Acceptance of Terms</h2>
          <p className="text-muted-foreground font-sans">
            By accessing and using Elite Doorstep Barber Services, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Description of Service</h2>
          <p className="text-muted-foreground mb-4 font-sans">
            Elite Doorstep Barber Services provides professional barber services delivered to your location within our service area. Services include but are not limited to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
            <li>Haircuts and styling</li>
            <li>Beard trimming and shaping</li>
            <li>Shaving services</li>
            <li>Specialized grooming for different age groups</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Booking and Payment</h2>
          <p className="text-muted-foreground mb-4 font-sans">
            When booking a service:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
            <li>You must provide accurate information during booking</li>
            <li>Payment is due upon completion of services</li>
            <li>We accept cash, card, and digital payment methods</li>
            <li>Cancellations must be made at least 24 hours in advance to avoid fees</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Service Area and Availability</h2>
          <p className="text-muted-foreground mb-4 font-sans">
            Our services are available within a 15-mile radius of downtown. Service availability depends on:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
            <li>Current demand and scheduling</li>
            <li>Weather conditions (in extreme cases)</li>
            <li>Geographic proximity to our service center</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Customer Responsibilities</h2>
          <p className="text-muted-foreground mb-4 font-sans">
            As a customer, you agree to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
            <li>Provide a safe and clean environment for service delivery</li>
            <li>Inform us of any allergies or medical conditions that may affect service</li>
            <li>Respect our service provider and their equipment</li>
            <li>Be present and available at the scheduled time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Limitation of Liability</h2>
          <p className="text-muted-foreground font-sans">
            Elite Doorstep Barber Services shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Changes to Terms</h2>
          <p className="text-muted-foreground font-sans">
            We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Contact Information</h2>
          <p className="text-muted-foreground font-sans">
            If you have questions about these terms, please contact us at{' '}
            <a href="mailto:legal@elitedoorstepbarber.com" className="text-primary hover:underline">
              legal@elitedoorstepbarber.com
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/contact"
          className="inline-block bg-primary hover:bg-primary/90 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300 uppercase tracking-widest text-sm"
        >
          Contact Us
        </Link>
      </div>
    </div >
  );
};

export default TermsOfService;