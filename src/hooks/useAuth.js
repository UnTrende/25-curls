import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            checkAdminRole(session?.user);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            checkAdminRole(session?.user);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkAdminRole = async (user) => {
        if (!user) {
            setIsAdmin(false);
            return;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!error && data) {
            setIsAdmin(data.role === 'admin');
        }
    };

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setIsAdmin(false);
    };

    const signUp = async (email, password, metadata = {}) => {
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

    return {
        user,
        session,
        loading,
        isAdmin,
        signIn,
        signOut,
        signUp,
    };
};
