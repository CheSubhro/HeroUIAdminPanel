
import React, { useState } from 'react';
import { Button, Input, Spinner } from '../../components/common';
import { Link, useNavigate } from 'react-router-dom';
import { validateRegister } from '../../utils/validation';

export default function RegisterForm() {
    
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const validation = validateRegister(fullName, username, email, password, confirmPassword, avatar);
        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('avatar', avatar);
            if (coverImage) {
                formData.append('coverImage', coverImage);
            }

            // Simulating backend request delay for now
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 1200);

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Something went wrong during registration.');
        }
    };

    return (
        <div>
            {success ? (
                <div className="p-4 bg-teal-950/40 border border-teal-800/60 rounded-xl text-xs text-teal-400 font-medium text-center animate-in fade-in duration-200">
                    🎉 Account created successfully! Redirecting to login...
                </div>
            ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                    
                    {error && (
                        <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-xl text-xs text-red-400 text-center animate-in fade-in duration-200">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Full Name
                        </label>
                        <Input 
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Username
                        </label>
                        <Input 
                            type="text"
                            placeholder="johndoe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Email Address
                        </label>
                        <Input 
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Avatar File Input */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Avatar Image <span className="text-red-400">*</span>
                        </label>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                        />
                    </div>

                    {/* Cover Image File Input */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Cover Image <span className="text-slate-500">(Optional)</span>
                        </label>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setCoverImage(e.target.files[0])}
                            className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Input 
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <Button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" color="white" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                </form>
            )}

            <div className="mt-6 text-center text-xs text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Sign In
                </Link>
            </div>
        </div>
    );
}