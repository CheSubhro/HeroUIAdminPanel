
import React from 'react';
import { Card, Badge } from '../components/common';
import { Link } from 'react-router-dom';
import RegisterForm from '../features/auth/RegisterForm';

export default function Register() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center py-12 px-6">
            <div className="max-w-md w-full">
                
                {/* Header Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block mb-3">
                        <Badge variant="flat" color="primary" className="px-3 py-1 text-xs">
                            🚀 Get Started
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Create an <span className="text-indigo-400">Account</span>
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Join us today and start managing your architecture settings effortlessly.
                    </p>
                </div>

                {/* Register Card wrapping the RegisterForm Feature */}
                <Card className="p-8 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-2xl shadow-xl">
                    <RegisterForm />
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