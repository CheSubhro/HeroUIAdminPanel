
import React from 'react';
import { Card as HeroCard } from "@heroui/react";

export default function Card({ header, body, footer, children, className = '', ...props }) {
    return (
        <HeroCard 
            className={`
                bg-slate-900 border border-slate-800 text-slate-100 shadow-xl rounded-xl p-6
                ${className}
            `} 
            {...props}
        >
            {/* Header */}
            {header && (
                <div className="pb-4 mb-4 border-b border-slate-800 font-semibold text-white text-lg">
                    {header}
                </div>
            )}

            {/* Body / Children */}
            <div className="text-slate-300 text-sm leading-relaxed">
                {body || children}
            </div>

            {/* Footer */}
            {footer && (
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                    {footer}
                </div>
            )}
        </HeroCard>
    );
}