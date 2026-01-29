import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                await checkAdminRole(session?.user);
            }
            setLoading(false);
        }).catch((error) => {
            console.error('Error getting session:', error);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setLoading(true);
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                await checkAdminRole(session?.user);
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkAdminRole = async (user) => {
        if (!user || !supabase) {
            console.log('checkAdminRole: No user or supabase');
            setIsAdmin(false);
            return;
        }

        try {
            console.log('Checking admin role for user:', user.id);
            
            // Add timeout to prevent hanging
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Profile query timeout')), 5000)
            );
            
            const queryPromise = supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();
            
            const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

            console.log('Profile query result:', { data, error });

            if (error) {
                console.error('Error fetching profile:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                console.error('Error details:', error.details);
                
                // If it's a 500 error or profile doesn't exist, we need to create it
                if (error.code === 'PGRST116' || error.message?.includes('500')) {
                    console.error('Profile does not exist or RLS is blocking. User needs profile created in Supabase.');
                }
                
                setIsAdmin(false);
                return;
            }

            if (data) {
                console.log('User role:', data.role);
                const adminStatus = data.role === 'admin';
                console.log('Is admin?', adminStatus);
                setIsAdmin(adminStatus);
            } else {
                console.log('No profile data found');
                setIsAdmin(false);
            }
        } catch (error) {
            console.error('Exception checking admin role:', error);
            setIsAdmin(false);
        }
    };

    const signIn = async (email, password) => {
        if (!supabase) throw new Error('Supabase not initialized.');

        console.log('signIn: Attempting authentication...');
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('signIn: Authentication failed:', error);
            throw error;
        }

        console.log('signIn: Authentication successful:', data.user?.email);

        if (data.user) {
            console.log('signIn: Checking admin role...');
            await checkAdminRole(data.user);
        }

        return data;
    };

    const signOut = async () => {
        if (!supabase) throw new Error('Supabase not initialized.');

        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setIsAdmin(false);
    };

    const signUp = async (email, password, metadata = {}) => {
        if (!supabase) throw new Error('Supabase not initialized.');

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        });

        if (error) throw error;
        return data;
    };

    const value = {
        user,
        session,
        loading,
        isAdmin,
        signIn,
        signOut,
        signUp,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
