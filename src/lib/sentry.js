import * as Sentry from '@sentry/react';

export const initSentry = () => {
    if (import.meta.env.VITE_SENTRY_DSN && import.meta.env.PROD) {
        Sentry.init({
            dsn: import.meta.env.VITE_SENTRY_DSN,
            integrations: [
                Sentry.browserTracingIntegration(),
                Sentry.replayIntegration({
                    maskAllText: false,
                    blockAllMedia: false,
                }),
            ],
            
            // Performance Monitoring
            tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring
            
            // Session Replay
            replaysSessionSampleRate: 0.1, // Sample 10% of sessions
            replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
            
            // Environment
            environment: import.meta.env.MODE,
            
            // Release tracking
            release: import.meta.env.VITE_APP_VERSION || '1.0.0',
            
            // Before sending events
            beforeSend(event, hint) {
                // Filter out non-critical errors
                if (event.exception) {
                    const error = hint.originalException;
                    
                    // Don't send cancelled fetch requests
                    if (error?.name === 'AbortError') {
                        return null;
                    }
                    
                    // Don't send network errors in development
                    if (import.meta.env.DEV && error?.message?.includes('NetworkError')) {
                        return null;
                    }
                }
                
                return event;
            },
        });
    }
};

// Custom error boundary component
export const ErrorBoundary = Sentry.ErrorBoundary;

// Capture custom errors
export const captureError = (error, context = {}) => {
    if (import.meta.env.DEV) {
        console.error('Error captured:', error, context);
    }
    
    Sentry.captureException(error, {
        contexts: { additional: context },
    });
};

// Capture custom messages
export const captureMessage = (message, level = 'info') => {
    Sentry.captureMessage(message, level);
};

// Set user context
export const setUser = (user) => {
    Sentry.setUser(user ? {
        id: user.id,
        email: user.email,
    } : null);
};

// Add breadcrumb
export const addBreadcrumb = (breadcrumb) => {
    Sentry.addBreadcrumb(breadcrumb);
};
