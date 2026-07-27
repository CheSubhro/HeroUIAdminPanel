
import React from 'react';
import { Badge as HeroBadge } from "@heroui/react";

export default function Badge({ 
    children, 
    variant = 'solid', 
    color = 'primary', 
    className = '',
    content,
    ...props 
}) {
    const colorVariants = {
        primary: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        secondary: "bg-slate-800 text-slate-300 border-slate-700",
        success: "bg-emerald-600 text-white border-emerald-500",
        danger: "bg-rose-500/20 text-rose-400 border-rose-500/30",
        warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    };

    const selectedColor = colorVariants[color] || colorVariants.primary;

    // Jodi content na thake, tahole eta normal inline badge/pill hisabe kaj korbe
    if (!content) {
        return (
            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${selectedColor} ${className}`}>
                {children}
            </span>
        );
    }

    const customClassNames = {
        badge: `px-2 py-0.5 text-xs font-semibold rounded-full border shadow-sm ${selectedColor} ${className}`
    };

    return (
        <HeroBadge 
            content={content}
            variant={variant} 
            classNames={customClassNames}
            {...props}
        >
            {children}
        </HeroBadge>
    );
}