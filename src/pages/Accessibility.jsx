import React from 'react';
import { Link } from 'react-router-dom';

const Accessibility = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Accessibility Statement</h1>
        <p className="text-muted-foreground font-sans">Last updated: January 27, 2024</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Our Commitment</h2>
          <p className="text-muted-foreground font-sans">
            Elite Doorstep Barber Services is committed to ensuring digital accessibility for people with disabilities. We are continuously improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Measures to Support Accessibility</h2>
          <p className="text-muted-foreground mb-4 font-sans">
            Elite Doorstep Barber Services takes the following measures to ensure accessibility:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
            <li>Include accessibility as part of our mission statement</li>
            <li>Include accessibility throughout our internal policies</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Assign clear accessibility goals and responsibilities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Conformance Status</h2>
          <p className="text-muted-foreground font-sans">
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. We conform to WCAG 2.1 level AA.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Technical Specifications</h2>
          <p className="text-muted-foreground mb-4 font-sans">
            Accessibility of this website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4 font-sans">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>WAI-ARIA</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Feedback</h2>
          <p className="text-muted-foreground font-sans">
            We welcome your feedback on the accessibility of Elite Doorstep Barber Services. Please let us know if you encounter accessibility barriers:
          </p>
          <p className="text-muted-foreground mt-4 font-sans">
            Email: <a href="mailto:accessibility@elitedoorstepbarber.com" className="text-primary hover:underline">accessibility@elitedoorstepbarber.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">Statement Date</h2>
          <p className="text-muted-foreground font-sans">
            This statement was created on January 27, 2024.
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
    </div>
  );
};

export default Accessibility;