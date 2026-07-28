
import React from 'react';
import { Card, Badge } from '../components/common';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../features/auth/ForgotPasswordForm';

export default function ForgotPassword() {
    
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center py-12 px-6">
            <div className="max-w-md w-full">

                {/* Header Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block mb-3">
                        <Badge variant="flat" color="primary" className="px-3 py-1 text-xs">
                            🔑 Recovery
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Forgot <span className="text-indigo-400">Password?</span>
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Forgot Password Card wrapping the Form */}
                <Card className="p-8 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-2xl shadow-xl">
                    <ForgotPasswordForm />
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link to="/login" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
                        ← Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
}