
import React, { Component } from 'react';
import Button from '../Button/Button';

export default class ErrorBoundary extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center p-8 bg-slate-950 border border-slate-800 rounded-xl text-center shadow-2xl my-4">
                    <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-900/50 flex items-center justify-center text-red-400 mb-3 text-lg font-bold">
                        ⚠️
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-1">Something went wrong.</h2>
                    <p className="text-xs text-slate-400 mb-4 max-w-md">{this.state.error?.message || "An unexpected error occurred in this component section."}</p>
                    <Button 
                        onClick={() => window.location.reload()} 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-950/50 text-xs px-4 py-2"
                    >
                        Reload Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}