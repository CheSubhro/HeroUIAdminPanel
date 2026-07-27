
import React, { useState } from 'react';
import { Card, Badge, Button, Input, Spinner } from '../components/common';

export default function Profile() {
    
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('user@example.com');
    const [bio, setBio] = useState('Building scalable web applications and high-performance design systems.');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email) {
            setError('Name and email are required fields.');
            return;
        }

        setLoading(true);

        // Simulate backend update delay
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }, 1200);
    };

    return (

        <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-6">
            <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <div className="inline-block mb-2">
                            <Badge variant="flat" color="primary" className="px-3 py-1 text-xs">
                                👤 Account Settings
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            My <span className="text-indigo-400">Profile</span>
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Manage your personal information, email preferences, and public profile details.
                        </p>
                    </div>
                </div>

                {/* Profile Card Form */}
                <Card className="p-8 bg-slate-800/50 border border-slate-800 backdrop-blur-md rounded-2xl shadow-xl">
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        
                        {success && (
                            <div className="p-4 bg-teal-950/40 border border-teal-800/60 rounded-xl text-xs text-teal-400 font-medium text-center animate-in fade-in duration-200">
                                🎉 Profile updated successfully!
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-xl text-xs text-red-400 text-center animate-in fade-in duration-200">
                                {error}
                            </div>
                        )}

                        {/* Avatar & Basic Info Header */}
                        <div className="flex items-center gap-6 pb-4 border-b border-slate-800">
                            <img 
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                                alt="User Avatar" 
                                className="w-16 h-16 rounded-full ring-2 ring-indigo-500/50 object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-white">{name}</h3>
                                <p className="text-xs text-slate-400">{email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Full Name
                                </label>
                                <Input 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Email Address
                                </label>
                                <Input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                Bio / Description
                            </label>
                            <textarea 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                                placeholder="Write a short bio about yourself..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2">
                            <Button 
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Spinner size="sm" color="white" />
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>

                    </form>
                </Card>

            </div>
        </div>
    );
}