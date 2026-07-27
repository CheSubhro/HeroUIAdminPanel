
import React from 'react';

export default function Modal({ isOpen, onClose, title, children, footer, className = '' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            {/* Modal Box */}
            <div className={`
                relative w-full max-w-lg bg-slate-900 border border-slate-800 
                text-slate-100 shadow-2xl rounded-xl p-6 overflow-hidden 
                transform transition-all ${className}
            `}>
                {/* Header */}
                {title ? (
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                        <button 
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800"
                    >
                        ✕
                    </button>
                )}

                {/* Body */}
                <div className="py-2 text-slate-300 text-sm leading-relaxed">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 mt-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}