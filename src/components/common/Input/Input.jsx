
import React from 'react';

export default function Input({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    type = 'text', 
    className = '',
    required = false,
    ...props 
}) {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label className="text-xs font-medium text-slate-300">
                    {label} {required && <span className="text-indigo-400">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
                    w-full rounded-lg px-3 py-2.5 text-sm 
                    bg-slate-800 text-slate-100 border border-slate-700/80 
                    shadow-md shadow-slate-950/50 transition-all duration-200
                    placeholder:text-slate-500
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
                {...props}
            />
        </div>
    );
}