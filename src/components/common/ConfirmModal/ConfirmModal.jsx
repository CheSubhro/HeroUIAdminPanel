
import React from 'react';
import Button from '../Button/Button'; 

export default function ConfirmModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Are you sure?", 
    message = "This action cannot be undone.", 
    confirmText = "Confirm", 
    cancelText = "Cancel" 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            {/* Modal Box */}
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl rounded-xl p-6 overflow-hidden transform transition-all">
                <div className="flex flex-col relative w-full">
                    {/* Header */}
                    <div className="pb-3 border-b border-slate-800 mb-4">
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                    </div>

                    {/* Body */}
                    <div className="py-2 text-slate-300 text-sm leading-relaxed mb-6">
                        <p>{message}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                        <Button 
                            variant="light" 
                            onPress={onClose}
                            className="bg-transparent text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                        >
                            {cancelText}
                        </Button>
                        
                        <Button 
                            color="danger" 
                            onPress={() => { 
                                onConfirm(); 
                                onClose(); 
                            }}
                            className="bg-red-600 border-red-500 text-white hover:bg-red-500 shadow-red-950/50"
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}