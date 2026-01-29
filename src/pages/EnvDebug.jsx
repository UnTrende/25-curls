import React from 'react';

const EnvDebug = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

    return (
        <div className="container mx-auto px-4 py-32">
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg border border-white/10">
                <h1 className="text-3xl font-bold text-white mb-6">Environment Variables Debug</h1>
                
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded">
                        <p className="text-sm text-muted-foreground mb-1">VITE_SUPABASE_URL:</p>
                        <p className="text-white font-mono text-sm break-all">
                            {supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : '❌ NOT SET'}
                        </p>
                        <p className={`text-xs mt-1 ${supabaseUrl ? 'text-green-500' : 'text-red-500'}`}>
                            {supabaseUrl ? '✅ Loaded' : '❌ Missing'}
                        </p>
                    </div>

                    <div className="p-4 bg-white/5 rounded">
                        <p className="text-sm text-muted-foreground mb-1">VITE_SUPABASE_ANON_KEY:</p>
                        <p className="text-white font-mono text-sm">
                            {supabaseAnonKey ? `${supabaseAnonKey.substring(0, 30)}...` : '❌ NOT SET'}
                        </p>
                        <p className={`text-xs mt-1 ${supabaseAnonKey ? 'text-green-500' : 'text-red-500'}`}>
                            {supabaseAnonKey ? '✅ Loaded' : '❌ Missing'}
                        </p>
                    </div>

                    <div className="p-4 bg-white/5 rounded">
                        <p className="text-sm text-muted-foreground mb-1">VITE_SENTRY_DSN:</p>
                        <p className="text-white font-mono text-sm">
                            {sentryDsn ? `${sentryDsn.substring(0, 30)}...` : 'Not set (optional)'}
                        </p>
                        <p className={`text-xs mt-1 ${sentryDsn ? 'text-green-500' : 'text-yellow-500'}`}>
                            {sentryDsn ? '✅ Loaded' : '⚠️ Optional'}
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded">
                        <p className="text-sm text-blue-400">
                            <strong>Status:</strong> {supabaseUrl && supabaseAnonKey ? '✅ All required variables loaded!' : '❌ Required variables missing'}
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded">
                        <p className="text-xs text-yellow-400">
                            <strong>Note:</strong> This page is for debugging only. Delete it after confirming environment variables are working.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnvDebug;
