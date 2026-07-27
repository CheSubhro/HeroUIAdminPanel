
import React, { useState } from 'react';
import { Card, Badge, Button, Input, Spinner } from '../components/common';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setLoading(true);
        
        // Simulate password reset request delay
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center py-12 px-6">
            <div className="max-w-md w-full">
                
                {/* Header Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block mb-3">
                        <Badge variant="flat" color="primary" className="px-3 py-1 text-xs">
                            🔑 Password Recovery
                        </Badge>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Forgot <span className="text-indigo-400">Password?</span>
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
                </div>

                {/* Forgot Password Card */}
                <Card className="p-8 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-2xl shadow-xl">
                    {success ? (
                        <div className="space-y-4 text-center">
                            <div className="p-4 bg-teal-950/40 border border-teal-800/60 rounded-xl text-xs text-teal-400 font-medium animate-in fade-in duration-200">
                                🎉 Password reset instructions have been sent to your email!
                            </div>
                            <p className="text-xs text-slate-400">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>
                            <Button 
                                type="button"
                                color="secondary"
                                className="w-full py-3 text-sm font-semibold"
                                onClick={() => {
                                    setSuccess(false);
                                    setEmail('');
                                }}
                            >
                                Resend Instructions
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            
                            {error && (
                                <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-xl text-xs text-red-400 text-center animate-in fade-in duration-200">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Email Address
                                </label>
                                <Input 
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Reset Button */}
                            <Button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Spinner size="sm" color="white" />
                                        <span>Sending Instructions...</span>
                                    </>
                                ) : (
                                    'Send Reset Instructions'
                                )}
                            </Button>
                        </form>
                    )}

                    <div className="mt-6 text-center text-xs text-slate-400">
                        Remember your password?{' '}
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign In
                        </Link>
                    </div>
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