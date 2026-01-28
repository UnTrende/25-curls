import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollYProgress } = useViewportScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Typography */}
          <div className="text-left pr-4 md:pr-0">
            <motion.div style={{ y: y1 }}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black uppercase text-outline-bold tracking-tighter leading-none">
                Elite
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-brand-gradient tracking-wide -mt-6 md:-mt-8 lg:-mt-10">
                Grooming
              </h2>
            </motion.div>

            <motion.p style={{ y: y2 }} className="text-base md:text-lg text-muted-foreground mt-6 md:mt-8 max-w-md">
              The intersection of tradition and luxury. We bring world-class grooming artistry to your doorstep. Precision, convenience, and unparalleled style, crafted for the modern gentleman.
            </motion.p>

            <motion.div style={{ y: y2 }} className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
              <Link
                to="/booking"
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-brand-gradient rounded-full font-bold text-white shadow-lg shadow-primary/25 transform hover:scale-105 transition-all duration-300 text-sm md:text-base w-fit"
              >
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
                  Book Now <Icon icon="mdi:arrow-right" />
                </span>
              </Link>
              <Link
                to="/services"
                className="group px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white/50 text-white rounded-full font-bold hover:bg-white/10 transition-colors duration-300 uppercase tracking-widest text-sm md:text-base w-fit"
              >
                Services
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Image & Visuals */}
          <motion.div style={{ x: x1 }} className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
            {/* Luxury Barber Image with Gradient Blend */}
            <div
              className="absolute w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url("/src/assets/luxury_barber_hero.png")',
                clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)',
              }}
            >
              {/* Gradient Overlay for Blending */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-primary/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Pills */}
            <div className="absolute top-[20%] left-4 sm:left-auto sm:right-4 transform -translate-x-0">
              <div className="py-2 px-4 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 text-sm font-bold shadow-lg">
                <span className="text-primary mr-2">★</span> 5.0 Rating
              </div>
            </div>
            <div className="absolute bottom-[20%] right-4 transform translate-x-0">
              <div className="py-2 px-4 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 text-sm font-bold shadow-lg">
                Master Barbers
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;