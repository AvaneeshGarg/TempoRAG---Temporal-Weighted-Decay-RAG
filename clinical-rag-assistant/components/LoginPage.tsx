import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast';
import { HeartIcon } from './Icons';

const GoogleIcon = () => (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.572C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

export const LoginPage: React.FC = () => {
    const { loginWithGoogle, loginWithGitHub, loginAsGuest } = useAuth();
    const toast = useToast();
    const [googleLoading, setGoogleLoading] = useState(false);
    const [githubLoading, setGithubLoading] = useState(false);

    const handleGoogle = () => {
        setGoogleLoading(true);
        loginWithGoogle();
    };

    const handleGitHub = () => {
        setGithubLoading(true);
        loginWithGitHub();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0d1117]">

            {/* Subtle grid texture */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }} />

            <motion.div
                className="relative w-full max-w-sm mx-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <div className="rounded-xl border border-white/8 shadow-2xl overflow-hidden"
                    style={{ background: '#161b22' }}>

                    {/* Header */}
                    <div className="px-8 pt-8 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-rose-700">
                                <HeartIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-white font-semibold text-base tracking-tight leading-tight">NeuroGuardian</h1>
                                <p className="text-slate-500 text-xs mt-0.5">Clinical Intelligence Platform</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Sign in to access the full clinical knowledge base and risk forecasting tools.
                        </p>
                    </div>

                    <div className="p-8 space-y-3">
                        {/* Google */}
                        <motion.button
                            onClick={handleGoogle}
                            disabled={googleLoading || githubLoading}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2.5 bg-white text-gray-800 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                        >
                            {googleLoading
                                ? <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                : <GoogleIcon />}
                            {googleLoading ? 'Redirecting...' : 'Continue with Google'}
                        </motion.button>

                        {/* GitHub */}
                        <motion.button
                            onClick={handleGitHub}
                            disabled={googleLoading || githubLoading}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2.5 rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border"
                            style={{ background: '#21262d', borderColor: '#30363d', color: '#e6edf3' }}
                        >
                            {githubLoading
                                ? <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                : <GitHubIcon />}
                            {githubLoading ? 'Redirecting...' : 'Continue with GitHub'}
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 py-1">
                            <div className="flex-1 h-px bg-white/5" />
                            <span className="text-slate-600 text-[11px] uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-white/5" />
                        </div>

                        {/* Guest */}
                        <button
                            type="button"
                            onClick={() => {
                                loginAsGuest();
                                toast.info('Guest access: Research Pulse only (3 searches).');
                            }}
                            className="w-full py-2 text-slate-500 text-xs hover:text-slate-300 transition-colors rounded-lg hover:bg-white/4"
                        >
                            Continue as Guest
                            <span className="ml-1.5 text-slate-600">· Research only, 3 searches</span>
                        </button>

                        {/* Trust line */}
                        <p className="text-center text-slate-700 text-[10px] pt-2 border-t border-white/5">
                            OAuth 2.0 · HTTPOnly Cookie · JWT Session
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
