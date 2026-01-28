import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { cn } from '../lib/utils';
import LiveButton from './ui/LiveButton';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
                )}
            >
                <div className={cn(
                    "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
                    "bg-card/80 backdrop-blur-md border border-primary/20 shadow-lg shadow-primary/5",
                    "w-full max-w-5xl"
                )}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Icon icon="mdi:mustache" width="20" height="20" />
                        </div>
                        <span className="text-xl font-heading font-bold tracking-wide text-white uppercase">
                            Elite<span className="text-primary">Cuts</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative overflow-hidden group",
                                    location.pathname === link.path
                                        ? "text-white bg-white/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4 shrink-0">
                        <Link to="/booking" className="hidden md:block">
                            <button className="relative px-6 py-2 rounded-full font-bold text-sm text-white overflow-hidden group">
                                <span className="absolute inset-0 bg-brand-gradient opacity-90 group-hover:opacity-100 transition-opacity" />
                                <span className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -translate-x-full" />
                                <span className="relative flex items-center gap-2">
                                    Book Now
                                    <Icon icon="mdi:arrow-right" />
                                </span>
                            </button>
                        </Link>

                        <button
                            className="md:hidden text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Icon icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} width="28" height="28" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed inset-x-4 top-24 z-40 bg-card/95 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 shadow-2xl md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all group"
                                >
                                    <span className="font-heading font-medium tracking-wide text-lg">{link.name}</span>
                                    <Icon icon="mdi:chevron-right" className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full py-3 rounded-xl font-bold text-white bg-brand-gradient hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                    <Icon icon="mdi:calendar-check" />
                                    Book Appointment
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
