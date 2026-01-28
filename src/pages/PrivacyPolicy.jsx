import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Privacy Policy</h1>
        <p className="text-muted-foreground font-sans">Last updated: January 27, 2024</p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Information We Collect</h2>
        <p className="text-muted-foreground mb-4 font-sans">
          We collect information you provide directly to us, such as when you create an account, book a service, or contact us for support. This may include:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
          <li>Name and contact information</li>
          <li>Service preferences and history</li>
          <li>Location information for service provision</li>
          <li>Payment information (processed securely by third-party providers)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">How We Use Your Information</h2>
        <p className="text-muted-foreground mb-4 font-sans">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
          <li>Provide and improve our services</li>
          <li>Process bookings and payments</li>
          <li>Communicate with you about your appointments</li>
          <li>Send promotional offers (with your consent)</li>
          <li>Ensure the security of our services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Data Protection</h2>
        <p className="text-muted-foreground mb-4 font-sans">
          We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
        </p>
        <p className="text-muted-foreground font-sans">
          Our team members are trained in data protection and sign confidentiality agreements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Your Rights</h2>
        <p className="text-muted-foreground mb-4 font-sans">
          You have the right to:
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
          <li>Access your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your information</li>
          <li>Data portability (in certain circumstances)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Cookies</h2>
        <p className="text-muted-foreground font-sans">
          We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Contact Us</h2>
        <p className="text-muted-foreground font-sans">
          If you have questions about this privacy policy, please contact us at{' '}
          <a href="mailto:privacy@elitedoorstepbarber.com" className="text-primary hover:underline">
            privacy@elitedoorstepbarber.com
          </a>.
        </p>
      </section>
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

export default PrivacyPolicy;