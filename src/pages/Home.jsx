import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesPreview from '../components/ServicesPreview';
import PortfolioPreview from '../components/PortfolioPreview';
import TestimonialsPreview from '../components/TestimonialsPreview';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <div className="container mx-auto px-4 py-16">
        <ServicesPreview />
        <PortfolioPreview />
        <TestimonialsPreview />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;