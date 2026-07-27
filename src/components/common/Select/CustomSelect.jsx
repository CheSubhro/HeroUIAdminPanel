
import React from 'react';

export default function CustomSelect({ 
    items = [], 
    options = [], 
    label, 
    placeholder = "Select an option", 
    value, 
    onChange, 
    className = '',
    ...props 
}) {
    const dataList = items.length > 0 ? items : options;

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label className="text-xs font-medium text-slate-300">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer
                        bg-slate-800 text-slate-100 border border-slate-700/80 
                        shadow-md shadow-slate-950/50 transition-all duration-200
                        focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {dataList.map((item) => {
                        const itemKey = item.key || item.id || item.value;
                        const itemLabel = item.label || item.name;
                        return (
                            <option key={itemKey} value={itemKey} className="bg-slate-900 text-slate-100">
                                {itemLabel}
                            </option>
                        );
                    })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}