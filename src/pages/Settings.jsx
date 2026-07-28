
import React, { useState } from 'react';
import { Card, Button } from '../components/common';
import { FaUser, FaLock, FaGlobe, FaSave } from 'react-icons/fa';

export default function Settings() {
    
    const [activeTab, setActiveTab] = useState('profile');

    const [profileData, setProfileData] = useState({
        name: 'Admin User',
        email: 'admin@example.com',
    });

    const [siteData, setSiteData] = useState({
        siteName: 'AdminPanel',
        supportEmail: 'support@example.com',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        alert('Profile settings updated successfully!');
    };

    const handleSystemSubmit = (e) => {
        e.preventDefault();
        alert('System settings updated successfully!');
    };

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-default-500">Manage your account preferences and system configurations.</p>
            </div>

            {/* Settings Navigation Tabs */}
            <div className="flex border-b border-divider gap-4">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'profile'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-default-500 hover:text-foreground'
                        }`}
                >
                    <FaUser /> Profile Settings
                </button>
                <button
                    onClick={() => setActiveTab('system')}
                    className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'system'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-default-500 hover:text-foreground'
                        }`}
                >
                    <FaGlobe /> System Settings
                </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'profile' && (
                <Card className="p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
                        <p className="text-xs text-default-500">Update your account's profile information and email address.</p>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-xl">
                        <div>
                            <label className="block text-xs font-medium text-default-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-default-100 border border-divider rounded-xl text-foreground text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-default-600 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                className="w-full px-4 py-2 bg-default-100 border border-divider rounded-xl text-foreground text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <Button color="primary" type="submit" className="flex items-center gap-2">
                            <FaSave /> Save Changes
                        </Button>
                    </form>
                </Card>
            )}

            {activeTab === 'system' && (
                <Card className="p-6 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">App / System Settings</h3>
                        <p className="text-xs text-default-500">Configure general application data, site name, and environment variables.</p>
                    </div>

                    <form onSubmit={handleSystemSubmit} className="space-y-4 max-w-xl">
                        <div>
                            <label className="block text-xs font-medium text-default-600 mb-1">Site Name</label>
                            <input
                                type="text"
                                value={siteData.siteName}
                                onChange={(e) => setSiteData({ ...siteData, siteName: e.target.value })}
                                className="w-full px-4 py-2 bg-default-100 border border-divider rounded-xl text-foreground text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-default-600 mb-1">Support Email</label>
                            <input
                                type="email"
                                value={siteData.supportEmail}
                                onChange={(e) => setSiteData({ ...siteData, supportEmail: e.target.value })}
                                className="w-full px-4 py-2 bg-default-100 border border-divider rounded-xl text-foreground text-sm focus:outline-none focus:border-primary"
                            />
                        </div>
                        <Button color="primary" type="submit" className="flex items-center gap-2">
                            <FaSave /> Update System
                        </Button>
                    </form>
                </Card>
            )}
        </div>
    );
}