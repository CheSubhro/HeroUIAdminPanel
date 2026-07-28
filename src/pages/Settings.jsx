
import React from 'react';
import { Card, Button } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaKey, FaShieldAlt } from 'react-icons/fa';

export default function Settings() {

    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-sm text-default-500">Manage your security settings and password preferences.</p>
            </div>

            {/* Security Settings Section */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <FaShieldAlt className="text-primary" /> Security & Password
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

                    {/* Change Password Card */}
                    <Card className="p-6 flex flex-col justify-between border border-divider h-full">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <FaLock />
                            </div>
                            <h3 className="text-base font-semibold text-foreground">Change Password</h3>
                            <p className="text-xs text-default-500">
                                Update your current password regularly to keep your account secure.
                            </p>
                        </div>
                        <div className="pt-6">
                            <Button
                                color="primary"
                                variant="flat"
                                onClick={() => navigate('/changepassword')}
                                className="w-full"
                            >
                                Change Password
                            </Button>
                        </div>
                    </Card>

                    {/* Forgot Password Card */}
                    <Card className="p-6 flex flex-col justify-between border border-divider h-full">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <FaKey />
                            </div>
                            <h3 className="text-base font-semibold text-foreground">Reset Password</h3>
                            <p className="text-xs text-default-500">
                                If you forgot your current password or need to trigger a recovery link to your email address.
                            </p>
                        </div>
                        <div className="pt-6">
                            <Button
                                color="primary"
                                variant="flat"
                                onClick={() => navigate('/forgot-password')}
                                className="w-full"
                            >
                                Forgot Password
                            </Button>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}