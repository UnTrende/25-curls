import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = ({ children, title, breadcrumbs = [] }) => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/admin/login');
        } catch (err) {
            console.error('Sign out error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-card/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">
                                {title}
                            </h1>
                            {breadcrumbs.length > 0 && (
                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                    <Link to="/admin/dashboard" className="hover:text-primary transition-colors">
                                        Dashboard
                                    </Link>
                                    {breadcrumbs.map((crumb, index) => (
                                        <React.Fragment key={index}>
                                            <Icon icon="mdi:chevron-right" width="16" />
                                            {crumb.link ? (
                                                <Link to={crumb.link} className="hover:text-primary transition-colors">
                                                    {crumb.label}
                                                </Link>
                                            ) : (
                                                <span>{crumb.label}</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                            >
                                <Icon icon="mdi:home" width="20" />
                                <span className="hidden md:inline">View Site</span>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                            >
                                <Icon icon="mdi:logout" width="20" />
                                <span className="hidden md:inline">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
