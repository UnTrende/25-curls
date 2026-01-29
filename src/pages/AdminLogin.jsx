import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../hooks/useAuth.jsx';
import LiveButton from '../components/ui/LiveButton';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            console.log('Attempting login with:', email);
            const result = await signIn(email, password);
            console.log('Login successful, result:', result);
            
            // Give time for checkAdminRole to complete
            console.log('Waiting for admin role check to complete...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Navigating to dashboard...');
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            console.error('Error details:', err.message, err.status);
            setError(err.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-heading font-bold text-white mb-2 uppercase tracking-wider">
                        Admin Login
                    </h1>
                    <p className="text-muted-foreground">
                        Sign in to access the admin dashboard
                    </p>
                </div>

                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Icon icon="mdi:alert-circle" className="text-red-500 text-xl" />
                                <p className="text-sm text-red-500">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                                    placeholder="admin@example.com"
                                />
                                <div className="absolute left-3 top-3.5 text-muted-foreground">
                                    <Icon icon="mdi:email" width="20" height="20" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder:text-muted-foreground/30 font-sans transition-all"
                                    placeholder="••••••••"
                                />
                                <div className="absolute left-3 top-3.5 text-muted-foreground">
                                    <Icon icon="mdi:lock" width="20" height="20" />
                                </div>
                            </div>
                        </div>

                        <LiveButton
                            type="submit"
                            disabled={loading}
                            className="w-full py-3"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </LiveButton>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Need help? Contact the system administrator
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
