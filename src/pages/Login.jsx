
import React from 'react';
import { Card, Badge } from '../components/common';
import { Link } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm';

export default function Login() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center py-12 px-6">
            <div className="max-w-md w-full">
                
                {/* Header Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block mb-3">
                        <Badge variant="flat" color="primary" className="px-3 py-1 text-xs">
                            🔐 Secure Access
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Welcome <span className="text-indigo-400">Back</span>
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Sign in to your account to manage your architecture settings.
                    </p>
                </div>

                {/* Login Card wrapping the LoginForm Feature */}
                <Card className="p-8 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-2xl shadow-xl">
                    <LoginForm />
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link to="/" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}