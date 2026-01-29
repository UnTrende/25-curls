import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../hooks/useAuth.jsx';
import { getBookingsStats } from '../api/bookings';
import { getTestimonialsStats } from '../api/testimonials';
import { getMessagesStats } from '../api/contact';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { user, isAdmin, signOut, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    
    const [stats, setStats] = useState({
        bookings: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
        testimonials: { total: 0, approved: 0, pending: 0 },
        messages: { total: 0, new: 0, read: 0, replied: 0, archived: 0 }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authLoading && (!user || !isAdmin)) {
            navigate('/admin/login');
        }
    }, [user, isAdmin, authLoading, navigate]);

    useEffect(() => {
        if (user && isAdmin) {
            fetchDashboardStats();
        }
    }, [user, isAdmin]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const [bookingsData, testimonialsData, messagesData] = await Promise.all([
                getBookingsStats(),
                getTestimonialsStats(),
                getMessagesStats()
            ]);

            setStats({
                bookings: bookingsData,
                testimonials: testimonialsData,
                messages: messagesData
            });
        } catch (err) {
            console.error('Error fetching dashboard stats:', err);
            setError('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/admin/login');
        } catch (err) {
            console.error('Sign out error:', err);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Icon icon="mdi:alert-circle" className="text-red-500 text-6xl mx-auto mb-4" />
                    <p className="text-red-500 mb-4">{error}</p>
                    <button onClick={fetchDashboardStats} className="text-primary hover:underline">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Bookings',
            value: stats.bookings.total,
            icon: 'mdi:calendar-check',
            color: 'primary',
            link: '/admin/bookings'
        },
        {
            title: 'Pending Bookings',
            value: stats.bookings.pending,
            icon: 'mdi:clock-outline',
            color: 'yellow',
            link: '/admin/bookings?status=pending'
        },
        {
            title: 'New Messages',
            value: stats.messages.new,
            icon: 'mdi:email-outline',
            color: 'blue',
            link: '/admin/messages'
        },
        {
            title: 'Pending Testimonials',
            value: stats.testimonials.pending,
            icon: 'mdi:star-outline',
            color: 'purple',
            link: '/admin/testimonials'
        }
    ];

    const quickActions = [
        {
            title: 'Manage Bookings',
            description: 'View and manage customer bookings',
            icon: 'mdi:calendar-multiple',
            link: '/admin/bookings',
            color: 'primary'
        },
        {
            title: 'Manage Services',
            description: 'Add, edit, or remove services',
            icon: 'mdi:scissors-cutting',
            link: '/admin/services',
            color: 'blue'
        },
        {
            title: 'Manage Portfolio',
            description: 'Update your work portfolio',
            icon: 'mdi:image-multiple',
            link: '/admin/portfolio',
            color: 'purple'
        },
        {
            title: 'Manage Testimonials',
            description: 'Approve or reject testimonials',
            icon: 'mdi:star',
            link: '/admin/testimonials',
            color: 'yellow'
        },
        {
            title: 'Contact Messages',
            description: 'View and respond to messages',
            icon: 'mdi:message-text',
            link: '/admin/messages',
            color: 'green'
        },
        {
            title: 'Site Settings',
            description: 'Configure site settings',
            icon: 'mdi:cog',
            link: '/admin/settings',
            color: 'gray'
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-card/50 backdrop-blur-sm border-b border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-white mb-1 uppercase tracking-wider">
                                Admin Dashboard
                            </h1>
                            <p className="text-muted-foreground">
                                Welcome back, {user?.email}
                            </p>
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

            <div className="container mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={stat.link}
                                className="block bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                                        <Icon icon={stat.icon} className={`text-${stat.color}-500 text-2xl`} />
                                    </div>
                                    <Icon icon="mdi:chevron-right" className="text-muted-foreground" />
                                </div>
                                <h3 className="text-muted-foreground text-sm mb-1">{stat.title}</h3>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Booking Status Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                    >
                        <h2 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                            <Icon icon="mdi:chart-bar" className="text-primary" />
                            Booking Status
                        </h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Pending', value: stats.bookings.pending, color: 'yellow' },
                                { label: 'Confirmed', value: stats.bookings.confirmed, color: 'blue' },
                                { label: 'Completed', value: stats.bookings.completed, color: 'green' },
                                { label: 'Cancelled', value: stats.bookings.cancelled, color: 'red' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                                        <span className="text-muted-foreground">{item.label}</span>
                                    </div>
                                    <span className="text-white font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                    >
                        <h2 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                            <Icon icon="mdi:message-processing" className="text-primary" />
                            Message Status
                        </h2>
                        <div className="space-y-4">
                            {[
                                { label: 'New', value: stats.messages.new, color: 'blue' },
                                { label: 'Read', value: stats.messages.read, color: 'yellow' },
                                { label: 'Replied', value: stats.messages.replied, color: 'green' },
                                { label: 'Archived', value: stats.messages.archived, color: 'gray' }
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                                        <span className="text-muted-foreground">{item.label}</span>
                                    </div>
                                    <span className="text-white font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase tracking-wide">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={action.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                            >
                                <Link
                                    to={action.link}
                                    className="block bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-lg bg-${action.color}-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                            <Icon icon={action.icon} className={`text-${action.color}-500 text-2xl`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold mb-1 group-hover:text-primary transition-colors">
                                                {action.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">{action.description}</p>
                                        </div>
                                        <Icon icon="mdi:chevron-right" className="text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
