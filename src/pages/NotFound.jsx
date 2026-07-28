
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/common';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <Card className="max-w-md w-full p-8 text-center space-y-6 border border-divider">
                {/* Error Icon */}
                <div className="w-16 h-16 rounded-2xl bg-warning/10 text-warning flex items-center justify-center mx-auto text-2xl">
                    <FaExclamationTriangle />
                </div>

                {/* Error Message */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold text-foreground">404</h1>
                    <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
                    <p className="text-xs text-default-500 leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                        color="default"
                        variant="flat"
                        onClick={() => navigate(-1)}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <FaArrowLeft /> Go Back
                    </Button>
                    <Button
                        color="primary"
                        variant="flat"
                        onClick={() => navigate('/')}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <FaHome /> Dashboard
                    </Button>
                </div>
            </Card>
        </div>
    );
}