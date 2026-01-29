// Google Analytics 4 Integration

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

// Initialize Google Analytics
export const initGA = () => {
    if (typeof window !== 'undefined' && GA_TRACKING_ID) {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', GA_TRACKING_ID, {
            page_path: window.location.pathname,
        });
    }
};

// Track page views
export const pageview = (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Common event tracking functions
export const trackBooking = (serviceId, serviceName, price) => {
    event({
        action: 'booking_initiated',
        category: 'Booking',
        label: serviceName,
        value: price,
    });
};

export const trackBookingComplete = (bookingId, serviceName, price) => {
    event({
        action: 'booking_completed',
        category: 'Booking',
        label: serviceName,
        value: price,
    });
};

export const trackServiceView = (serviceId, serviceName) => {
    event({
        action: 'service_viewed',
        category: 'Services',
        label: serviceName,
    });
};

export const trackContactSubmit = () => {
    event({
        action: 'contact_form_submitted',
        category: 'Contact',
        label: 'Contact Form',
    });
};

export const trackTestimonialSubmit = () => {
    event({
        action: 'testimonial_submitted',
        category: 'Testimonials',
        label: 'Testimonial Form',
    });
};

export const trackPortfolioView = (itemId, title) => {
    event({
        action: 'portfolio_item_viewed',
        category: 'Portfolio',
        label: title,
    });
};
