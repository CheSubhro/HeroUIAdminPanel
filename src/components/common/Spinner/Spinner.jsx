
import React from 'react';

export default function Spinner({ 
    size = "md", 
    color = "emerald", 
    className = "", 
    ...props 
}) {
    // Size mapping
    const sizeClasses = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-2.5",
        lg: "w-12 h-12 border-3",
        xl: "w-16 h-16 border-4"
    };

    // Color mapping
    const colorClasses = {
        emerald: "border-slate-700 border-t-emerald-500",
        primary: "border-slate-700 border-t-indigo-500",
        danger: "border-slate-700 border-t-rose-500",
        white: "border-slate-600 border-t-white"
    };

    const selectedSize = sizeClasses[size] || sizeClasses.md;
    const selectedColor = colorClasses[color] || colorClasses.emerald;

    return (
        <div className={`inline-flex items-center justify-center ${className}`} {...props}>
            <div 
                className={`rounded-full animate-spin ${selectedSize} ${selectedColor}`}
            />
        </div>
    );
}