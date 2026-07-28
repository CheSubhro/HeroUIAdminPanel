
import React from 'react';
import { Card, Badge } from '../components/common';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Profile() {
    
    const { user } = useAuth(); 

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center py-12 px-6">
            <div className="max-w-md w-full">

                {/* Header Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block mb-3">
                        <Badge variant="flat" color="primary" className="px-3 py-1 text-xs">
                            👤 User Profile
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Account <span className="text-indigo-400">Details</span>
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Manage your profile information and security settings.
                    </p>
                </div>

                {/* Profile Information Card */}
                <Card className="p-8 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-2xl shadow-xl space-y-6">
                    <div className="flex items-center space-x-4 border-b border-slate-700/50 pb-6">
                        <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl font-bold border border-indigo-500/30">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {user?.name || 'Admin / Moderator'}
                            </h3>
                            <p className="text-xs text-slate-400">
                                {user?.email || 'user@example.com'}
                            </p>
                            <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-medium bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                                {user?.role || 'Administrator'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-700/30">
                            <span className="text-slate-400">Status</span>
                            <span className="text-emerald-400 font-medium">Active</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-700/30">
                            <span className="text-slate-400">Authentication</span>
                            <span className="text-slate-200">HttpOnly Cookie (JWT)</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="button"
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors text-sm shadow-lg shadow-indigo-600/25"
                        >
                            Edit Profile Settings
                        </button>
                    </div>
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link to="/" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
                        ← Back to Dashboard / Home
                    </Link>
                </div>

            </div>
        </div>
    );
}