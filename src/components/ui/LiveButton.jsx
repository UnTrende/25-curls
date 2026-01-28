import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils'; // Adjust path based on location

const LiveButton = ({ children, className, onClick, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-brand-gradient rounded-full group shadow-lg shadow-primary/25 text-sm sm:text-base",
                className
            )}
            onClick={onClick}
            {...props}
        >
            <span className="absolute inset-0 w-full h-full -mt-10 transition-all duration-1000 ease-out transform translate-x-0 -skew-x-12 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-10" />
            <span className="relative flex items-center gap-2 z-10">{children}</span>
        </motion.button>
    );
};

export default LiveButton;
