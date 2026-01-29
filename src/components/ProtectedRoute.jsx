import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const ProtectedRoute = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    console.log('ProtectedRoute:', { user: user?.email, isAdmin, loading });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        console.log('ProtectedRoute: Access denied, redirecting to login');
        return <Navigate to="/admin/login" replace />;
    }

    console.log('ProtectedRoute: Access granted');
    return children;
};

export default ProtectedRoute;
