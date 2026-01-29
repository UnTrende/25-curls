import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Send web vitals to analytics
const sendToAnalytics = (metric) => {
    const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
    });

    // Send to Google Analytics if available
    if (window.gtag) {
        window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true,
        });
    }

    // Log to console in development
    if (import.meta.env.DEV) {
        console.log('Web Vital:', metric.name, metric.value, metric.rating);
    }

    // You can also send to your own analytics endpoint
    // navigator.sendBeacon('/api/analytics/web-vitals', body);
};

// Initialize web vitals tracking
export const initWebVitals = () => {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics); // INP replaced FID in web-vitals v3+
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
};

// Get performance metrics summary
export const getPerformanceMetrics = () => {
    if (typeof window === 'undefined' || !window.performance) {
        return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    return {
        // Navigation Timing
        dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
        tcp: navigation?.connectEnd - navigation?.connectStart,
        request: navigation?.responseStart - navigation?.requestStart,
        response: navigation?.responseEnd - navigation?.responseStart,
        domInteractive: navigation?.domInteractive,
        domComplete: navigation?.domComplete,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,

        // Paint Timing
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,

        // Memory (if available)
        memory: performance.memory ? {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        } : null,
    };
};
